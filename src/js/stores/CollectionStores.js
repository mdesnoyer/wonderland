import _ from 'lodash';
import moment from 'moment';

import AjaxMixin from '../mixins/Ajax';
import AJAXModule from '../modules/ajax';
import SESSION from '../modules/session';
import UTILS from '../modules/utils';

class Store {
    constructor() {
        this.__store = {};
        this.completelyLoaded = false;
    }

    getAll() {
        return this.__store;
    }

    get(id) {
        return this.__store[id];
    }

    set(map) {
        Object.assign(this.__store, map);
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
        if (this.count() == 0) {
            return null;
        }

        const oldestItem = _(this.getAll())
            .values()
            .minBy(item => item.created);
        return moment(oldestItem.created + 'Z').format('x') / 1000;
    }

    reset() {
        this.__store = {};
        this.completelyLoaded = false;
    }
}

class DemoStore extends Store {
    constructor() {
        super();
        this.__store = this.genderAgeBaseMap();
    }

    get(gender, age, map) {
        return _clips[gender][age][id];
    }

    set(gender, age, map) {
        Object.assign(this.__store[gender][age], map);
        return this;
    }

    has(gender, age, id) {
        return undefined !== this.get(gender, age, id);
    }


    reset() {
        super.reset();
        this.__store == this.genderAgeBaseMap();
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
                5: {}
            },
            1: {
                0: {},
                1: {},
                2: {},
                3: {},
                4: {},
                5: {}
            },
            2: {
                0: {},
                1: {},
                2: {},
                3: {},
                4: {},
                5: {}
            }
        }
    }
}

class FilteredStore {
    constructor(sourceStore) {
        this.sourceStore = sourceStore;
        this.filter = this.__defaultFilter;
        this.completelyLoad = false;
    }

    __defaultFilter(item) {
        return item.hidden !== true;
    }

    setFilter(filter) {
        this.filter = filter;
    }

