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
                    <CollectionsContainer collections={self.state.collections}/>
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
                self.setState({ nextPage: res.next_page});
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
                debugger
                self.POST('batch', requestTag)
                    .then(function(res) {
                        debugger
                        //create a request array fro the batch of thumbnails
                        var requestThumbs = self.createRequests(res, 'tag', 'POST')
                        self.POST('batch', requestThumbs)
                            .then(function(res) {
                                // grab response and then set it to state

                                self.setState({
                                    collections: res.results
                                })
                            })
                            .catch(function(err) {
                            })
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
                responseArrayName = 'requests';
                responseIdName = 'tag_id';
                break;
            default: 
                responseArrayName = 'requests'; 
        }
        if (method === 'GET') {
            res[responseArrayName].map(function(item) {
                requests.push({
                    method: method,
                    relative_url: '/api/v2/' + accountId + '/' + type + '/?' + responseIdName + '=' + item[responsePropName]
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
