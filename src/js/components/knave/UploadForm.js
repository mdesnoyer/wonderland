    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

import UTILS from '../../modules/utils';
import T from '../../modules/translation';
import TRACKING from '../../modules/tracking';

import reqwest from 'reqwest';
import SESSION from '../../modules/session';

import Account from '../../mixins/Account';
import AjaxMixin from '../../mixins/Ajax';


import {AddActions, LoadActions} from '../../stores/CollectionStores.js';

import VideoUploadOverlay from './VideoUploadOverlay';
import ImageUploadOverlay from './ImageUploadOverlay';
import ImageUploadPanel from './ImageUploadPanel';
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
            isOpenMessage: false,
            isPhotoOpen: false, 
            isVideoOpen: false,
            photoUploadCount: 0,
            photoUploadMode: 'initial', // initial, loading, success,
            photoUploadThumbnailIds: [],
            photoCollectionName: '',
            videoUploadUrl:'',
            numberUploadedCount: 0,
            error: null,
        };
    },

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyEvent);
    },

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyEvent);
    },

    handleKeyEvent(e) {
        // Escape closes.
        const self = this;
        if (e.keyCode === 27) {
            self.setState(self.getInitialState());
        }
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
            self.setState(self.getInitialState());
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
        this.setState(this.getInitialState());
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
        if (self.props.isAddPanel) {
            return (
                <ImageUploadPanel
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
                    numberUploadedCount={self.state.numberUploadedCount}
                    cancelClickHandler={self.props.cancelClickHandler}
                    panelType={self.props.panelType}
                    updateDefaultThumbnail={self.updateDefaultThumbnail}
                />
            );
        }
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
                >
                    {T.get('action.analyze')}
                </a>
                <ReactCSSTransitionGroup 
                    transitionName="xxFadeInOutFast"
                    transitionEnterTimeout={UTILS.UPLOAD_TRANSITION}
                    transitionLeaveTimeout={UTILS.UPLOAD_TRANSITION}
                >
                    {
                        self.state.isOpen ? (
                            <div className="xxOverlay" 
                                ref={overlay => self._overlay = overlay}
                                onClick={self.handleBgCloseClick}
                                key="upload-overlay"
                            >
                                <ReactCSSTransitionGroup
                                    transitionName="xxFadeInOutFast" 
                                    transitionEnterTimeout={UTILS.UPLOAD_TRANSITION} 
                                    transitionLeaveTimeout={UTILS.UPLOAD_TRANSITION}
                                >
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
                                            numberUploadedCount={self.state.numberUploadedCount}
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
            self.POST('videos', options)
                .then(function(json) {
                    if (self.props.onboardingAction) {
                        self.props.onboardingAction('video', json.video.video_id);
                    }
                    else {
                        // TODO: replace with a loadTag.
                        LoadActions.loadFromSearchResult({
                            items: [
                                {
                                    tag_id: json.video.tag_id,
                                    tag_type: UTILS.TAG_TYPE_VIDEO_COL,
                                    video_id: json.video.video_id
                                }]
                        });
                        // LoadActions.loadVideos([json.video.video_id]);
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
         for (var i = 0, file; file = files[i]; i++) {
             fileArray.push(file);
         }
         self.formatData(fileArray);
     },
     formatData: function(files) {
        var self = this,
            formDataArray = [],
            errorFiles, count, size, totalFileNumber,
            formData = new FormData(),
            lastIndex = files.length - 1
        ;
        if (self.props.panelType === 'video') {

        }
        errorFiles = count = size = totalFileNumber = 0;
        files.forEach((file, index)=> {
            if (accept({name: file.name, type: file.type }, 'image/*' ) && file.size < UTILS.MAX_IMAGE_FILE_SIZE) {    
                count += 1;
                size += file.size;
                totalFileNumber += 1;
                if (count > UTILS.MAX_IMAGE_UPLOAD_COUNT || size > UTILS.MAX_IMAGE_CHUNK_SIZE) {
                    formDataArray.push(formData);
                    formData = new FormData();
                    count = 0; 
                    size = 0;
                    if (index === lastIndex) {
                        formData.append('upload', file);
                        formDataArray.push(formData);
                    }
                    else {
                        formData.append('upload', file);
                    }
                }
                else {
                    if (index === lastIndex) {
                        formData.append('upload', file);
                        formDataArray.push(formData);
                    }
                    else {
                        formData.append('upload', file);
                    }
                }
            } 
            else {
                errorFiles += 1;
            };
        });
        if (self.state.photoUploadThumbnailIds.length + totalFileNumber > UTILS.MAX_IMAGE_FILES_ALLOWED) {
                self.setState({
                    isOpen: true,
                    photoUploadMode: 'initial',
                    error: T.get('imageUpload.uploadMax')
                });
        }
        else if (totalFileNumber === 0 && errorFiles >= 1 ) {
            self.setState({
                isOpen: true,
                photoUploadMode: 'initial',
                error: T.get('imageUpload.imageError')
            });
        }
        else {
            self.setState({ 
                photoUploadMode: 'loading',
                photoUploadCount: totalFileNumber,
                numberUploadedCount: 0, 
                photoErrorCount: errorFiles
            },  function() {
                if(self.props.isAddPanel && self.props.panelType === 'video' ) {
                    self.multiPartUpdateDefaultThumbnail(formDataArray[0]);
                }
                else { 
                    self.grabRefreshToken(
                        formDataArray.forEach(function(formData) {
                            self.sendFormattedData(formData);
                        })
                    )
                }
            });
        }        
    },
    sendFormattedData: function(formData) {
        var self = this,
            address =  self.props.isAddPanel ? 'thumbnails?tag_id=' + self.props.tagId : 'thumbnails',
            options = {
                data: formData,
                processData : false,
                contentType: 'multipart/form-data'
            }
        ;
        self.POST(address, options)
           .then(function(res) {
                var thumbnailIds = res.thumbnails.map(function(a) {return a.thumbnail_id;});
                self.setState({
                    photoUploadThumbnailIds: self.state.photoUploadThumbnailIds.concat(thumbnailIds),
                    numberUploadedCount: self.state.numberUploadedCount + thumbnailIds.length
                    }, function() {
                        if (self.state.numberUploadedCount >= self.state.photoUploadCount) {
                            self.setState({
                                photoUploadMode:'success',
                                error: null 
                                }, function() {
                                    // if add panel load the new thumbnails asssociated with the tag
                                    self.props.isAddPanel && LoadActions.loadTags([self.props.tagId]);
                                    setTimeout(function() {
                                    self.setState({ photoUploadMode:'initial' });
                                    }, 3000)
                            });                         
                    }
                });
            })
           .catch(function(err) {
               self.setState({
               photoUploadMode:'initial'
               },  function() {
                   self.throwUploadError(err);
               });
           }); 
     },
     sendDropBoxUrl: function(urls) {
        var self = this,
            dropBoxUrlsArray = urls.map(function(a) {return a.link;}).join(","),
            address =  self.props.isAddPanel ? 'thumbnails?tag_id=' + self.props.tagId : 'thumbnails',
            options = {
                data: {
                    url: dropBoxUrlsArray
                }
            }
        ;
        self.setState({ 
            photoUploadMode: 'loading',
            photoUploadCount: urls.length,
            numberUploadedCount: Math.round(urls.length) / 2
            }, function() {
                self.POST(address, options)
                .then(function(res) {
                    var thumbnailIds = res.thumbnails.map(function(a) {return a.thumbnail_id;});
                    self.setState({
                        photoUploadMode:'success',
                        photoUploadThumbnailIds: self.state.photoUploadThumbnailIds.concat(thumbnailIds),
                        error: null 
                    },  function() {
                        if (self.props.isAddPanel) {
                            LoadActions.loadTags([self.props.tagId]);
                            self.setState(self.getInitialState());
                        };
                        setTimeout( function() {
                        self.setState({ photoUploadMode:'initial' });
                        }, 2000);
                    });
                })
                .catch(function(err) {
                    photoUploadMode:'initial'
                },  function() {
                    self.throwUploadError(err);
                });
            });
        
    },
    grabDropBox: function() {
        var self = this,
            options = {
                success: function(urls) {self.props.panelType === 'video' ? self.updateDefaultThumbnail(urls) : self.sendDropBoxUrl(urls)},
                linkType: "direct",
                multiselect: self.props.panelType === 'photo',
                extensions: UTILS.IMAGE_FILE_TYPES_ALLOWED
            }
        ;
            Dropbox.choose(options);
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
                if (self.props.onboardingAction) {
                    self.props.onboardingAction('col');
                }
                else {
                    LoadActions.loadFromSearchResult({
                        items: [{tag_id: res.tag_id}]
                    });
                    self.setState(self.getInitialState());                        
                }
            })
    },
    updateDefaultThumbnail: function(url) {
        var self = this,
            url = typeof url === 'object' ? url[0].link : url,
            options = { 
                data: {
                    default_thumbnail_url: url,
                    video_id: self.props.videoId
                } 
            }
        self.PUT('videos', options)
            .then(function(res) {
                self.setState({photoUploadMode: 'success'});
                LoadActions.loadTags([self.props.tagId],
                    self.props.cancelClickHandler()
                );
            })
            .catch(function(err) {
                self.setState({
                    photoUploadMode:'initial'
                },  function() {
                    self.throwUploadError(err);
                });
            });
    },
    multiPartUpdateDefaultThumbnail: function(formData) {
        var self = this,
            options = {
                data: formData,
                processData : false,
                contentType: 'multipart/form-data'
        }
        self.PUT('videos?video_id=' + self.props.videoId, options)
            .then(function(res) {
                self.setState({photoUploadMode: 'success'});
                LoadActions.loadTags([self.props.tagId],
                    self.props.cancelClickHandler()
                );
            })
            .catch(function(err) {
                self.setState({
                    photoUploadMode:'initial'
                },  function() {
                    self.throwUploadError(err);
                });
            });
    },
    grabRefreshToken: function() {
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
        })
        .catch(function (err) {
            SESSION.end();
        });
    },
    propTypes: {
        onboardingAction: React.PropTypes.func,
        onboardingError: React.PropTypes.func,
        cancelClickHandler: React.PropTypes.func,
        isAddPanel: React.PropTypes.bool,
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default UploadForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
