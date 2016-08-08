// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import React from 'react';
import ReactDOM from 'react-dom';

import AjaxMixin from '../../mixins/Ajax';

import UTILS from '../../modules/utils';
import SESSION from '../../modules/session';
import { objectToGetParams } from '../../modules/sharing';

import Collections from '../knave/Collections';
import SiteHeader from '../wonderland/SiteHeader';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var CollectionsMainPage = React.createClass({
    mixins: [AjaxMixin],
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {
            collections: {},
            thumbnails: {}
        }
    },
    componentWillMount: function() {
        var self = this;
        if (!SESSION.active()) {
            self.context.router.push(UTILS.DRY_NAV.SIGNIN.URL)
        }
        else {
            // self.getAccountLimits(self.getCollections());
            self.getCollections()
        }
    },
    render: function() {
        return (
            <Collections
                collections={this.state.collections}
                thumbnails={this.state.thumbnails}
            />
        );
        /*
        var self = this;
            debugger
            return (
                <div>
                    <form>
                      Video: <input type="text" onChange={e => self.updateField('videoUrl', e.target.value)}/>
                      <input type="submit" data-type='video' onClick={self.handleSubmit} />
                    </form>
                    <form>
                      Images: <input type="text" onChange={e => self.updateField('imageUrl', e.target.value)}/>
                      <input type="submit" data-type='image' onClick={self.handleSubmit} />
                    </form>
                    <CollectionsContainer
                        collections={self.state.collections}
                        thumbnails={self.state.thumbnails}
                    />
                    <button
                        type="button"
                        onClick={self.handleSeeMoreClick}>
                        See More
                    </button>
                </div>
            )
        }
        else {
            return <p>'loading'</p>
        }
        /**/

    },
    updateField: function(field, value) {
        var self = this;
        this.setState({ [field]: value });
    },
    handleSeeMoreClick: function() {
        var self = this;
        self.getCollections(self.state.nextPage)
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
        var self = this,
            options = {data: { limit: UTILS.RESULTS_PAGE_SIZE , tag_type: 'col' }}
        ;
        paging = paging ? paging.split('?')[1] : ''

        const workingState = {};

        // grab the keys of the first 5 collections
        //refresh the token first ?
        self.GET('tags/search?' + paging, options)
            .then(function(res) {
                //set next page to the state
                self.setState({
                    nextPage: res.next_page,
                    collections: res.items
                });
                const _tagData = {
                    tag_id: res.items.reduce((tag_ids, item) => {
                        tag_ids.push(item.key);
                        return tag_ids;
                    }, []).join(',')
                };
                self.GET('tags', {data: _tagData})
                    .then(function(res) {
                        try{

                        // Store the map of collection id to object.
                        workingState.collections = res;

                        // Get and concatenate all thumbnail ids.
                        const collections = UTILS.valuesFromMap(res);
                        const thumbIds = collections.reduce((array, col) => {
                            array = array.concat(col.thumbnail_ids);
                            return array;
                        }, []);
                        const thumbArgs = UTILS.csvFromArray(thumbIds, UTILS.MAX_CSV_VALUE_COUNT);

                        // Batch requests.
                        thumbArgs.forEach((arg) => {
                            self.batch('GET', 'thumbnails', {thumbnail_id: arg});
                        });
                        self.sendBatch()
                            .then(function(res) {

                                workingState.thumbnails = {};
                                res.results.forEach(r => {
                                    r.response.thumbnails.forEach(t => {
                                        workingState.thumbnails[t.thumbnail_id] = t;
                                    });
                                });
                                self.setState(workingState);
                            })
                            .catch(function(err) {
                                console.log(err)
                            })
                       } catch(e) {
                           console.log(e)
                       }

                    })
                    .catch(function(err) {
                        console.log(err);
                    })
            })
            .catch(function(err) {
                console.log(err);
            })
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default CollectionsMainPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
