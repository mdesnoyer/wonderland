import _ from 'lodash';
import moment from 'moment';

import AjaxMixin from '../mixins/Ajax';
import AJAXModule from '../modules/ajax';
import SESSION from '../modules/session';
import UTILS from '../modules/utils';

const registerCallbacks = [];

// A class to bind store updates to subscribed components.
export const Dispatcher = {
    dispatch() {
        registerCallbacks.forEach(callback => {
            callback();
        });
        return Dispatcher;
    },

    register(callback) {
        registerCallbacks.push(callback);
        return Dispatcher;
    },

    // Find and remove the callback. Return true if found and removed.
    unregister(callback) {
        const index = registerCallbacks.indexOf(callback);
        if (index === -1) {
            return false;
        }
        registerCallbacks.splice(index, 1);
        return true;
    },
};

// Given the enum of gender, age, return new Object
// with their two api request key and value.
// (Optionally, specify fields in the response.)
const getBaseParamsForDemoRequest = (gender, age, fields = []) => {
    const baseParams = {};
    // If demo parameters are valued and not "null", then include them.
    if (gender !== 0) {
        baseParams.gender = _.invert(UTILS.FILTER_GENDER_COL_ENUM)[gender];
    }
    if (age !== 0) {
        baseParams.age = _.invert(UTILS.FILTER_AGE_COL_ENUM)[age];
    }
    if (fields.length > 0) {
        baseParams.fields = fields.join(',');
    }
    return baseParams;
};

class Store {
    constructor() {
        this.store = {};
        this.completelyLoaded = false;
    }

    getAll() {
        return this.store;
    }

    get(id) {
        return this.store[id];
    }

    set(map) {
        Object.assign(this.store, map);
        return this;
    }

    has(id) {
        return undefined !== this.get(id);
    }

    count() {
        return _.values(this.getAll()).length;
    }

    // Get as Unix epoch in seconds.
    // Return null if store is empty.
    getOldestTimestamp() {
        if (!this.count()) {
            return null;
        }

        const oldestItem = _(this.getAll())
            .values()
            .minBy(item => item.created);
        return moment(`${oldestItem.created}Z`).format('x') / 1000;
    }

    reset() {
        this.store = {};
        this.completelyLoaded = false;
    }
}

class DemoStore extends Store {
    constructor() {
        super();
        this.store = this.genderAgeBaseMap();
    }

    get(gender, age, id) {
        return this.store[gender][age][id];
    }

    set(gender, age, map) {
        Object.assign(this.store[gender][age], map);
        return this;
    }

    has(gender, age, id) {
        return undefined !== this.get(gender, age, id);
    }


    reset() {
        super.reset();
        this.store = this.genderAgeBaseMap();
        return this;
    }

    genderAgeBaseMap() {
        return {
            0: {
                0: {},
                1: {},
                2: {},
                3: {},
                4: {},
                5: {},
            },
            1: {
                0: {},
                1: {},
                2: {},
                3: {},
                4: {},
                5: {},
            },
            2: {
                0: {},
                1: {},
                2: {},
                3: {},
                4: {},
                5: {},
            },
        };
    }
}

class FilteredStore {
    constructor(sourceStore) {
        this.sourceStore = sourceStore;
        this.filter = this.defaultFilter;
        this.completelyLoad = false;
    }

    defaultFilter(item) {
        return item.hidden !== true;
    }

    setFilter(filter) {
        this.filter = filter;
    }

    // Get all that pass filter.
    getAll() {
        const result = _(this.sourceStore.getAll())
            .filter(this.filter)
             // Restore the map structure since filter returns array.
            .keyBy('tag_id')
            .value();
        return result;
    }

    count() {
        return _.values(this.getAll()).length;
    }

    reset() {
        this.filter = this.defaultFilter;
        this.completelyLoaded = false;
    }
}

export const accountStore = new Store();
export const clipStore = new DemoStore();
export const featureStore = new Store();
export const liftStore = new DemoStore();
export const tagStore = new Store();
export const tagShareStore = new Store();
export const thumbnailStore = new DemoStore();
export const thumbnailFeatureStore = new DemoStore();
export const videoStore = new Store();

export const filteredTagStore = new FilteredStore(tagStore);