    // Get all that pass filter.
    getAll() {
        const result  = _(this.sourceStore.getAll())
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

    // Given the result from a tag search API call,
    // load all downstream stores after checking
    // they're already loaded.

    loadFromSearchResult: (searchRes, reload, videoFilter, thumbnailFilter, callback) => {

        // Short circuit empty input.
        if(searchRes.items.length == 0) {
            return;
        }

        // Search uses null (0) demographics.
        const gender = 0;
        const age = 0;

        // Load tags and videos together so we can get thumbnails
        // for only the missing ids.

        // Bind update objects in outer scope.
        const updateTagMap = {};
        const updateVideoMap = {};
        const updateClipMap = {};

        const searchResTagIds = _.chain(searchRes.items)
            .reduce((tagIds, tag) => {
                tagIds.push(tag.tag_id);
                return tagIds;
            }, [])
            .uniq()
            .value()
        ;

        // Decide which tag ids to search for.
        const searchForTagIds = reload ?
            // If reloading, search for all of them.
            searchResTagIds :
            // Else omit the ones we've already loaded.
            _.difference(searchResTagIds, _.keys(tagStore.getAll()));

        let tagPromise = Promise.resolve({});
        if (searchForTagIds.length > 0) {
            const tagData = {
                tag_id: searchForTagIds.join(',')
            };
            tagPromise = LoadActions.GET('tags', {data: tagData});
        }

        // Build promise for videos referenced from tags.
        let videoPromise = Promise.resolve({videos: []});

        let usingVideoIds;
        if (reload) {
            // Just get every video id in the search result.
            usingVideoIds = _(searchRes.items)
            .reduce((videoIds, tag) => {
                if(tag.video_id) {
                    videoIds.push(tag.video_id);
                }
                return videoIds;
            }, [])
        } else {
            usingVideoIds = _
            .chain(searchRes.items)
            .reduce((videoIds, tag) => {
                if(tag.video_id) {
                    videoIds.push(tag.video_id);
                }
                return videoIds;
            }, [])
            // Omit all the stored ones.
            .difference(_.keys(videoStore.getAll()))
            .uniq()
            .value();
        }
        if (usingVideoIds.length > 0) {
            const videoData = {
                video_id: usingVideoIds.join(','),
                fields: UTILS.VIDEO_FIELDS_MIN.join(',')
            };
            videoPromise = LoadActions.GET('videos', {data: videoData});
        }

        let videos;
        Promise.all([tagPromise, videoPromise])
        .then(combined => {

            // Unpack promises.
            const tagRes = combined[0] || {};
            const videoRes = combined[1] || {videos: []};

            // Filter
            if (videoFilter) {
                videoRes.videos = videoRes.videos.filter(videoFilter);
            }
            videoRes.video_count = videoRes.videos.length; // hackety-hack

            // Set each by map of id to resource.
            Object.assign(updateTagMap, tagRes);

            //grab all clip IDs
            Object.assign(updateVideoMap, videoRes.videos.reduce((map, video) => {
                map[video.video_id] = video;
                return map;
            }, {}));

            // Store the video thumbnails since they're inline in response.
            videos = videoRes.videos;
            videos.map(video => {

                // For each demo, store its thumbnails by demo keys.
                video.demographic_thumbnails.map(dem => {

                    // Shadow gender and age within this scope.
                    let gender = UTILS.FILTER_GENDER_COL_ENUM[dem.gender];
                    let age = UTILS.FILTER_AGE_COL_ENUM[dem.age];
                    if (age === undefined || gender === undefined) {
                        console.warn('Unknown demo ', dem.age, dem.gender);
                        return;
                    }

                    // Filter
                    if (thumbnailFilter) {
                        dem.thumbnails = dem.thumbnails.filter(thumbnailFilter);
                        dem.bad_thumbnails = dem.bad_thumbnails.filter(thumbnailFilter);
                    }

                    // Build partial update map.
                    let thumbnailMap = {};
                    dem.thumbnails.map(t => {
                        thumbnailMap[t.thumbnail_id] = t;
                    });
                    if (dem.bad_thumbnails) {
                        dem.bad_thumbnails.map(t => {
                            thumbnailMap[t.thumbnail_id] = t;
                        });
                    }
                    else {
                        dem.bad_thumbnails = [];
                    }

                    thumbnailStore.set(gender, age, thumbnailMap);

                });
            });

            // Now load the thumbnails for the non-video tags.

            // Get the set of thumbnail ids.

            var clipIds = []
            videoRes.videos.map(function(index, elem) {
                index.demographic_clip_ids.map(function(item, i) {
                    item.clip_ids.map(function(i) {
                        clipIds.push(i)
                    });
                });
            });
            const tags = _.values(tagRes);

            const thumbnailIdSet = _
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
                    thumbnailIds = thumbnailIds.concat(tag.thumbnail_ids);
                    return thumbnailIds;
                }, [])
                // Remove duplicates.
                .uniq()
                .value();

            const thumbnailsPromise = LoadActions.loadThumbnails(thumbnailIdSet, gender, age)
            const clipsPromise = LoadActions.loadClips(clipIds, gender, age)

            Promise.all([thumbnailsPromise, clipsPromise])
            .then(combinedRes => {
                const thumbRes = combinedRes[0] || {thumbnails: []};
                const clipRes = combinedRes[1] || {clips: []};

                // Mapping the response from the thumbnail promise
                const thumbnailMap = thumbRes.thumbnails.reduce((map, t) => {
                    map[t.thumbnail_id] = t;
                    return map;
                }, {});

                videos.map(video => {
                    video.demographic_clip_ids.map(dem => {
                        const gender = UTILS.FILTER_GENDER_COL_ENUM[dem.gender];
                        const age = UTILS.FILTER_AGE_COL_ENUM[dem.age];
                        if (age === undefined || gender === undefined) {
                            console.warn('Unknown demo ', dem.age, dem.gender);
                            return;
                        }
                        const clipMap = {};
                        dem.clip_ids.map(clip_id => {
                            clipMap[clip_id] = clipRes.clips.find(clip => clip.clip_id == clip_id);
                        });
                        clipStore.set(gender, age, clipMap);
                    })
                })

                // Set all of these together within one synchronous block.
                tagStore.set(updateTagMap);
                videoStore.set(updateVideoMap);
                thumbnailStore.set(gender, age, thumbnailMap);
                // This is the first point at which we can display
                // a meaningful set of results, so dispatch.
                Dispatcher.dispatch();

                if (_.isFunction(callback)) {
                    callback();
                }

                return LoadActions.loadLifts(_.keys(tagRes), gender, age);
            })
            .then(liftRes => {
                // Map of tag id to lift map.
                const tagLiftMap = {};
                _.toPairs(liftRes).map(pair => {
                    const tagId = pair[0];
                    const liftMap = pair[1];
                    tagLiftMap[tagId] = liftMap;
                });
                liftStore.set(gender, age, tagLiftMap);
                Dispatcher.dispatch();
            });
        })
    },

    loadVideos(videoIds, liftGender=0, liftAge=0, callback) {
        if(0 == videoIds.length) {
            return;
        }
        const updateThumbnailMap = {};
        const videoIdSet = _.uniq(videoIds);
        const videoData = {
                video_id: videoIdSet.join(','),
                fields: UTILS.VIDEO_FIELDS_MIN.join(',')
            };
        LoadActions.GET('videos', {data: videoData})
        .then(videoRes => {


            // Build update map.
            const thumbnailDemoMap = {};
            const tagIds = [];
            // Store the video thumbnails since they're inline in response.
            videoRes.videos.map(video => {

                // For each demo, store its thumbnails by demo keys.
                video.demographic_thumbnails.map(dem => {

                    const gender = UTILS.FILTER_GENDER_COL_ENUM[dem.gender];
                    const age = UTILS.FILTER_AGE_COL_ENUM[dem.age];
                    if (age === undefined || gender === undefined) {
                        console.warn('Unknown demo ', dem.age, dem.gender);
                        return;
                    }
                    if (thumbnailDemoMap[gender] === undefined) {
                        thumbnailDemoMap[gender] = {};
                    }
                    if (thumbnailDemoMap[gender][age] === undefined) {
                        thumbnailDemoMap[gender][age] = {};
                    }
                    dem.thumbnails.map(t => {
                        thumbnailDemoMap[gender][age][t.thumbnail_id] = t;
                    });
                    dem.bad_thumbnails.map(t => {
                        thumbnailDemoMap[gender][age][t.thumbnail_id] = t;
                    });

                    tagIds.push(video.tag_id);
                });
            });

            // Set new value to stores.
            videoStore.set(videoRes.videos.reduce((map, video) => {
                map[video.video_id] = video;
                return map;
            }, {}));
            for (let gender in thumbnailDemoMap) {
                for (let age in thumbnailDemoMap[gender]) {
                    if (gender === 'null') {
                        gender = 0;
                    }
                    if (age === 'null') {
                        age = 0;
                    }
                    thumbnailStore.set(gender, age, thumbnailDemoMap[gender][age]);
                }
            }
            Dispatcher.dispatch();

            LoadActions.loadLifts(tagIds, liftGender, liftAge, true)
            .then(liftRes => {
                // Map of tag id to lift map.
                const tagLiftMap = liftRes;
                liftStore.set(liftGender, liftAge, tagLiftMap);
                Dispatcher.dispatch();

                if (_.isFunction(callback)) {
                    callback(videoRes);
                }
            })
        });
    },

    // Load video resource until an estimate is provided
    // or the video status is not processing.
    // TODO think about where something like this should go.
    loadProcessingVideoUntilEstimate(videoId, gender=0, age=0) {
        const repeat = function(videoResponse) {
            const video = videoResponse.videos[0];
            if (video.state === UTILS.VIDEO_STATE_ENUM.processing) {
                if (video.estimated_time_remaining !== null) {
                    // After time remaining is set, done.
                    return;
                }
                // Else try again.
                setTimeout(LoadActions.loadProcessingVideoUntilEstimate.bind(null, [videoId], gender, age), 3000);
            }
            // After state change from processing, done.
        };
        LoadActions.loadVideos([videoId], gender, age, repeat);
    },

    // Load thumbnails by ids.
    loadThumbnails: function(thumbnailIds, gender=0, age=0, fields=[]) {
        // Empty array of ids is no-op.
        if(thumbnailIds.length == 0) {
            return Promise.resolve({thumbnails: []});
        }

        // Create array of CSVs of max length.
        const thumbArgs = UTILS.csvFromArray(thumbnailIds);
        const baseParams = getBaseParamsForDemoRequest(gender, age, fields);

        let params;
        // Batch only large requests since batch is slower.
        if (thumbArgs.length > 1) {
            thumbArgs.map(arg => {
                // Build this batch's params by copying base params and adding the tid arg.
                params = {};
                Object.assign(params, baseParams, {thumbnail_id: arg});
                LoadActions.batch('GET', 'thumbnails', params);
            });
            return LoadActions.sendBatch();
        } else {
            params = {};
            Object.assign(params, baseParams, {thumbnail_id: thumbArgs[0]});
            return LoadActions.GET('thumbnails', {data: params});
        }
    },

    loadClips: function(clipIds, gender=0, age=0) {
        if(clipIds.length == 0) {
            return Promise.resolve({clips: []});
        }
        const clipArgs = UTILS.csvFromArray(clipIds);
        const baseParams = getBaseParamsForDemoRequest(gender, age, UTILS.CLIP_FIELDS);
        let params;
        if (clipArgs.length > 1) {
            clipArgs.map(arg => {
                // Build this batch's params by copying base params and adding the tid arg.
                params = {};
                Object.assign(params, baseParams, {clip_ids: arg});
                LoadActions.batch('GET', 'clips', params);
            });
            return LoadActions.sendBatch();
        } else {
            params = {};
            Object.assign(params, baseParams, {clip_ids: clipArgs[0]});
            return LoadActions.GET('clips', {data: params});
        }
    },

    // Load lifts for thumbnails from data source.
    loadLifts: function(tagIds, gender=0, age=0, reload=false) {

        // Find tags missing from stored lift map for demo.
        const loadTagIds = reload ?
            tagIds :
            tagIds.reduce((loadTagIds, tagId) => {
            if (_.isEmpty(tagStore.get(gender, age, tagId))) {
                loadTagIds.push(tagId);
            }
            return loadTagIds;
        }, []);
        // Short circuit if empty.
        if (0 == loadTagIds.length) {
            return Promise.resolve([]);
        }

        const baseParams = getBaseParamsForDemoRequest(gender, age);

        // Store map of base thumbnail id to tag id for reverse lookup
        // while processing response.
        const baseTagMap = {};

        const tagLiftMap = {};

        loadTagIds.map(tagId => {

            // TODO refactor this and CollectionsContainer getLeftRight.

            // Get the worst thumbnail.
            const tag = tagStore.get(tagId);

            const thumbnailMap = _.pick(
                thumbnailStore.getAll()[gender][age],
                tag.thumbnail_ids);

            const thumbnailIds = _.keys(thumbnailMap);

            // Special case for 0, 1 thumbnail collections:
            // 1 is just a map of the image to 0% lift vs itself.
            // 0 is the null map.
            switch (thumbnailIds.length) {
                case 1:
                    const onlyId = thumbnailIds[0];
                    tagLiftMap[tagId] = {[onlyId]: 0};
                    return;
                case 0:
                    tagLiftMap[tagId] = {};
                    return;
            }

            // If the type is video, its default thumbnail
            // is used instead of the worst.
            const worst = UTILS.worstThumbnail(_.values(thumbnailMap));
            let _default;
            if(tag.tag_type === UTILS.TAG_TYPE_VIDEO_COL) {
                const video = videoStore.get(tag.video_id);
                const demo = UTILS.findDemographicThumbnailObject(
                    video.demographic_thumbnails, gender, age);
                _default = UTILS.findDefaultThumbnail(demo);
            }

            const baseThumb = _default? _default: worst;
            const base_id = baseThumb.thumbnail_id;
            baseTagMap[base_id] = tagId;

            // Copy params array and assign the thumbnail ids.
            const vsThumbnailIds = _.keys(_.omit(thumbnailMap, [base_id]));

            // Batch each MAX_CSV_VALUE_COUNT (100) thumbnail ids.
            const csvArray = UTILS.csvFromArray(vsThumbnailIds);
            csvArray.map(thumbnail_ids => {
                const params = {};
                Object.assign(params, baseParams, {base_id, thumbnail_ids});
                LoadActions.batch('GET', 'stats/estimated_lift', params);
            });
        });
        return LoadActions.sendBatch({
            // Unpack batch response.
            successHandler: batches => {
                return batches.results.reduce((tagLiftMap, batch) => {
                    const baseId = batch.response.baseline_thumbnail_id;
                    // Use reverse lookup to get the tag id from the base thumb id.
                    const tagId = baseTagMap[baseId];
                    tagLiftMap[tagId] = batch.response.lift.reduce((map, item) => {
                        map[item.thumbnail_id] = item.lift;
                        return map;
                    }, {});
                    return tagLiftMap;
                }, tagLiftMap);
            }
        });
    },

    // Load data for given demographic if new.
    // (Written for child callback.)
    loadTagForDemographic: function(tagId, gender, age, callback) {

        // Find the missing thumbnail ids.
        const missingThumbIds = [];
        const tag = tagStore.get(tagId);
        if (tag.tag_type === UTILS.TAG_TYPE_VIDEO_COL) {
            // These are already loaded!
        } else {
            tag.thumbnail_ids.map(tid => {
                if (undefined === thumbnailStore.get(gender, age, tid)) {
                    missingThumbIds.push(tid);
                }
            });
        }

        const newThumbnailMap = {};
        LoadActions.loadThumbnails(missingThumbIds, gender, age)
        .then(thumbRes => {
            thumbRes.thumbnails.map(t => {
                newThumbnailMap[t.thumbnail_id] = t;
            });
            thumbnailStore.set(gender, age, newThumbnailMap);
            return LoadActions.loadLifts([tagId], gender, age);
        })
        .then(liftRes => {
            const tagLiftMap = liftRes;
            // Set, dispatch and callback.
            liftStore.set(gender, age, tagLiftMap);
            Dispatcher.dispatch();
            callback();
        })
    },

    // Load Feature objects for the thumbnails for the given tag
    // for the given demographic.
    loadFeaturesForTag(tagId, gender, age) {

        // Get missing thumbnail ids.
        const tag = tagStore.get(tagId);
        const thumbnailIds = _(thumbnailStore.getAll()[gender][age])
            .pick(tag.thumbnail_ids)
            .keys()
            .filter(thumbnailId => {
                // Remove ones we've already stored.
                return undefined === ThumbnailFeatureStore.getAll()[gender][age][thumbnailId];
            })
            .value();

        if(thumbnailIds.length == 0) {
            return;
        }

        LoadActions.loadThumbnails(thumbnailIds, gender, age, ['thumbnail_id', 'feature_ids'])
        .then(thumbRes => {

            // Configure the reduce/filter.
            const ignoreIds = UTILS.VALENCE_IGNORE_INDEXES;
            const numToKeep = UTILS.VALENCE_NUM_TO_KEEP;

            // Keep a set of all the feature ids in the response.
            let featureIdSet = [];

            const newThumbnailFeatureMap = {};

            thumbRes.thumbnails.map(t => {
                const featureIdValues = t.feature_ids ? t.feature_ids.reduce((array, idValue) => {
                    let featureId = idValue[0];
                    let featureValue = idValue[1];
                    if (ignoreIds.indexOf(parseInt(featureId.split('_')[1])) === -1) {
                        array.push(idValue);
                    }
                    return array;
                }, []) : [];

                const sortedIds = _(featureIdValues)
                    .orderBy(idValue => {
                        return idValue[1];
                    }, ['desc'])
                    .slice(0, numToKeep)
                    .reduce((ids, idValue) => {
                        ids.push(idValue[0]);
                        return ids;
                    }, []);

                featureIdSet = _.union(featureIdSet, sortedIds);
                newThumbnailFeatureMap[t.thumbnail_id] = sortedIds;
            });

            ThumbnailFeatureStore.set(gender, age, newThumbnailFeatureMap);

            const missingFeatureIds = _.filter(featureIdSet, featureId => {
                return undefined === FeatureStore.get(featureId);
            });

            if (missingFeatureIds.length == 0) {
                return Promise.resolve({features: []});
            }

            // TODO handle more than 100.
            const featureData = {
                noAccountId: true,
                data: {
                    fields: ['name', 'key'].join(','),
                    key: missingFeatureIds.join(',')
                }
            };

            LoadActions.GET('feature', featureData)
            .then(featureRes => {
                const newFeatureMap = {};
                featureRes.features.map(feature => {
                    // Remove "feature_" prefix.
                    const featureKey = feature.key.split('feature_').pop();
                    newFeatureMap[featureKey] = feature.name;
                });
                FeatureStore.set(newFeatureMap);
                Dispatcher.dispatch();
            });
        });
    },

    loadTagByShareToken(accountId, tagId, shareToken) {
        AJAXModule.baseOptions = {
            overrideAccountId: accountId,
            data: {share_token: shareToken}
        };

        LoadActions.loadTags([tagId]);
    },

    loadTags(tagIds, gender=0, age=0) {

        // Short circuit empty input.
        if(tagIds.length == 0) {
            return;
        }

        // Bind update objects in outer scope.
        const updateTagMap = {};
        const updateVideoMap = {};
        const updateThumbnailMap = {};

        const tagData = {
            tag_id: tagIds.join(',')
        };
        LoadActions.GET('tags', {data: tagData})
        .then(tagRes => {

            Object.assign(updateTagMap, tagRes);

            const videoIds = _.values(tagRes).reduce((videoIds, tag) => {
                if(tag.video_id) {
                    videoIds.push(tag.video_id);
                }
                return videoIds;
            }, []);

            const videoData = {
                video_id: videoIds.join(','),
                fields: UTILS.VIDEO_FIELDS.join(',')
            };

            const videoPromise = videoIds.length > 0?
                LoadActions.GET('videos', {data: videoData}):
                Promise.resolve({videos: []});

            videoPromise.then(videoRes => {

                // Set each by map of id to resource.
                Object.assign(updateVideoMap, videoRes.videos.reduce((map, video) => {
                    map[video.video_id] = video;
                    return map;
                }, {}));
                // Store the video thumbnails since they're inline in response.
                videoRes.videos.map(video => {

                    // For each demo, store its thumbnails by demo keys.
                    video.demographic_thumbnails.map(dem => {

                        // Shadow gender and age within this scope.
                        let gender = UTILS.FILTER_GENDER_COL_ENUM[dem.gender];
                        let age = UTILS.FILTER_AGE_COL_ENUM[dem.age];
                        if (age === undefined || gender === undefined) {
                            console.warn('Unknown demo ', dem.age, dem.gender);
                            return;
                        }

                        // Build partial update map.
                        const thumbnailMap = {};
                        dem.thumbnails.map(t => {
                            thumbnailMap[t.thumbnail_id] = t;
                        });
                        if (dem.bad_thumbnails) {
                            dem.bad_thumbnails.map(t => {
                                thumbnailMap[t.thumbnail_id] = t;
                            });
                        }

                        Object.assign(updateThumbnailMap, thumbnailMap);
                        thumbnailStore.set(gender, age, thumbnailMap);
                    });
                });

                // Now load the thumbnails for the non-video tags.

                // Get the set of thumbnail ids.
                const tags = _.values(tagRes);
                const thumbnailIdSet = _
                    .chain(tags)
                    // Skip video tags.
                    .filter(tag => {
                        return tag.tag_type !== UTILS.TAG_TYPE_VIDEO_COL;
                    })
                    // Concatentate the array of thumbnail ids.
                    .reduce((thumbnailIds, tag) => {
                        thumbnailIds = thumbnailIds.concat(tag.thumbnail_ids);
                        return thumbnailIds;
                    }, [])
                    // Remove duplicates.
                    .uniq()
                    .value();
                LoadActions.loadThumbnails(thumbnailIdSet, gender, age)
                .then(thumbRes => {

                    const thumbnailMap = thumbRes.thumbnails.reduce((map, t) => {
                        map[t.thumbnail_id] = t;
                        return map;
                    }, {});
                    Object.assign(updateThumbnailMap, thumbnailMap);
                    // Set all of these together within one synchronous block.
                    tagStore.set(updateTagMap);
                    videoStore.set(updateVideoMap);
                    thumbnailStore.set(gender, age, thumbnailMap);

                    // This is the first point at which we can display
                    // a meaningful set of results, so dispatch.
                    Dispatcher.dispatch();
                    return LoadActions.loadLifts(_.keys(tagRes), gender, age, true);
                })
                .then(liftRes => {
                    // Map of tag id to lift map.
                    const tagLiftMap = {};
                    _.toPairs(liftRes).map(pair => {
                        const tagId = pair[0];
                        const liftMap = pair[1];
                        tagLiftMap[tagId] = liftMap;
                    });
                    liftStore.set(gender, age, tagLiftMap);
                    Dispatcher.dispatch();
                });
            });
        });
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
    loadNNewestTags(n, query=null, type=null, reload=false, videoFilter=null, thumbnailFilter=null, callback=null) {
        const self = this;
        const haveCount = filteredTagStore.count();

        // If reloading, skip these checks that return early.
        if (!reload) {
            // Short circuit search if we have enough items or everything.
            if (n <= haveCount) {
                callback && callback();
                return;
            }
            if (tagStore.completelyLoaded) {
                callback && callback();
                return;
            } else if (query && filteredTagStore.completelyLoaded) {
                callback && callback();
                return;
            }
        }

        let limit;
        if (!reload) {
            // Ensure searches are no bigger than the max.
            limit = Math.min(n - haveCount, UTILS.MAX_SEARCH_SIZE);
        } else {
            limit = Math.min(n, UTILS.MAX_SEARCH_SIZE);
        }
        const options = {
            data: {limit}
        };

        // Find the oldest timestamp.
        const oldestTimestamp = tagStore.getOldestTimestamp();

        // If reloading, we always load the front (i.e., latest) tags,
        // so no need to set the "until" parameter.
        if (!reload && oldestTimestamp) {
            // Get float of unix time in seconds
            // (Already in UTC)
            options.data.until = oldestTimestamp;
        }
        if (query) {
            options.data.query = query;
        }
        if (type) {
            options.data.tag_type = type;
        }

        self.GET('tags/search', options)
        .then(searchRes => {

            // Mark this store as completely loaded.
            if(searchRes.items.length < limit) {
                if (query) {
                    filteredTagStore.completelyLoaded = true;
                } else {
                    tagStore.completelyLoaded = true;
                }
            }
            if (searchRes.items.length === 0) {
                callback && callback(true);
            }

            LoadActions.loadFromSearchResult(searchRes, reload, videoFilter, thumbnailFilter, callback)
        });
    },

    loadNOlderTags(n, type=null, videoFilter=null, thumbnailFilter=null, callback=null) {
        const self = this,
            limit = Math.min(n, UTILS.MAX_SEARCH_SIZE),
            options = {
                data: {limit}
            }
        ;
        options.data.until = tagStore.getOldestTimestamp();
        if (type) {
            options.data.tag_type = type;
        }
        self.GET('tags/search', options)
        .then(searchRes => {
            if(searchRes.items.length < limit) {
                tagStore.completelyLoaded = true;
            }
            if (searchRes.items.length === 0) {
                callback && callback(true);
            }

            LoadActions.loadFromSearchResult(searchRes, false, videoFilter, thumbnailFilter, callback)
        });
    },

    // Get a share url for a tag.
    loadShareUrl(tagId) {

        if (TagShareStore.has(tagId)) {
            return;
        }

        const updateMap = {};
        LoadActions.GET('tags/share', {data: {tag_id: tagId}})
        .then(shareRes => {
            updateMap.token = shareRes.share_token;

            const longUrl = window.location.origin +
                '/share/collection/' + tagId +
                '/account/' + SESSION.state.accountId +
                '/token/' + updateMap.token + '/';

            UTILS.shortenUrl(longUrl, shortenRes => {

                if (shortenRes.status_code === 200) {
                    updateMap.url = shortenRes.data.url;
                } else {
                    updateMap.url = longUrl;
                }
                TagShareStore.set({[tagId]: updateMap});
                Dispatcher.dispatch();
            });
        });
    },
    loadAccount(accountId) {
        // For now just return, but
        // eventually we should check to make
        // the account hasn't had any mods
        if (accountStore.has(accountId)) {
            return;
        }
        LoadActions.GET('')
        .then(res => {
            if (res.account_id) {
                accountStore.set({[res.account_id]: res});
                Dispatcher.dispatch();
            }
        });
    }
});

