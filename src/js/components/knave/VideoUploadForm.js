// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import AjaxMixin from '../../mixins/Ajax';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';
import Account from '../../mixins/Account';
import cookie from 'react-cookie';
import VideoUploadOverlay from './VideoUploadOverlay';
import DropDown from './DropDown';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideoUploadForm = React.createClass({
    mixins: [AjaxMixin, Account],
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getDefaultProps: function() {
        return {
            isOnboarding: false,
            videoCountServed: 0
        }
    },
    getInitialState: function() {
        var self = this;
        return {
            isOpen: false
        };
    },
    toggleOpen: function(e) {
        var self = this;
        e.preventDefault();
        self.setState({
            isOpen: !self.state.isOpen
        });
    },
    handleUpload: function(url) {
        var self = this;
        self.setState({
            isOpen: false
        }, function() {
            self.sendVideoUrl(url)
        });
    },
    sendVideoUrl: function(url) {
        var self = this,
            videoId = UTILS.generateId(),
            options = {
                data: {
                    external_video_ref: videoId,
                    url: UTILS.properEncodeURI(UTILS.dropboxUrlFilter(url)),
                }
            }
        ;
        self.POST('videos', options)
            .then(function(json) {
                if (self.props.postHookAnalysis) {
                    self.props.postHookAnalysis(json);
                }
                else {
                    if (self.props.postHookSearch) {
                        self.props.postHookSearch();
                    }
                    else {
                        self.context.router.push('/video/' + videoId + '/');
                    }
                }
            })
            .catch(function(err) {
                console.log(err)
            });
    },
    render: function() {
        const { isOnboarding } = this.props;
        var self = this,
            className = ['xxUpload']
        ;
        if (self.state.isOpen) {
            className.push('is-open');
        } 
        if (self.props.isMaxLimit) {
            className.push('is-hidden')
        }
        return (
            <div className={className.join(' ')}>
            <a
                className="xxUploadButton"
                title={T.get('action.analyze')}
                onClick={self.toggleOpen}
            >{T.get('action.analyze')}</a>
            {
                self.state.isOpen ? (
                    <div className="xxOverlay" >
                        <VideoUploadOverlay
                            handleUpload={self.handleUpload}
                            isOnboarding={isOnboarding}
                        />
                    </div>
                ) : null
            }
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideoUploadForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