export const LoadActions = Object.assign({}, AjaxMixin, {

    // From tag search API call result, load all downstream stores,
    loadFromSearchResult: (searchRes, reload, videoFilter, thumbnailFilter,
                           callback = Function.prototype) => {
        // Short circuit empty input.
        if (!searchRes.items.length) {
            return LoadActions;
        }

        // Decide which tag ids to search for.
        const tagIds = _.chain(searchRes.items)
            .reduce((_tagIds, tag) => {
                _tagIds.push(tag.tag_id);
                return _tagIds;
            }, [])
            .value();
        return LoadActions.loadTags(tagIds, 0, 0, callback, reload, videoFilter, thumbnailFilter);
    },

    // Fetch functions take an array of resource id and return a promise.
    fetchTags(tagIds) {
        if (!tagIds.length) {
            return Promise.resolve({});
        }
        const tagIdSet = _.uniq(tagIds);
        const data = { tag_id: tagIdSet.join(',') };
        return LoadActions.get('tags', { data });
    },

    fetchVideos(videoIds) {
        if (!videoIds.length) {
            return Promise.resolve({ videos: [] });
        }
        console.log(videoIds);
        const videoIdSet = _.uniq(videoIds);
        const data = {
            video_id: videoIdSet.join(','),
            fields: UTILS.VIDEO_FIELDS_MIN.join(','),
        };
        return LoadActions.get('videos', { data });
    },

    // Load thumbnails by ids.
    fetchThumbnails(thumbnailIds, gender = 0, age = 0, fields = []) {
        // Empty array of ids is no-op.
        if (!thumbnailIds.length) {
            return Promise.resolve({ thumbnails: [] });
        }

        // Create array of CSVs of max length.
        const thumbArgs = UTILS.csvFromArray(thumbnailIds);
        const baseParams = getBaseParamsForDemoRequest(gender, age, fields);

        const params = {};
        // Batch only large requests since batch is slower.
        if (thumbArgs) {
            thumbArgs.forEach(arg => {
                // Build this batch's params by copying base params and adding the tid arg.
                Object.assign(params, baseParams, { thumbnail_id: arg });
                LoadActions.batch('GET', 'thumbnails', params);
            });
            return LoadActions.sendBatch();
        }
        Object.assign(params, baseParams, { thumbnail_id: thumbArgs[0] });
        return LoadActions.get('thumbnails', { data: params });
    },

    fetchClips(clipIds, gender = 0, age = 0) {
        if (!clipIds.length) {
            return Promise.resolve({ clips: [] });
        }
        const data = getBaseParamsForDemoRequest(gender, age, UTILS.CLIP_FIELDS);
        // TODO handle > 100
        const clipIdSet = _.uniq(clipIds);
        data.clip_ids = clipIdSet.join(',');
        return LoadActions.get('clips', { data });
    },

    // Load lifts for thumbnails from data source.
    fetchLifts(tagIds, gender = 0, age = 0) {
        if (!tagIds.length) {
            return Promise.resolve([]);
        }

        // Store map of base thumbnail id to tag id for reverse lookup
        // while processing response.
        const baseTagMap = {};
        const tagIdSet = _.uniq(tagIds);
        const tagLiftMap = {};

        tagIdSet.forEach((tagId) => {

            // Get the worst thumbnail.
            const tag = tagStore.get(tagId);
            const thumbnailMap = _.pick(
                thumbnailStore.getAll()[gender][age],
                tag.thumbnail_ids);
            const thumbnailIds = _.keys(thumbnailMap);

            // Special case for 0, 1 thumbnail collections:
            // 0 is the null map.
            // 1 is just a map of the image to 0% lift vs itself.
            if (!thumbnailIds.length) {
                tagLiftMap[tagId] = {};
                return;
            }
            if (thumbnailIds.length === 1) {
                tagLiftMap[tagId] = { [thumbnailIds[0]]: 0 };
                return;
            }

            // If the type is video, its default thumbnail
            // is used instead of the worst.
            const worst = UTILS.worstThumbnail(_.values(thumbnailMap));
            let defaultThumb;
            if (tag.tag_type === UTILS.TAG_TYPE_VIDEO_COL) {
                const video = videoStore.get(tag.video_id);
                const demo = UTILS.findDemographicThumbnailObject(
                    video.demographic_thumbnails, gender, age);
                defaultThumb = UTILS.findDefaultThumbnail(demo);
            }

            const baseThumb = defaultThumb || worst;
            const baseId = baseThumb.thumbnail_id;

            // Save the reverse map of thumbnail id to tag id.
            baseTagMap[baseId] = tagId;
            const baseParams = getBaseParamsForDemoRequest(gender, age);

            // Copy params array and assign the thumbnail ids.
            const vsThumbnailIds = _.keys(_.omit(thumbnailMap, [baseId]));

            // Batch each MAX_CSV_VALUE_COUNT (100) thumbnail ids.
            const csvArray = UTILS.csvFromArray(vsThumbnailIds);
            csvArray.forEach(csvThumbnailIds => {
                const params = {};
                Object.assign(params, baseParams, {
                    base_id: baseId,
                    thumbnail_ids: csvThumbnailIds });
                LoadActions.batch('GET', 'stats/estimated_lift', params);
            });
        });

        return LoadActions.sendBatch({
            // Unpack batch response.
            successHandler: batches => (
                batches.results.reduce((batchLiftMap, batch) => {
                    const baseId = batch.response.baseline_thumbnail_id;
                    // Use reverse lookup to get the tag id from the base thumb id.
                    const tagId = baseTagMap[baseId];
                    return Object.assign({}, batchLiftMap, {
                        [tagId]: batch.response.lift.reduce((map, item) => (
                        Object.assign({}, map, { [item.thumbnail_id]: item.lift })
                    ), {}) });
                }, tagLiftMap)
            ),
        });
    },

    // Load video resource until an estimate is provided
    // or the video status is not processing.
    loadProcessingVideoUntilEstimate(videoId) {
        const repeat = (videoResponse) => {
            const video = videoResponse.videos[0];
            if (video.state === UTILS.VIDEO_STATE_ENUM.processing) {
                if (video.estimated_time_remaining !== null) {
                    // After time remaining is set, done.
                    return;
                }
                // Else try again.
                setTimeout(LoadActions.loadProcessingVideoUntilEstimate.bind(
                    null, [videoId]), 3000);
            }
            // After state change from processing, done.
        };
        LoadActions.fetchVideos([videoId]).then(videoResponse => repeat.bind(null, videoResponse));
        return LoadActions;
    },

    // Load data for given demographic.
    loadTagForDemographic(tagId, gender, age, callback = Function.prototype) {

        // Find the missing thumbnail ids.
        const missingThumbIds = [];
        const tag = tagStore.get(tagId);
        if (tag.tag_type === UTILS.TAG_TYPE_VIDEO_COL) {
            // These are already loaded!
        } else {
            tag.thumbnail_ids.forEach(tid => {
                if (undefined === thumbnailStore.get(gender, age, tid)) {
                    missingThumbIds.push(tid);
                }
            });
        }

        const newThumbnailMap = {};
        // TODO handle more than 100.
        LoadActions.fetchThumbnails(missingThumbIds, gender, age)
        .then(thumbRes => {
            thumbRes.thumbnails.forEach(t => {
                newThumbnailMap[t.thumbnail_id] = t;
            });
            thumbnailStore.set(gender, age, newThumbnailMap);
            return LoadActions.loadLifts([tagId], gender, age);
        })
        .then(tagLiftMap => {
            // Set, dispatch and callback.
            liftStore.set(gender, age, tagLiftMap);
            Dispatcher.dispatch();
            callback();
        });
        return LoadActions;
    },

    // Load Feature objects for the thumbnails for the given tag
    // for the given demographic.
    loadFeaturesForTag(tagId, gender, age, callback = Function.prototype) {
        // Get missing thumbnail ids.
        const tag = tagStore.get(tagId);
        const thumbnailIds = _(thumbnailStore.getAll()[gender][age])
            .pick(tag.thumbnail_ids)
            .keys()
            // Remove ones we've already stored.
            .filter(thumbnailId => (
                undefined === thumbnailFeatureStore.getAll()[gender][age][thumbnailId]
            ))
            .value();

        if (thumbnailIds.length === 0) {
            return LoadActions;
        }

        LoadActions.fetchThumbnails(thumbnailIds, gender, age, ['thumbnail_id', 'feature_ids'])
        .then(thumbRes => {
            // Configure the reduce/filter.
            const ignoreIds = UTILS.VALENCE_IGNORE_INDEXES;
            const numToKeep = UTILS.VALENCE_NUM_TO_KEEP;

            // Keep a set of all the feature ids in the response.
            const featureIds = [];

            const newThumbnailFeatureMap = {};

            thumbRes.thumbnails.forEach(t => {
                const featureIdValues = t.feature_ids ? t.feature_ids.reduce((array, idValue) => {
                    const featureId = idValue[0];
                    if (ignoreIds.indexOf(parseInt(featureId.split('_')[1], 10)) === -1) {
                        array.push(idValue);
                    }
                    return array;
                }, []) : [];

                const sortedIds = _(featureIdValues)
                    .orderBy(idValue => idValue[1], ['desc'])
                    .slice(0, numToKeep)
                    .reduce((ids, idValue) => {
                        ids.push(idValue[0]);
                        return ids;
                    }, []);

                featureIds.push(...sortedIds);
                newThumbnailFeatureMap[t.thumbnail_id] = sortedIds;
            });

            thumbnailFeatureStore.set(gender, age, newThumbnailFeatureMap);

            const missingFeatureIds = _.filter(_.uniq(featureIds), featureId => (
                undefined === featureStore.get(featureId)
            ));

            if (!missingFeatureIds) {
                return Promise.resolve({ features: [] });
            }

            // TODO handle more than 100.
            const featureData = {
                noAccountId: true,
                data: {
                    fields: ['name', 'key'].join(','),
                    key: missingFeatureIds.join(','),
                },
            };
            return LoadActions.get('feature', featureData);
        })
        .then(featureRes => {
            const newFeatureMap = {};
            featureRes.features.forEach(feature => {
                // Remove "feature_" prefix.
                const featureKey = feature.key.split('feature_').pop();
                newFeatureMap[featureKey] = feature.name;
            });
            featureStore.set(newFeatureMap);
            Dispatcher.dispatch();
        });
        callback();
        return LoadActions;
    },

    loadTagByShareToken(accountId, tagId, shareToken, callback = Function.prototype) {
        AJAXModule.baseOptions = {
            overrideAccountId: accountId,
            data: { share_token: shareToken },
        };
        return LoadActions.loadTags([tagId], 0, 0, callback);
    },

    loadTags(loadTagIds, gender = 0, age = 0, callback = Function.prototype,
             reload = false, videoFilter = null, thumbnailFilter = null) {
        // Short circuit empty input.
        if (loadTagIds.length === 0) {
            return LoadActions;
        }

        const fetchTagIds = reload ?
            // If reloading, fetch all of them.
            loadTagIds :
            // Else omit the ones we've already loaded.
            _.difference(loadTagIds, _.keys(tagStore.getAll()));
        const fetchTagIdSet = _.uniq(fetchTagIds);

        // For updating all at once below.
        const updateTagMap = {};
        const updateVideoMap = {};

        let tags = [];
        let tagIds = [];
        let videos = [];
        LoadActions.fetchTags(fetchTagIdSet)
        .then(tagRes => {
            Object.assign(updateTagMap, tagRes);

            // Decide which video ids to search for.
            const fetchVideoIds = [];
            tags = _.values(tagRes);
            tagIds = _.keys(tagRes);
            tags.forEach(tag => {
                if (tag.video_id) {
                    if (reload || !videoStore.get(tag.video_id)) {
                        return fetchVideoIds.push(tag.video_id);
                    }
                }
            });
            const fetchVideoIdSet = _.uniq(fetchVideoIds);
            return LoadActions.fetchVideos(fetchVideoIdSet);
        })
        .then(videoRes => {
            videos = videoRes.videos;
            // Filter
            // TODO re-implement using a FilteredStore
            if (videoFilter) {
                videos = videos.filter(videoFilter);
            }

            // Set each by map of id to resource.
            Object.assign(updateVideoMap, videoRes.videos.reduce((map, video) => (
                Object.assign({}, map, { [video.video_id]: video })
            ), {}));

            // Set the thumbnails that are inlined in video result.
            videos.forEach((video) => {
                // For each demo, store its thumbnails by demo keys.
                video.demographic_thumbnails.forEach((dem) => {

                    const working = Object.assign({}, dem)

                    const demGender = UTILS.FILTER_GENDER_COL_ENUM[dem.gender];
                    const demAge = UTILS.FILTER_AGE_COL_ENUM[dem.age];
                    if (demAge === undefined || demGender === undefined) {
                        return;
                    }

                    // Filter
                    // TODO re-implement using a FilteredStore.
                    if (thumbnailFilter) {
                        working.thumbnails = working.thumbnails.filter(thumbnailFilter);
                        working.bad_thumbnails = working.bad_thumbnails.filter(thumbnailFilter);
                    }

                    // Build partial update map.
                    const thumbnailMap = {};
                    dem.thumbnails.forEach(t => {
                        thumbnailMap[t.thumbnail_id] = t;
                    });
                    if (dem.bad_thumbnails) {
                        dem.bad_thumbnails.forEach(t => {
                            thumbnailMap[t.thumbnail_id] = t;
                        });
                    }

                    thumbnailStore.set(demGender, demAge, thumbnailMap);
                });
            });

            // Get the set of thumbnail ids.
            const fetchThumbnailIds = _
                .chain(tags)
                // Skip video tags if they don't have clips.
                .filter(tag => {
                    if (tag.tag_type === UTILS.TAG_TYPE_VIDEO_COL) {
                        const video = updateVideoMap[tag.video_id];
                        return video.demographic_clip_ids.length > 0;
                    }
                    return true;
                })
                // Concatentate the array of thumbnail ids.
                .reduce((thumbnailIds, tag) => {
                    thumbnailIds.push(...tag.thumbnail_ids);
                    return thumbnailIds;
                }, [])
                .value();

            // Get a list of all the clip ids.
            const fetchClipIds = videos.reduce((clipIds, video) => {
                clipIds.push(...video.demographic_clip_ids.reduce((_ids, dem) => {
                    _ids.push(...dem.clip_ids);
                    return _ids;
                }, []));
                return clipIds;
            }, []);

            // Run these fetches together.
            const thumbnailsPromise = LoadActions.fetchThumbnails(fetchThumbnailIds);
            const clipsPromise = LoadActions.fetchClips(fetchClipIds);
            return Promise.all([thumbnailsPromise, clipsPromise]);
        })
        .then(combinedRes => {
            const thumbRes = combinedRes[0] || { thumbnails: [] };
            const clipRes = combinedRes[1] || { clips: [] };

            // Mapping the response from the thumbnail promise
            const thumbnailMap = thumbRes.thumbnails.reduce((map, t) => (
                Object.assign({}, map, { [t.thumbnail_id]: t })
            ), {});

            videos.forEach(video => {
                video.demographic_clip_ids.forEach(dem => {
                    const demGender = UTILS.FILTER_GENDER_COL_ENUM[dem.gender];
                    const demAge = UTILS.FILTER_AGE_COL_ENUM[dem.age];
                    if (demAge === undefined || demGender === undefined) {
                        return;
                    }
                    const clipMap = {};
                    dem.clip_ids.forEach(clipId => {
                        clipMap[clipId] = clipRes.clips.find(clip => clip.clip_id === clipId);
                    });
                    clipStore.set(demGender, demAge, clipMap);
                });
            });

            // Set all of these together within one synchronous block.
            tagStore.set(updateTagMap);
            videoStore.set(updateVideoMap);
            thumbnailStore.set(gender, age, thumbnailMap);

            // This is the first point at which we can display
            // a meaningful set of results, so dispatch.
            Dispatcher.dispatch();
            return LoadActions.fetchLifts(tagIds, gender, age);
        })
        .then(liftRes => {
            // Map of tag id to lift map.
            const tagLiftMap = {};
            _.toPairs(liftRes).forEach(pair => {
                const tagId = pair[0];
                const liftMap = pair[1];
                tagLiftMap[tagId] = liftMap;
            });
            liftStore.set(gender, age, tagLiftMap);
            Dispatcher.dispatch();
        });
        callback(tags.length);
        return LoadActions;
    },

    // Tries to fill out the tagStore to n tags
    //
    // Return n the number of new tags.
    // Inputs
    //     n- integer- number of tags we want to have in the tagStore
    //     query- string- filter applied on Tag name
    //     type- a UTILS.TAG_TYPE_*, filter applied on Tag tag_type
    //     reload- bool
    //         if false, don't call the backend if the number of
    //             tags in the filteredTagStore exceeds n
    //         if true, always call the backend, reloading those
    //             tags we have stored.
    loadNNewestTags(n, query = null, type = null, reload = false,
                    videoFilter = null, thumbnailFilter = null,
                    callback = Function.prototype) {
        const haveCount = filteredTagStore.count();

        // If reloading, skip these checks that return early.
        if (!reload) {
            // Short circuit search if we have enough items or everything.
            if (n <= haveCount) {
                callback();
                return LoadActions;
            }
            if (tagStore.completelyLoaded) {
                callback();
                return LoadActions;
            } else if (query && filteredTagStore.completelyLoaded) {
                callback();
            }
        }

        // Ensure searches are no bigger than the max.
        const limit = reload ?
            Math.min(n, UTILS.MAX_SEARCH_SIZE) :
            Math.min(n - haveCount, UTILS.MAX_SEARCH_SIZE);

        const data = { limit };

        // If reloading, we always load the front (i.e., latest) tags,
        // so no need to set the "until" parameter.
        const oldestTimestamp = tagStore.getOldestTimestamp();
        if (!reload && oldestTimestamp) {
            // Get float of unix time in seconds
            data.until = oldestTimestamp;
        }
        if (query) {
            data.query = query;
        }
        if (type) {
            data.tag_type = type;
        }

        LoadActions.get('tags/search', { data })
        .then(searchRes => {
            // Mark this store as completely loaded.
            if (searchRes.items.length < limit) {
                if (query) {
                    filteredTagStore.completelyLoaded = true;
                } else {
                    tagStore.completelyLoaded = true;
                }
            }
            if (searchRes.items.length === 0) {
                callback(true);
            }

            LoadActions.loadFromSearchResult(
                searchRes, reload, videoFilter, thumbnailFilter, callback);
        });
        return LoadActions;
    },

    loadNOlderTags(n, type = null, videoFilter = null,
                   thumbnailFilter = null, callback = Function.prototype) {
        const limit = Math.min(n, UTILS.MAX_SEARCH_SIZE);
        const until = tagStore.getOldestTimestamp();
        const data = { limit, until };
        if (type) {
            data.tag_type = type;
        }
        LoadActions.get('tags/search', { data })
        .then(searchRes => {
            if (searchRes.items.length < limit) {
                tagStore.completelyLoaded = true;
            }
            LoadActions.loadFromSearchResult(
                searchRes, false, videoFilter, thumbnailFilter, callback);
        });
        callback(true);
    },

    // Get a share url for a tag.
    loadShareUrl(tagId, callback = Function.prototype) {
        if (tagShareStore.has(tagId)) {
            return LoadActions;
        }

        const updateMap = {};
        const data = { tag_id: tagId };
        LoadActions.get('tags/share', { data })
        .then(shareRes => {
            updateMap.token = shareRes.share_token;

            const base = window.location.origin;
            const accountId = SESSION.state.accountId;
            const t = updateMap.token;
            const longUrl = `${base}/share/collection/${tagId}/account/${accountId}/token/${t}/`;

            UTILS.shortenUrl(longUrl, shortenRes => {
                if (shortenRes.status_code === 200) {
                    updateMap.url = shortenRes.data.url;
                } else {
                    updateMap.url = longUrl;
                }
                tagShareStore.set({ [tagId]: updateMap });
                Dispatcher.dispatch();
            });
        });
        callback();
        return LoadActions;
    },

    loadAccount(accountId) {
        // For now just return, but
        // eventually we should check to make
        // the account hasn't had any mods
        if (accountStore.has(accountId)) {
            return LoadActions;
        }
        LoadActions.get()
        .then(res => {
            if (res.account_id) {
                accountStore.set({ [res.account_id]: res });
                Dispatcher.dispatch();
            }
        });
        return LoadActions;
    },
});

