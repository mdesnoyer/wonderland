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
import accept from 'attr-accept';
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
            photoUploadCount: 0,
            photoUploadMode: 'initial', // initial, loading, success,
            photoUploadThumbnailIds: [],
            photoCollectionName: '',
            videoUploadUrl:''
        };
    },
    toggleOpen: function(e) {
        var self = this;
        e.preventDefault();
        if (e.target.dataset.sendTag === "true") {
            self.sendCollectionTag();
        }
        else if (e.target.dataset.sendUrl === "true") {
            self.setState({
                error: null,
                isOpen: false,
                isOpenMessage: false,
                isOpenPhoto: false,
                isOpenVideo: false
            }, function() {
                self.sendVideoUrl();
            });
        }
        // if there is lingering data and user closes our modal then clean up state
        // cant use a mount because the component is always present
        else if (self.state.isOpen && 
                (self.state.photoUploadThumbnailIds.length > 0 || 
                 self.state.videoUploadUrl !== '' || 
                 self.state.photoCollectionName !== '' )) {
            self.resetStateOnSuccessOrClose();
        }
        else {
            self.setState({
                error: null,
                isOpen: !self.state.isOpen,
                isOpenMessage: false,
                isOpenPhoto: false,
                isOpenVideo: false,
            });          
        }
    },
    updateField: function(field, value) {
        var self = this;
        self.setState({ [field]: value });
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
            this.setState({
                isOpen: false,
                isOpenPhoto: false,
                isOpenVideo: false,
            });
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
                                            error={self.state.error || null}
                                            key="upload-photo"
                                            formatData={self.formatData}
                                            grabDropBox={self.grabDropBox}
                                            sendLocalPhotos={self.sendLocalPhotos}
                                            sendFormattedData={self.sendFormattedData}
                                            toggleOpen={self.toggleOpen}
                                            photoUploadMode={self.state.photoUploadMode}
                                            photoUploadCount={self.state.photoUploadCount}
                                            photoErrorCount={self.state.photoErrorCount}
                                            updateField={self.updateField}
                                            photoCollectionName={self.state.photoCollectionName}
                                            photoUploadThumbnailIds={self.state.photoUploadThumbnailIds}
                                        />

                                    ) :  null 
                                }
                                {
                                    self.state.isOpenVideo ? (
                                         <VideoUploadOverlay
                                            error={self.state.error || null}
                                            key="upload-video"
                                            toggleOpen={self.toggleOpen}
                                            updateField={self.updateField}
                                            videoUploadUrl={self.state.videoUploadUrl}
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
    throwUploadError: function(err) {
        var self = this;
        switch(err.code) {
            case 401:
                self.context.router.replace(UTILS.DRY_NAV.SIGNIN.URL);
                break;
            case 402:
                self.setState({ isOpenMessage: true });
                break;
            default:
                self.setState({
                    isOpen: true,
                    error: T.get('copy.onboarding.uploadErrorText.generic')
                });
        }
    },
    sendVideoUrl: function() {
        var self = this,
            videoId = UTILS.generateId(),
            options = {
                data: {
                    external_video_ref: videoId,
                    url: UTILS.properEncodeURI(UTILS.dropboxUrlFilter(self.state.videoUploadUrl))
                }
            }
        ;
        if (!UTILS.validateUrl(self.state.videoUploadUrl)) {
            self.setState({
                isOpen: true,
                isOpenVideo: true,
                error: T.get('copy.urlShortener.messageBody')
            });
        }
        else {
            // **********************************************************************
            // this will have to change according to the new collections set up 
            // **********************************************************************
            self.POST('videos', options)
                .then(function(json) {
                    self.resetStateOnSuccessOrClose();
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
                    self.throwUploadError(err);
                });    
        }
        TRACKING.sendEvent(self, arguments, self.props.isOnboarding);
    },
     sendLocalPhotos: function(e) {
         var self = this, 
             files = e.target.files,
             fileArray = []
         ;
         // local files come back as and object
         // server needs array in order to process
         // we use this function to create and array of files
         for (var i = 0, file; file = files[i]; i++) {
             fileArray.push(file);
         }
         self.formatData(fileArray);
     },
     formatData: function(files) {
        var self = this,
            formDataArray = [],
            // formData = new FormData(),
            errorFiles = 0
        ;
        // too accomidate for Drag Drop files 
        // check type if it is not a valid file 
        // then do not send to server and keep tally
        // this tally is then displayed on the form
        // self.setState({ photoUploadMode: 'loading'});
        var formData = new FormData()
        var count = 0 
        var size = 0
        var lastIndex = files.length -1
        debugger 
        console.log(files.length) 
        files.forEach((file, index)=> {
            if (accept({name: file.name, type: file.type }, 'image/*' ) && file.size < 2000000) {
                // debugger
                count += 1
                size += file.size
                if (count === 5 || size > 10000000) {
                    formDataArray.push(formData)
                    formData = new FormData()
                    count = 0 
                    size = 0
                    formData.append('upload', file)
                }
                else {
                    if (index === lastIndex){
                        formData.append('upload', file)
                        formDataArray.push(formData)
                    }
                    else {
                        formData.append('upload', file)
                    }                   
                }
            } 
            else {
                errorFiles += 1
            };
        });
        var totalFileNumber = 0 
        formDataArray.forEach(function(form){
            totalFileNumber += form.getAll('upload').length;

        })
        debugger
        if (self.state.photoUploadThumbnailIds.length + formData.getAll('upload').length > 100) {
            self.setState({
                isOpen: true,
                photoUploadMode: 'initial',
                error: 'It appears that these additional files will take you over the max of 100 photos per image collection.'
            });
        }
        else {
            debugger 
            // **********************************************************************
            //DEBUGGER
            // **********************************************************************
            self.setState({ 
                photoUploadMode: 'loading',
                photoUploadCount: formData.getAll('upload').length,
                photoErrorCount: errorFiles
            }, function() {
                self.sendFormattedData(formData);
            });
        }        
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
            .then(function(res) {
                var thumbnailIds = res.thumbnails.map(function(a) {return a.thumbnail_id;});
                self.setState({
                    photoUploadMode:'success',
                    photoUploadThumbnailIds: self.state.photoUploadThumbnailIds.concat(thumbnailIds),
                    error: null 
                }, function() {
                    setTimeout(function() {
                        self.setState({ photoUploadMode:'initial' });
                    }, 3000)
                })                
            }).catch(function(err) {
                // parsing this response to follow the error 
                //convention in Ajax module see line 24
                var parsedError = JSON.parse(err.response).error;
                // if 401 we use grab a new token and sendFormattedData another time
                if (parsedError.code === 401) {
                    self.grabRefreshToken(formData);
                }
                else {
                    self.setState({ 
                        photoUploadMode:'initial'
                    },  function() {
                            self.throwUploadError(parsedError);
                    });
                }
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
        self.setState({ 
            photoUploadMode: 'loading',
            photoUploadCount: urls.length
            },
                function() {
                    self.POST('thumbnails', options)
                    .then(function(res) {
                        var thumbnailIds = res.thumbnails.map(function(a) {return a.thumbnail_id;});
                        self.setState({
                            photoUploadMode:'success',
                            photoUploadThumbnailIds: self.state.photoUploadThumbnailIds.concat(thumbnailIds),
                            error: null 
                        },  function() {
                            setTimeout( function() {
                                self.setState({ photoUploadMode:'initial' });
                            }, 3000);
                        });
                    })
                    .catch(function(err) {
                        self.throwUploadError(err);
                    });
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
    grabRefreshToken: function(formData) {
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
                SESSION.forceSet(res.access_token, res.refresh_token, res.account_ids[0]);
                self.sendFormattedData(formData);
            })
            .catch(function (err) {
                SESSION.end();
            });
    },
    sendCollectionTag: function() {
        var self = this,
            options = {
                data: {
                    name: self.state.photoCollectionName, 
                    thumbnail_ids: self.state.photoUploadThumbnailIds.join(",")
                }
            }
        ;
        self.POST('tags', options)
            .then(function(res) {
                // **********************************************************************
                // need to redirect to collections and or update depending on Onboarding State
                // **********************************************************************
            self.resetStateOnSuccessOrClose();
            })
            .catch(function(err) { 
                self.throwUploadError(err);
            });
    },
    resetStateOnSuccessOrClose: function() {
        var self = this; 
        self.setState({
            isOpen: false,
            error: null,
            isOpenMessage: false,
            isPhotoOpen: false, 
            isVideoOpen: false,
            photoUploadCount: 0,
            photoUploadMode: 'initial', // initial, loading, success,
            photoUploadThumbnailIds: [],
            photoCollectionName: '',
            videoUploadUrl:''
        });
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default UploadForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