export const SendActions = Object.assign({}, AjaxMixin, {

    deleteCollectionByTagId: function(tagId) {
        const tag = tagStore.get(tagId);
        SendActions.PUT('tags', {data: {tag_id: tagId, hidden: true}})
            .then(res => {
                tag.hidden = true;
                tagStore.set({[res.tag_id]: tag});
                Dispatcher.dispatch();
            });
    },

    refilterVideo: function(videoId, gender, age, callback, data={}) {
        Object.assign(data, {
            external_video_ref: videoId,
            reprocess: true,
            gender,
            age,
        });

        const enumGender = UTILS.FILTER_GENDER_COL_ENUM[gender];
        const enumAge = UTILS.FILTER_AGE_COL_ENUM[age];

        SendActions.POST('videos', { data })
            .then(res => {
                LoadActions.loadVideos([videoId], enumGender, enumAge, callback);
            });
    },
    refilterVideoForClip: function(videoId, gender, age, callback) {
        this.refilterVideo(videoId, gender, age, callback, UTILS.CLIP_OPTIONS);
    },
    sendEmail: function(data, callback) {
        SendActions.POST('email', {data})
        .then(function(res) {
            callback({'status_code' : 200});
        })
        .catch(function(err) {
            callback({
                'status_code' : 400,
                'errorMessage' : 'unknown error sending email'
            });
        });

    }
});

