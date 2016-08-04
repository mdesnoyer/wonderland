// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import React from 'react';
import ReactDOM from 'react-dom'; 

import AjaxMixin from '../../mixins/Ajax';

import UTILS from '../../modules/utils';
import SESSION from '../../modules/session';
import { objectToGetParams } from '../../modules/sharing';

import CollectionsContainer from '../knave/CollectionsContainer';
import SiteHeader from '../wonderland/SiteHeader';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var CollectionsMainPage = React.createClass({
    mixins: [AjaxMixin],
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {
            collections: null
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
        var self = this; 
        if (self.state.collections) {
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
        
    },
    updateField: function(field, value) {
        var self = this;
        this.setState({
            [field]: value
        });
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
        alert('vidoes!')
    },
    postImages: function() {
        alert('images!')
    },
    getCollections: function(paging) {
        var self = this,
            options = {data: { limit: UTILS.RESULTS_PAGE_SIZE , tag_type: 'col' }}
        // paging = paging ? paging.split('?')[1] : ''
        // grab the keys of the first 5 collections
        //refresh the token first ? 
        self.GET('tags/search?', options)
            .then(function(res) {
                //set next page to the state
                self.setState({ 
                    nextPage: res.next_page,
                    collections: res.items,
                    thumbnails: []
                });
                //create a request array for the batch for tags
                var requestTag = {
                    data: {
                        call_info: {
                            refresh_token: SESSION.state.refreshToken,
                            access_token: SESSION.state.accessToken,
                            requests: self.createRequests(res, 'tags', 'GET')
                        }
                    },
                    noAccountId: true
                }
                self.POST('batch', requestTag)
                    .then(function(res) {
                        var thumbnailsResponse = []
                        //create a request array fro the batch of thumbnails
                        for (var i = 0; i < res.results.length; i++) {
                            var response = res.results[i].response
                            for (var key in response) {
                                thumbnailsResponse.push(response[key])
                            }
                        }
                            self.state.collections.forEach(function(collection){
                            var thisThing = thumbnailsResponse.find( x =>( x.tag_id === collection.key))
                                collection.thumbnails = thisThing.thumbnails
                        })
                        var thumbnailsArray = [];
                        thumbnailsResponse.forEach(function(thumbnail){
                            thumbnailsArray = thumbnailsArray.concat(thumbnail.thumbnails)
                        })

                        // self.setState({thumbnails: self.state.thumbnails.concat(thumbnailsArray)})
                        const batches = [];
                        const batchSize = 100;
                        for(let index = 0; index < thumbnailsArray.length; index += batchSize) {
                            batches.push(thumbnailsArray.slice(index, index + batchSize).join(','));
                        }
                        var requestThumbs = {
                            data: {
                                call_info: {
                                    refresh_token: SESSION.state.refreshToken,
                                    access_token: SESSION.state.accessToken,
                                    requests: self.createRequests({thumbnails: batches}, 'thumbnails', 'GET')
                                }
                            },
                            noAccountId: true
                        }
                        self.POST('batch', requestThumbs)
                            .then(function(res) {
                                // for each element in res.results
                                var megaChunk = []
                                res.results.forEach(function(thumbChunk){
                                    thumbChunk.response.thumbnails.forEach(function(thumbnails){
                                      megaChunk = megaChunk.concat(thumbnails)
                                    })

                                })


                                console.log(res)
                                var newThumbs = []
                                thumbnailsArray.map(function(thumbnail){
                                    var thumbInfo = megaChunk.find( x =>( x.thumbnail_id === thumbnail))
                                    var thumbObject = {}
                                    thumbObject[thumbnail] = thumbInfo
                                    newThumbs.push(thumbObject)
                                    // debugger 
                                })
                                self.setState({thumbnails: newThumbs});
                                debugger
                            })
                            .catch(function(err) {
                                console.log(res)
                                //debugger
                            })
                        /*
                        const options = {
                            data: {
                                thumbnail_id: thumbnailsArray.slice(0, 100).join(',')
                            }
                        }

                        self.GET('thumbnails', options)
                            .then(res => {
                                console.log(res);
                                debugger;
                            })
                            .catch(err => {
                                console.log(err);
                                debugger;
                            });
                        /**/

                    })
                    .catch(function(err){
                        debugger
                    })
            })
            .catch(function(err) {
                debugger
            })
    },

    createRequests: function(res, type, method) {
        var self = this,
        //what if account ID not set ? 
            accountId = SESSION.state.accountId,
            requests = [],
            responseArrayName,
            responsePropName,
            responseIdName
        ;
        // need to hanlde posts and their data
        switch(type) {
            case 'tags': 
                responseArrayName = 'items';
                responseIdName = 'tag_id';
                responsePropName = 'key';
                break;
            case 'thumbnails':
                responseArrayName = 'thumbnails';
                responseIdName = 'thumbnail_id';
                responsePropName = null;
                break;
            default: 
                responseArrayName = 'requests'; 
        }
        if (method === 'GET') {

            res[responseArrayName].map(function(item, i) {
                var responseParam = responsePropName === null ? item : item[responsePropName]
                requests.push({
                    method: method,
                    relative_url: '/api/v2/' + accountId + '/' + type + '/?' + responseIdName + '=' + responseParam
                })
            })            
        }
        else {
            res[responseArrayName].map(function(item) {
                requests.push({
                    body: { [responseIdName]: item[responsePropName]},
                    method: method,
                    relative_url: '/api/v2/' + accountId + '/' + type + '/'
                })
            })  
        }

        return requests
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default CollectionsMainPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// updateCollectionVideo: function(videoId) {
//     var self = this,
//         options = {
//             data: {
//                 fields: ['state', 'estimated_time_remaining', 'duration'],
//                 video_id: videoId
//             }
//         }
//     ; 
//     self.GET('videos/', options)
//         .then(function(res){
//             self.setState({
//                 nextPage: res.next_page,
//                 collections: res.videos.concat(self.state.collections)
//             })  
//         }) 
//         .catch(function(err){
//             debugger
//         })
// },
// debugger
// if (!self.state.collections && !self.state.nextPage) {
//     self.setState({
//         nextPage: res.next_page,
//         collections: res.videos
//     })                    
// }
// else {
//     self.setState({
//         nextPage: res.next_page,
//         collections: self.state.collections.concat(res.videos)
//     })  
// }

        // In Ice Box       
        // self.GET('tags/search')
        //  .then(function(res) {
        //      debugger
        //  })
        //  .catch(function(err){
        //      debugger
        //  })
        // var self = this,
        //     options = {
        //         data: {
        //             fields: UTILS.VIDEO_FIELDS,
        //             limit: UTILS.RESULTS_PAGE_SIZE
        //         }
        //     }
        // ;
        // postVideo: function(url) {
        //     var self = this,
        //         videoId = UTILS.generateId(),
        //         options = {
        //             data: {
        //                 external_video_ref: videoId,
        //                 url: UTILS.properEncodeURI(UTILS.dropboxUrlFilter(url))
        //             }
        //         }
        //     ;
        //         self.POST('videos', options)
        //             .then(function(json) {
        //                 debugger 
        //                 self.updateCollectionVideo(json.video.video_id)
        //             })
        //             .catch(function(err) {
        //                 debugger
        //             });
        // },
        // getAccountLimits: function(callback) {
        //     var self = this;
        //     self.GET('limits')
        //         .then(function(res) {
        //             //keep next page link + limit
        //             // {max_video_size: 900, max_video_posts: 25, refresh_time_video_posts: "2016-08-02 22:34:01.854838", video_posts: 0}
        //             callback()
        //         })
        //         .catch(function(err) {
        //             // if there is an erro we should we 
        //             //more than likely need to sign in
        //         });
        // },

