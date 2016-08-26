// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import _ from 'lodash';
import moment from 'moment';

import AjaxMixin from '../mixins/Ajax';
import AJAXModule from '../modules/ajax';
import SESSION from '../modules/session';
import UTILS from '../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
const genderAgeBaseMap = () => {
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
};

// TODO? factor base store from named stores.

const _tags = {};
export const TagStore  = {

    getAll: () => {
        return _tags;
    },

    get: id => {
        return _tags[id];
    },

    set: map => {
        Object.assign(_tags, map);
    },

    count: function() {
        return _.values(this.getAll()).length;
    },

    getOldestTimestamp: function() {
        const self = this;
        if (self.count() == 0) {
            return null;
        }

        const oldestTag = _(TagStore.getAll())
        .values()
        .minBy(tag => {
            return tag.created;
        });
        return moment(oldestTag.created + 'Z').format('x') / 1000;
    },

    completelyLoaded: false
};

// A read-only view of the tag store.
export const FilteredTagStore = {

    // Set filter to define the tag set.
    filter: tag => tag.hidden !== true,

    setFilter: function(filter) {
        FilteredTagStore.filter = filter;
        FilteredTagStore.completelyLoaded = false;
    },

    resetFilter: function() {
        FilteredTagStore.filter = FilteredTagStore.defaultFilter;
        FilteredTagStore.completelyLoaded = false;
    },

    // Allow filter to be reset by copying over the default.
    defaultFilter: tag => tag.hidden !== true,

    // Get all that pass filter.
    getAll: function() {
        // Restore the map structure since filter returns array.
        const result  = _(_tags)
            .filter(this.filter)
            .keyBy('tag_id')
            .value();
        return result;
    },
    count: function() {
        return _.values(this.getAll()).length;
    },
};

const _videos = {};
export const VideoStore = {
    getAll: () => {
        return _videos;
    },
    get: id => {
        return _videos[id];
    },
    set: map => {
        Object.assign(_videos, map);
    }
};

const _thumbnails = genderAgeBaseMap();
export const ThumbnailStore = {
    getAll: () => {
        return _thumbnails;
    },
    get: (gender, age, id) => {
        return _thumbnails[gender][age][id];
    },
    set: (gender, age, map) => {
        Object.assign(_thumbnails[gender][age], map);
    }
};

const _lifts = genderAgeBaseMap();
export const LiftStore = {
    getAll: () => {
        return _lifts;
    },
    get: (gender, age, id) => {
        return _lifts[gender][age][id];
    },
    set: (gender, age, map) => {
        Object.assign(_lifts[gender][age], map);
    }
};

const _features = {};
export const FeatureStore = {
    getAll: () => {
        return _features;
    },
    get: id => {
        return _features[id];
    },
    set: map => {
        Object.assign(_features, map);
    }
};

const _thumbnailFeatures = genderAgeBaseMap();
export const ThumbnailFeatureStore = {
    getAll: () => {
        return _thumbnailFeatures;
    },
    get: (gender, age, id) => {
        return _thumbnailFeatures[gender][age][id];
    },
    set: (gender, age, map) => {
        Object.assign(_thumbnailFeatures[gender][age], map);
    }
};

const _tagShares = {};
export const TagShareStore = {
    getAll: () => {
        return _tagShares;
    },
    get: id => {
        return _tagShares[id];
    },
    set: map => {
        Object.assign(_tagShares, map);
    },
    has: id => {
        return undefined !== _tagShares[id];
    }
};