export const ServingStatusActions = Object.assign({}, AjaxMixin, {
    toggleThumbnailEnabled: function(thumbnail) {
        const thumbnailId = thumbnail.thumbnail_id;
        const videoId = thumbnail.video_id;
        const video = videoStore.get(videoId);
        const options = { data : { thumbnail_id: thumbnailId, enabled: !thumbnail.enabled } };
        ServingStatusActions.PUT('thumbnails', options)
            .then(res => {
                LoadActions.loadTags([video.tag_id]);
            });
    }
});

// Given the enum of gender, age, return new Object
// with their two api request key and value.
// (Optionally, specify fields in the response.)
const getBaseParamsForDemoRequest = (gender, age, fields=[]) => {

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

const _registerCallbacks = [];
// A class to bind store updates to subscribed components.
export const Dispatcher = {
    dispatch: () => {
        _registerCallbacks.map(callback => {
            callback();
        });
    },
    register: callback => {
        _registerCallbacks.push(callback);
    },

    // Find and remove the callback. Return true if found and removed.
    unregister: callback => {
        let index = _registerCallbacks.indexOf(callback);
        if (index === -1) {
            return false;
        }
        _registerCallbacks.splice(index, 1);
        return true;
    }
};

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

    load(count, onlyThisMany=false, callback=null) {

        // Aggressively load tags unless caller specifies only this many.
        const largeCount = onlyThisMany? count: Search.getLargeCount(count);
        Search.incrementPending();
        const wrapped = Search.getWrappedCallback(callback);
        LoadActions.loadNNewestTags(largeCount, null, null, false, null, null, wrapped);
    },

    loadWithQuery(count, query=null, type=null, callback=null) {
        const largeCount = Search.getLargeCount(count);
        Search.incrementPending();
        const wrapped = Search.getWrappedCallback(callback);
        LoadActions.loadNNewestTags(largeCount, query, type, false, null, null, wrapped);
    },

    reload(count, query=null, type=null, callback=null) {
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
        return Search.emptySearch = true;
    },

    incrementPending() {
        return Search.pending += 1;
    },

    decrementPending() {
        return Search.pending -= 1;
    },

    reset() {
        Search.pending = 0;
        Search.emptySearch = false;
    }
};

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
