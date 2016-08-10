// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

import UTILS from '../../modules/utils';
import T from '../../modules/translation';
import TRACKING from '../../modules/tracking';

import reqwest from 'reqwest';
import SESSION from '../../modules/session';

import Account from '../../mixins/Account';
import AjaxMixin from '../../mixins/Ajax';

import VideoUploadOverlay from './VideoUploadOverlay';
import ImageUploadOverlay from './ImageUploadOverlay';
import OverLayMessage from './OverLayMessage'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import cookie from 'react-cookie';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var UploadForm = React.createClass({
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
            isOpen: false,
            error: null,
            isOpenMessage: false,
            isPhotoOpen: false, 
            isVideoOpen: false,
            photoUploadCount: 0
        };
    },
    toggleOpen: function(e) {
        var self = this;
        e.preventDefault();
        // debugger
        // if 
        // e.target.dataset.generateTab === "true" && self.
        if (!self.props.isOnboarding || !self.state.isOpen) {
            self.setState({
                isOpen: !self.state.isOpen,
                isOpenMessage: false,
                isOpenPhoto: false, 
                isOpenVideo: false,
                error: null
            });            
        }
    },
    handleUpload: function(url) {
        var self = this;
        self.setState({
            isOpen: false,
            error: false,
            isOpenMessage: false,
            isOpenPhoto: false,
            isOpenVideo: false
        }, function() {
            self.sendVideoUrl(url)
        });
    },
    handleOpenPhoto: function(e) {
        e.preventDefault();
        this.setState({ isOpenPhoto: true });
    },
    handleOpenVideo: function(e) {
        e.preventDefault();
        this.setState({ isOpenVideo: true });
    },
    handleBgCloseClick: function(e) {
        if (this._overlay !== e.target && this._overlay.children[0] !== e.target && this._overlay.contains(e.target)) {
            return;
        }
        if (!this.props.isOnboarding) {
            this.setState({
                isOpen: false,
                isOpenPhoto: false,
                isOpenVideo: false,
            });
        }
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
        if (!UTILS.validateUrl(url)) {
            self.setState({
                isOpen: true,
                error: T.get('copy.urlShortener.messageBody')
            });
        }
        else {
            self.POST('videos', options)
                .then(function(json) {
                    // if the a video is uploaded past the first page(greate than 1)
                    if (self.props.currentPage > 1) {
                        //we use the newsearch function in videos to adjust the page 
                        // 1 minus by the current page 
                        self.props.handleNewSearch('?', 1 - self.props.currentPage)
                    }
                    else if (self.props.postHookAnalysis) {
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
                    self.throwUploadError(err)
                });    
        }
        TRACKING.sendEvent(self, arguments, self.props.isOnboarding);
    },
    throwUploadError: function(err) {
        var self = this;
        switch(err.code) {
            case 401:
                self.context.router.replace(UTILS.DRY_NAV.SIGNIN.URL);
                break;
            case 402:
                self.setState({
                    isOpenMessage: true,
                });
                break;
            default:
                self.setState({
                    isOpen: true,
                    error: T.get('copy.onboarding.uploadErrorText')
                });
        }
    },
    render: function() {
        const { isOnboarding } = this.props;
        var self = this,
            className = ['xxUpload']
        ;
        if (self.state.isOpen) {
            className.push('is-open');
        };
        if (self.state.isOpenPhoto || self.state.isOpenVideo) {
            className.push('has-dialog');
        };
        return (
            <div className={className.join(' ')}>
                    <OverLayMessage 
                        message={T.get('error.unpaidAccountLimit')}
                        messageFunction={self.props.openSignUp}
                        isOpenMessage={self.state.isOpenMessage}
                        type="limit"
                    />
                <a
                    className="xxUploadButton"
                    title={T.get('action.analyze')}
                    onClick={self.toggleOpen}
                >{T.get('action.analyze')}</a>
                <ReactCSSTransitionGroup transitionName="xxFadeInOutFast" transitionEnterTimeout={200} transitionLeaveTimeout={200}>
                    {
                        self.state.isOpen ? (
                            
                            <div className="xxOverlay" 
                                ref={overlay => self._overlay = overlay}
                                onClick={self.handleBgCloseClick}
                                key="upload-overlay"
                            >
                                <ReactCSSTransitionGroup transitionName="xxFadeInOutFast" transitionEnterTimeout={200} transitionLeaveTimeout={200}>
                                {
                                    !self.state.isOpenPhoto && !self.state.isOpenVideo ? (
                                    <div className="xxUploadTypes" key="upload-types">
                                        <a
                                            href=""
                                            className="xxUploadTypes-button xxUploadTypes-button--photo"
                                            onClick={self.handleOpenPhoto}
                                        ><span className="xxUploadTypes-buttonLabel">Photo</span></a>

                                        <a
                                            href=""
                                            className="xxUploadTypes-button xxUploadTypes-button--video"
                                            onClick={self.handleOpenVideo}
                                        ><span className="xxUploadTypes-buttonLabel">Video</span></a>
                                    </div>
                                    ) : null 
                                }
                                {
                                    self.state.isOpenPhoto ? (
                                         <ImageUploadOverlay
                                            isOnboarding={isOnboarding}
                                            error={self.state.error || null}
                                            key="upload-photo"
                                            formatData={self.formatData}
                                            grabDropBox={self.grabDropBox}
                                            sendLocalPhotos={self.sendLocalPhotos}
                                            sendFormattedData={self.sendFormattedData}
                                            toggleOpen={self.toggleOpen}
                                        />

                                    ) :  null 
                                }
                                {
                                    self.state.isOpenVideo ? (
                                         <VideoUploadOverlay
                                            handleUpload={self.handleUpload}
                                            isOnboarding={isOnboarding}
                                            error={self.state.error || null}
                                            key="upload-video"
                                        />

                                    ) :  null 
                                }
                                </ReactCSSTransitionGroup>
                            </div>
                        ) : null
                    }
                </ReactCSSTransitionGroup>
            </div>
        );
    },
     sendLocalPhotos: function(e) {
         var self = this, 
             files = e.target.files,
             fileArray = []
         ;
         for (var i = 0, file; file = files[i]; i++) {
             fileArray.push(file);
         }
         self.formatData(fileArray);
     },
     formatData: function(files) {
        var self = this,
            formData = new FormData()
        ;
        files.forEach((file)=> {
            formData.append('upload', file)
        }); 
        self.sendFormattedData(formData);
    },
    sendFormattedData: function(formData) {
        var self = this,
             url = CONFIG.API_HOST + SESSION.state.accountId + '/thumbnails/'
         ;
         reqwest({
              url: url,
              headers:{'Authorization': 'Bearer ' + SESSION.state.accessToken},
              method: 'POST',
              contentType: 'multipart/form-data',
              crossOrigin: true,
              processData : false,
              data : formData
            })
            .then(res => {
                console.log(res);
                // if account refresh token expired refresh token and they reset session
                debugger
            }).catch(err => {
                self.throwUploadError(err);
                console.log(err);
                debugger
            });
     },
     sendDropBoxUrl: function(urls) {
        var self = this,
            dropBoxUrlsArray = urls.map(function(a) {return a.link;}).join(","),
            options = {
                data: {
                    url: dropBoxUrlsArray
                }
            }
        ;
        debugger
        self.POST('thumbnails', options)
            .then(function(res) {
                console.log(res);
            })
            .catch(function(err) {
                debugger
                self.throwUploadError(err);
            });
    },
    grabDropBox: function() {
        var self = this,
            options
        ; 
        options = {
            success: function(urls) {self.sendDropBoxUrl(urls)},
            linkType: "direct",
            multiselect: true,
            extensions: ['.jpeg', '.jpg', '.png', '.gif', '.bmp']
        };
        Dropbox.choose(options);
    },
    grabRefreshToken: function(refreshToken) {
        var self = this; 
        reqwest({
            url: CONFIG.AUTH_HOST + 'refresh_token',
            data: JSON.stringify({
                token : SESSION.state.refreshToken
            }),
            contentType: 'application/json',
            method: 'POST',
            crossDomain: true,
            type: 'json'
        })
            .then(function (res) {
                SESSION.set(res.access_token, res.refresh_token, res.account_ids[0]);
            })
            .catch(function (err) {
                SESSION.end();
            });
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default UploadForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -





// sendFormattedData: function(formData) {
//            var self = this;
//            debugger
//            self.POST('thumbnails', {
//                contentType: 'multipart/form-data',
//                data: formData
//            })
//                .then(function (res) {
//                     debugger

//                    // console.log(res);
//                    // self.setState({
//                    //     mode:'success'
//                    // }, setTimeout( 
//                    //     self.setState({
//                    //         mode:'silent'
//                    //     }), 30)
//                    // )
//                })
//                .catch(function (err) {
//                    self.throwUploadError(err);
//                });
//  },