export const LoadActions = Object.assign({}, AjaxMixin, {

    // Given the result from a tag search API call,
    // load all downstream stores without checking
    // they're already loaded.
    loadFromSearchResult: searchRes => {
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
        const updateThumbnailMap = {};

        // Build tags promise.
        const missingTagIds =  _
            .chain(searchRes.items)
            .reduce((tagIds, tag) => {
                tagIds.push(tag.tag_id);
                return tagIds;
            }, [])
            // Omit all the stored ones.
            .difference(_.keys(TagStore.getAll()))
            .uniq()
            .value();
        let tagPromise = Promise.resolve({});
        if (missingTagIds.length > 0) {
            const tagData = {
                tag_id: missingTagIds.join(',')
            };
            tagPromise = LoadActions.GET('tags', {data: tagData});
        }

        // Build promise for videos referenced from tags.
        let videoPromise = Promise.resolve({videos: []})
        const missingVideoIds = _
            .chain(searchRes.items)
            .reduce((videoIds, tag) => {
                if(tag.video_id) {
                    videoIds.push(tag.video_id);
                }
                return videoIds;
            }, [])
            // Omit all the stored ones.
            .difference(_.keys(VideoStore.getAll()))
            .uniq()
            .value();
        if (missingVideoIds.length > 0) {
            const videoData = {
                video_id: missingVideoIds.join(','),
                fields: UTILS.VIDEO_FIELDS.join(',')
            };
            videoPromise = LoadActions.GET('videos', {data: videoData});
        }

        Promise.all([tagPromise, videoPromise])
        .then(combined => {

            // Unpack promises.
            const tagRes = combined[0] || {};
            const videoRes = combined[1] || {videos: []};

            // Set each by map of id to resource.
            Object.assign(updateTagMap, tagRes);
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
                    dem.bad_thumbnails.map(t => {
                        thumbnailMap[t.thumbnail_id] = t;
                    });

                    Object.assign(updateThumbnailMap, thumbnailMap);
                });
            });

            // Now load the thumbnails for the non-video tags.

            // Get the set of thumbnail ids.
            const tags = _.values(tagRes);
            const thumbnailIdSet = _
                .chain(tags)
                // Skip video tags.
                .filter(tag => {
                    return tag.tag_Type !== UTILS.TAG_TYPE_VIDEO_COL;
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
                TagStore.set(updateTagMap);
                VideoStore.set(updateVideoMap);
                ThumbnailStore.set(gender, age, thumbnailMap);

                // This is the first point at which we can display
                // a meaningful set of results, so dispatch.
                Dispatcher.dispatch();
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
                LiftStore.set(gender, age, tagLiftMap);
                Dispatcher.dispatch();
            });
        });
    },

    loadVideos(videoIds) {
        if(0 == videoIds.length) {
            return;
        }
        const updateThumbnailMap = {};
        const videoIdSet = _.uniq(videoIds);
        const videoData = {
                video_id: videoIdSet.join(','),
                fields: UTILS.VIDEO_FIELDS.join(',')
            };
        LoadActions.GET('videos', {data: videoData})
        .then(videoRes => {

            // Set each by map of id to resource.
            VideoStore.set(videoRes.videos.reduce((map, video) => {
                map[video.video_id] = video;
                return map;
            }, {}));

            // Build update map.
            const thumbnailMap = {};
            const tagIds = [];
            // Store the video thumbnails since they're inline in response.
            videoRes.videos.map(video => {

                if (video.state === UTILS.VIDEO_STATE_ENUM.processing) {
                    return;
                }

                // For each demo, store its thumbnails by demo keys.
                video.demographic_thumbnails.map(dem => {

                    const gender = UTILS.FILTER_GENDER_COL_ENUM[dem.gender];
                    const age = UTILS.FILTER_AGE_COL_ENUM[dem.age];
                    if (age === undefined || gender === undefined) {
                        console.warn('Unknown demo ', dem.age, dem.gender);
                        return;
                    }
                    dem.thumbnails.map(t => {
                        thumbnailMap[t.thumbnail_id] = t;
                    });
                    dem.bad_thumbnails.map(t => {
                        thumbnailMap[t.thumbnail_id] = t;
                    });

                    tagIds.push(video.tag_id);
                    ThumbnailStore.set(gender, age, thumbnailMap);
                });
            });
            Dispatcher.dispatch();

            // For video, use default demographics for store.
            const gender = 0;
            const age = 0;
            LoadActions.loadLifts(tagIds, gender, age)
            .then(liftRes => {
                // Map of tag id to lift map.
                const tagLiftMap = liftRes;
                LiftStore.set(gender, age, tagLiftMap);
                Dispatcher.dispatch();
            });
        });

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

    // Load lifts for thumbnails from data source.
    loadLifts: function(tagIds, gender=0, age=0, forceLoad=false) {

        // Find tags missing from stored lift map for demo.
        const loadTagIds = forceLoad ?
            tagIds :
            tagIds.reduce((loadTagIds, tagId) => {
            if (LiftStore.get(gender, age, tagId) === undefined) {
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
            const tag = TagStore.get(tagId);

            const thumbnailMap = _.pick(
                ThumbnailStore.getAll()[gender][age],
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
                const video = VideoStore.get(tag.video_id);
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
        const tag = TagStore.get(tagId);
        if (tag.tag_type === UTILS.TAG_TYPE_VIDEO_COL) {
            // These are already loaded!
        } else {
            tag.thumbnail_ids.map(tid => {
                if (undefined === ThumbnailStore.get(gender, age, tid)) {
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
            ThumbnailStore.set(gender, age, newThumbnailMap);
            return LoadActions.loadLifts([tagId], gender, age);
        })
        .then(liftRes => {
            const tagLiftMap = liftRes;
            // Set, dispatch and callback.
            LiftStore.set(gender, age, tagLiftMap);
            Dispatcher.dispatch();
            callback();
        })
    },

    // Load Feature objects for the thumbnails for the given tag
    // for the given demographic.
    loadFeaturesForTag(tagId, gender, age) {

        // Get missing thumbnail ids.
        const tag = TagStore.get(tagId);
        const thumbnailIds = _(ThumbnailStore.getAll()[gender][age])
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
            const valueMin = UTILS.VALENCE_THRESHOLD;
            const ignoreIds = UTILS.VALENCE_IGNORE_INDEXES;
            const numToKeep = UTILS.VALENCE_NUM_TO_KEEP;

            // Keep a set of all the feature ids in the response.
            let featureIdSet = [];

            const newThumbnailFeatureMap = {};

            thumbRes.thumbnails.map(t => {
                const featureIdValues = t.feature_ids.reduce((array, idValue) => {
                    let featureId = idValue[0];
                    let featureValue = idValue[1];
                    if (ignoreIds.indexOf(parseInt(featureId.split('_')[1])) === -1) {
                        if (featureValue > valueMin) {
                            array.push(idValue);
                        }
                    }

                    return array;
                }, []);

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

    loadTags(tagIds) {

        // Short circuit empty input.
        if(tagIds.length == 0) {
            return;
        }

        // Search uses null (0) demographics.
        const gender = 0;
        const age = 0;

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
                        dem.bad_thumbnails.map(t => {
                            thumbnailMap[t.thumbnail_id] = t;
                        });

                        Object.assign(updateThumbnailMap, thumbnailMap);
                        ThumbnailStore.set(gender, age, thumbnailMap);
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
                    TagStore.set(updateTagMap);
                    VideoStore.set(updateVideoMap);
                    ThumbnailStore.set(gender, age, thumbnailMap);

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
                    LiftStore.set(gender, age, tagLiftMap);
                    Dispatcher.dispatch();
                });
            });
        });
    },

    // Tries to fill out the TagStore to n tags
    //
    // Return n the number of new tags.
    loadNNewestTags(n, query, ...callbacks) {
        const self = this;
        const haveCount = FilteredTagStore.count();

        // Short circuit search if we have enough items or everything.
        if (n <= haveCount) {
            return;
        }
        if (TagStore.completelyLoaded) {
            return;
        } else if (query && FilteredTagStore.completelyLoaded) {
            return;
        }

        const limit = n - haveCount;

        const options = {
            data: {limit}
        };
        // Find the oldest timestamp.
        const oldestTimestamp = TagStore.getOldestTimestamp();

        if (oldestTimestamp) {
            // Get float of unix time in seconds
            // (Already in UTC)
            options.data.until = oldestTimestamp;
        }

        if (query) {
            options.data.query = query;
        }

        self.GET('tags/search', options)
        .then(searchRes => {
            // Mark this store as completely loaded.
            if(searchRes.items.length < limit) {
                if(query) {
                    TagStore.completelyLoaded = true;
                } else {
                    FilteredTagStore.completelyLoaded = true;
                }
            }
            return LoadActions.loadFromSearchResult(searchRes)
        })
        .then(() => {
            callbacks.map(callback => {
                if (_.isFunction(callback)) {
                    callback();
                }
            });
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
    }
});

export const DeleteActions = Object.assign({}, AjaxMixin, {

    deleteCollectionByTagId: function(tagId) {
        const tag = TagStore.get(tagId);
        DeleteActions.PUT('tags', {data: {tag_id: tagId, hidden: true}})
            .then(res => {
                tag.hidden = true;
                TagStore.set({[res.tag_id]: tag});
                Dispatcher.dispatch();
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
    }
};

// Search intercepts requests to the tag store
// so that we can known if there is another page
// to display after current, and to preload
// that page for responsiveness.
export const Search = {

    pending: 0,

    getLargeCount(count) {
        return count + UTILS.RESULTS_PAGE_SIZE + 1;
    },

    load(count, onlyThisMany=false, callback) {
        // Aggressively load tags unless caller specifies only this many.
        const largeCount = onlyThisMany? count: Search.getLargeCount(count);
        Search.pending += 1;
        LoadActions.loadNNewestTags(largeCount, null, Search.decrementPending, callback);
    },

    loadWithQuery(count, query, callback) {
        const largeCount = this.getLargeCount();
        Search.pending += 1;
        LoadActions.loadNNewestTags(largeCount, query, Search.decrementPending, callback);
    },

    hasMoreThan(count) {
        return FilteredTagStore.count() > count;
    },

    decrementPending() {
        Search.pending -= 1;
    }
};
