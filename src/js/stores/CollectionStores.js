'use strict';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import _ from 'lodash';

import AjaxMixin from '../mixins/Ajax';
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
    }
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

        // Build tags promise.
        const tagData = {
            tag_id: _.uniq(searchRes.items.reduce((tagIds, tag) => {
                tagIds.push(tag.tag_id);
                return tagIds;
            }, [])).join(',')
        };
        const tagPromise = LoadActions.GET('tags', {data: tagData});

        // Build promise for videos referenced from tags.
        const videoData = {
            video_id: _.uniq(searchRes.items.reduce((video_ids, tag) => {
                if(tag.video_id) {
                    video_ids.push(tag.video_id);
                }
                return video_ids;
            }, [])).join(','),
            fields: UTILS.VIDEO_FIELDS.join(',')
        };
        const videoPromise = videoData.video_id?
            LoadActions.GET('videos', {data: videoData}):
            null;

        Promise.all([tagPromise, videoPromise])
        .then(combined => {

            // Unpack promises.
            const tagRes = combined[0] || {};
            const videoRes = combined[1] || {videos: []};

            // Set each by map of id to resource.
            TagStore.set(tagRes);
            VideoStore.set(videoRes.videos.reduce((map, video) => {
                map[video.video_id] = video;
                return map;
            }, {}));

            // Store the video thumbnails since they're inline in response.
            videoRes.videos.map(video => {

                // For each demo, store its thumbnails by demo keys.
                video.demographic_thumbnails.map(dem => {

                    let gender = UTILS.FILTER_GENDER_COL_ENUM[dem.gender];
                    let age = UTILS.FILTER_AGE_COL_ENUM[dem.age];
                    if (age === undefined || gender === undefined) {
                        console.warn('Unknown demo ', dem.age, dem.gender);
                        return;
                    }

                    // Build update map.
                    const thumbnailMap = {};
                    dem.thumbnails.map(t => {
                        thumbnailMap[t.thumbnail_id] = t;
                    });
                    dem.bad_thumbnails.map(t => {
                        thumbnailMap[t.thumbnail_id] = t;
                    });

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
                const thumbMap = thumbRes.thumbnails.reduce((map, t) => {
                    map[t.thumbnail_id] = t;
                    return map;
                }, {});
                ThumbnailStore.set(gender, age, thumbMap);
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
    loadLifts: function(tagIds, gender=0, age=0) {

        // Find tags missing from stored lift map for demo.
        const missingTagIds = tagIds.reduce((missingTagIds, tagId) => {
            if (LiftStore.get(gender, age, tagId) === undefined) {
                missingTagIds.push(tagId);
            }
            return missingTagIds;
        }, []);
        // Short circuit if empty.
        if (0 == missingTagIds.length) {
            return Promise.resolve([]);
        }

        const baseParams = getBaseParamsForDemoRequest(gender, age);

        // Store map of base thumbnail id to tag id for reverse lookup
        // while processing response.
        const baseTagMap = {};

        missingTagIds.map(tagId => {

            // TODO refactor this and CollectionsContainer getLeftRight.

            // Get the worst thumbnail.
            const tag = TagStore.get(tagId);

            const thumbnailMap = _.pick(
                ThumbnailStore.getAll()[gender][age],
                tag.thumbnail_ids);
            const worst = UTILS.worstThumbnail(_.values(thumbnailMap));

            // If the type is video, its default thumbnail
            // is used instead of the worst.
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
                }, {});
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
            const newLiftMap = {};
            _.toPairs(liftRes).map(pair => {
                const tagId = pair[0];
                const liftMap = pair[1];
                newLiftMap[tagId] = liftMap;
            })

            // Set, dispatch and callback.
            LiftStore.set(gender, age, newLiftMap);
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

    loadByShareToken(accountId, resourceType, resourceId, shareToken) {
        Dispatcher.dispatch();
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
