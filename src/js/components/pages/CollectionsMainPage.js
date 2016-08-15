// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import AjaxMixin from '../../mixins/Ajax';

import UTILS from '../../modules/utils';
import SESSION from '../../modules/session';
import { objectToGetParams } from '../../modules/sharing';

import SiteHeader from '../wonderland/SiteHeader';
import TagStore from '../../stores/TagStore';
import TagActions from '../../actions/TagActions';
import AltContainer from 'alt-container';

//import CollectionsContainer  from '../CollectionsContainer';
import ImageCollection from '../ImageCollection';
import VideoCollection from '../VideoCollection';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const CollectionsMainPage = React.createClass({
    mixins: [AjaxMixin],
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return TagStore.getState();
        /*
        return {
            // State of search paging--current page, page count, next page url, etc.
            search: {
                next: null,
                prev: null
            },
            tags: TagStore.getState()
        }
        /**/
    },
    componentWillMount: function() {
        if (!SESSION.active()) {
            this.context.router.push(UTILS.DRY_NAV.SIGNIN.URL)
        } else {
            //this.getCollections()
        }
    },
    componentDidMount: function() {
        TagStore.listen(this.onChange);
        TagActions.fetchTags();
    },
    componentWillUnmount: function() {
        TagStore.unlisten(this.onChange);
    },
    onChange: function(state) {
        this.setState(state);
    },

    render: function() {
        if (this.state.errorMessage) {
            return (<div>{this.props.errorMessage}</div>);
        }
        if (!this.state.tags.tags) {
            return (<div>Loading</div>);
        }
        return (
            <AltContainer stores={{tags: TagStore}}>
                <CollectionsSearchResult />
            </AltContainer>
        );
    },

  //      return (<CollectionsContainer />);
        /*
        const self = this;
        const collections = _.values(this.state.collections).map(collection => {
            return this.constructComponent(collection, self._additional(collection));
        });
        return (<div>{collections}</div>);
        /**/
    // Given a collection, get additional info needed for render,
    // or return an empty object.
    /*
    _additional: function(collection) {
        return (collection.tag_type === UTILS.TAG_TYPE_VIDEO_COL)?
            this.state.videos[collection.video_id]:
            {};
    },
    /**/
    // Given a collection and an optional object, construct
    // valid Collection component instance and return it
    //
    // else return an error component.
    updateField: function(field, value) {
        this.setState({ [field]: value });
    },
    handleSeeMoreClick: function() {
        //self.getCollections(self.state.nextPage)
    },
    handleSubmit: function(e) {
        var self = this;
        e.preventDefault();
        e.target.dataset.type === 'video' && self.postVideo(self.state.videoUrl);
        e.target.dataset.type === 'image' && self.postImages(self.state.imageUrl);
    },
    postVideo: function(url) {
        alert('vidoes!');
    },
    postImages: function() {
        alert('images!');
    },
    getCollections: function(paging) {
        /*
        const self = this,
            options = {
                data: {
                    limit: UTILS.RESULTS_PAGE_SIZE}}
        ;
        paging = paging ? paging.split('?')[1] : ''

        const _stateUpdate = self.getInitialState();

        // Search for tag ids, get tags and videos, then get thumbnails for those.
        self.GET('tags/search?' + paging, options)
        .then(searchRes => {

            //set next page to the state
            _stateUpdate.search.next = searchRes.next_page;
            _stateUpdate.search.prev = searchRes.prev_page;

            // Search for all the tags.
            const _tagData = {
                tag_id: searchRes.items.reduce((tag_ids, tag) => {
                    tag_ids.push(tag.tag_id);
                    return tag_ids;
                }, []).join(',')
            };
            const tagsPromise = self.GET('tags', {data: _tagData});

            // Additionally search on videos in the result.
            const _videoData = {
                video_id: searchRes.items.reduce((video_ids, tag) => {
                    if(tag.video_id) {
                        video_ids.push(tag.video_id);
                    }
                    return video_ids;
                }, []).join(','),

                fields: UTILS.VIDEO_FIELDS.join(',')
            };
            const videosPromise = _videoData.video_id?
                self.GET('videos', {data: _videoData}):
                null;

            return Promise.all([tagsPromise, videosPromise]);
        })
        .then(combined => {

            // Unpack promises.
            let tagsRes,
                videosRes;
            tagsRes = combined[0];
            videosRes = combined[1];

            // Store the map of collections, videos.
            _stateUpdate.collections = tagsRes;
            _stateUpdate.videos = videosRes;

            // Get and concatenate all thumbnail ids.
            const tags = UTILS.valuesFromMap(tagsRes);
            const thumbIds = tags.reduce((array, tag) => {
                array = array.concat(tag.thumbnail_ids);
                return array;
            }, []);
            // Create array of CSVs of max length.
            const thumbArgs = UTILS.csvFromArray(thumbIds, UTILS.MAX_CSV_VALUE_COUNT);

            // Batch only large requests since batch is slow.
            if (thumbArgs.length > 1) {
                thumbArgs.map(arg => {
                    self.batch('GET', 'thumbnails', {thumbnail_id: arg});
                });
                return self.sendBatch();
            } else {
                return self.GET('thumbnails', {data: {thumbnail_id: thumbArgs[0]}});
            }
        })
        .then(thumbsRes => {

            thumbsRes.thumbnails.map(t => {
                _stateUpdate.thumbnails[t.thumbnail_id] = t;
            });

            // Finally, update state.
            self.setState(_stateUpdate);
        })
        .catch(err => {
            // Log the stack trace.
            console.error(err);
            throw err;
        });
        /**/

    }
});

const CollectionsSearchResult = React.createClass({

    makeCollection(tag) {
        switch(tag.tag_type) {
        case UTILS.TAG_TYPE_VIDEO_COL:
            return <VideoCollection />;
        case UTILS.TAG_TYPE_IMAGE_COL:
            return <ImageCollection />;
        }
        return <ImageCollection />;
    },

    /*
    constructComponent: function(collection, additional) {
        switch(collection.tag_type) {
        case 'col':
            return (
                <ImageCollection
                    key={collection.tag_id}
                    thumbnails={this.state.thumbnails}
                    {...collection}
                    {...additional}
                />
            );
        case 'video':
            return (
                <VideoCollection
                    key={collection.tag_id}
                    thumbnails={this.state.thumbnails}
                    {...collection}
                    {...additional}
                />
           );
        }
        return <ErrorCollection/>
    },
                {
                    _.map(this.props.tags, function(tag) {
                        return this.makeCollection(tag).render();
                    });
                }
    /**/

    /*
    render: function() {
        var self = this;
        return (
            <ul>
                {_.map(self.props.tags, function(tag) {
                    return self.makeCollection(tag).render();
                })}
            </ul>
        );
    }
    /**/
    render: function() {
        return (
            <ul>
                {_.map(this.props.tags.tags, function(tag) {
                    return (<li>{tag.name}</li>);
                })}
            </ul>
        );
    }
});
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default CollectionsMainPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