// Search intercepts requests to the tag store
// so that we can known if there is another page
// to display after current, and to preload
// that page for responsiveness.
export const Search = {

    pending: 0,
    emptySearch: false,

    getLargeCount(count) {
        return count + UTILS.RESULTS_PAGE_SIZE + 1;
    },

    load(count, onlyThisMany = false, callback = null) {
        // Aggressively load tags unless caller specifies only this many.
        const largeCount = onlyThisMany ? count : Search.getLargeCount(count);
        Search.incrementPending();
        const wrapped = Search.getWrappedCallback(callback);
        LoadActions.loadNNewestTags(largeCount, null, null, false, null, null, wrapped);
    },

    loadWithQuery(count, query = null, type = null, callback = null) {
        const largeCount = Search.getLargeCount(count);
        Search.incrementPending();
        const wrapped = Search.getWrappedCallback(callback);
        LoadActions.loadNNewestTags(largeCount, query, type, false, null, null, wrapped);
    },

    reload(count, query = null, type = null, callback = null) {
        Search.incrementPending();
        const wrapped = Search.getWrappedCallback(callback);
        LoadActions.loadNNewestTags(count, query, type, true, null, null, wrapped);
    },

    getWrappedCallback(callback) {
        return (isEmpty) => {
            Search.decrementPending();
            if (isEmpty) {
                Search.setEmptySearch(true);
                Dispatcher.dispatch();
            }
            if (_.isFunction(callback)) {
                callback();
            }
        };
    },

    hasMoreThan(count) {
        return filteredTagStore.count() > count;
    },

    setEmptySearch() {
        Search.emptySearch = true;
        return Search;
    },

    incrementPending() {
        Search.pending += 1;
        return Search;
    },

    decrementPending() {
        Search.pending -= 1;
        return Search;
    },

    reset() {
        Search.pending = 0;
        Search.emptySearch = false;
        return Search;
    },
};

