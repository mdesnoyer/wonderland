// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import React from 'react';
import ReactDOM from 'react-dom'; 

import AjaxMixin from '../../mixins/Ajax';

import UTILS from '../../modules/utils';
import SESSION from '../../modules/session';

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
            self.getAccountLimits(self.getCollections());
        }
    },
    render: function() {
        var self = this; 
        if (self.state.collections) {
            return (
                <div>
                    <SiteHeader />
                    <form>
                      Video: <input type="text" ref='videoUrl'/>
                      <input type="submit" data-type='video' onClick={self.handleSubmit} />
                    </form>
                    <form>
                      Images: <input type="text" ref='images'/>
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
    handleSeeMoreClick: function() {
        var self = this; 
        self.getCollections(self.state.nextPage)    
    },
    handleSubmit: function(e) {
        var self = this;
        e.preventDefault();
        e.target.dataset.type === 'video' && self.postVideo();
        e.target.dataset.type === 'image' && self.postImages();
    },
    postVideo: function() {
        alert('videos!')
    },
    postImages: function() {
        alert('images!')
    },
    getAccountLimits: function(callback) {
        var self = this;
        self.GET('limits')
            .then(function(res) {
                //keep next page link + limit
                // {max_video_size: 900, max_video_posts: 25, refresh_time_video_posts: "2016-08-02 22:34:01.854838", video_posts: 0}
                callback(res)
            })
            .catch(function(err) {
                // if there is an erro we should we 
                //more than likely need to sign in
            });
    },
    getCollections: function(paging) {
        var self = this,
            options = {
                data: {
                    fields: UTILS.VIDEO_FIELDS,
                    limit: UTILS.RESULTS_PAGE_SIZE
                }
            }
        debugger
        paging = paging ? paging.split('?')[1] : ''
        self.GET('videos/search?' + paging, options)
            .then(function(res) {
                if (!self.state.collections && !self.state.nextPage) {
                    self.setState({
                        nextPage: res.next_page,
                        collections: res.videos
                    })                    
                }
                else {
                    self.setState({
                        nextPage: res.next_page,
                        collections: self.state.collections.concat(res.videos)
                    })  
                }
            })
            .catch(function(err) {
                debugger
            })
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default CollectionsMainPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



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