export const ServingStatusActions = Object.assign({}, AjaxMixin, {
    toggleThumbnailEnabled(thumbnail) {
        const thumbnailId = thumbnail.thumbnail_id;
        const videoId = thumbnail.video_id;
        const video = videoStore.get(videoId);
        const options = {
            data: {
                thumbnail_id: thumbnailId,
                enabled: !thumbnail.enabled } };
        ServingStatusActions.put('thumbnails', options)
            .then(() => LoadActions.loadTags([video.tag_id]));
    },
});

export const SendActions = Object.assign({}, AjaxMixin, {

    deleteCollectionByTagId(tagId) {
        const tag = tagStore.get(tagId);
        const data = { tag_id: tagId, hidden: true };
        SendActions.put('tags', { data })
            .then(res => {
                tag.hidden = true;
                tagStore.set({ [res.tag_id]: tag });
                Dispatcher.dispatch();
            });
    },

    refilterVideo(videoId, gender, age, callback, data = {}) {
        Object.assign(data, {
            gender,
            age,
            external_video_ref: videoId,
            reprocess: true,
        });

        const enumGender = UTILS.FILTER_GENDER_COL_ENUM[gender];
        const enumAge = UTILS.FILTER_AGE_COL_ENUM[age];

        SendActions.post('videos', { data })
            .then(() => {
                LoadActions.fetchVideos([videoId], enumGender, enumAge, callback);
            });
    },

    refilterVideoForClip(videoId, gender, age, callback) {
        this.refilterVideo(
            videoId, gender, age, callback, UTILS.CLIP_OPTIONS);
    },

    sendEmail(data, callback) {
        SendActions.post('email', { data })
        .then(() => callback({ status_code: 200 }))
        .catch(() => {
            callback({
                status_code: 400,
                errorMessage: 'unknown error sending email',
            });
        });
    },
});

// Cancel pending requests and reset each store.
export const resetStores = () => {
    LoadActions.cancelAll();
    SendActions.cancelAll();
    ServingStatusActions.cancelAll();
    Search.reset();

    tagStore.reset();
    filteredTagStore.reset();
    videoStore.reset();
    clipStore.reset();
    thumbnailStore.reset();
    liftStore.reset();
    featureStore.reset();
    thumbnailFeatureStore.reset();
};

// This returns an object that is good defaulted base store
// state for a top-level component like a page.
export const getStateFromStores = () => ({
    // Map of tag id to tag.
    tags: tagStore.getAll(),

    // A submap of tags, of those results that are showable.
    selectedTags: filteredTagStore.getAll(),

    // Map of gender, age, clip id to clip.
    clips: clipStore.getAll(),

    // Map of video id to video.
    videos: videoStore.getAll(),

    // Map of gender, age, thumbnail id to thumbnail.
    thumbnails: thumbnailStore.getAll(),

    // Map of gender, age, tag id to map of thumb id to lift float
    // Note: This assumes the tag has only one base thumbnail
    // for comparisons: for a video with a default thumbnail,
    // it is the default thumbnail. In all other cases, it's
    // the worst thumbnail.
    lifts: liftStore.getAll(),

    // Map of feature key to feature name
    features: featureStore.getAll(),

    // Map of gender, age, thumbnail id to array of feature key
    // sorted by value descending.
    thumbnailFeatures: thumbnailFeatureStore.getAll(),

    // Map of tag id to {token: <share token>, url: <share url>}
    tagShares: tagShareStore.getAll(),

    // Map of account id to account.
    accounts: accountStore.getAll(),
});
