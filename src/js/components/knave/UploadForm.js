    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

import UTILS from '../../modules/utils';
import T from '../../modules/translation';
import TRACKING from '../../modules/tracking';

import reqwest from 'reqwest';
import SESSION from '../../modules/session';

import Account from '../../mixins/Account';
import AjaxMixin from '../../mixins/Ajax';

import {AddActions, LoadActions, TagStore} from '../../stores/CollectionStores.js';

import VideoUploadOverlay from './VideoUploadOverlay';
import ImageUploadOverlay from './ImageUploadOverlay';
import ImageUploadPanel from './ImageUploadPanel';
import OverLayMessage from './OverLayMessage'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import cookie from 'react-cookie';
import accept from 'attr-accept';
import _ from 'lodash';

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
            isPhotoOpen: false,
            isVideoOpen: false,
            photoUploadCount: 0,
            photoUploadMode: 'initial', // initial, loading, success,
            photoUploadThumbnailIds: [],
            photoCollectionName: '',
            videoUploadUrl:'',
            numberUploadedCount: 0,
            overlayCode: null,
            errorFiles: [],
            error: null,
            totalUploaded: null
        };
    },
    componentWillMount: function() {
        var self = this;
        if (self.props.isAddPanel && self.props.panelType === 'photo') {
            self.setState({ totalUploaded: TagStore.get(self.props.tagId).thumbnail_ids.length || 0});
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
                self.sendVideoUrl();
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
                errorFiles: [],
                isOpen: !self.state.isOpen,
                isOpenPhoto: false,
                isOpenVideo: false,
                overlayCode: null
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
    handleOpenMessageErrorFiles: function(e) {
        e.preventDefault();
        this.throwUploadError({ code: 'ImgViewErrFiles' });
    },
    handleOverlayReset: function(e) {
        e.preventDefault();
        this.setState({ overlayCode: null, isOpen: true});
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
                <div>
                {
                    self.state.overlayCode ? <OverLayMessage overlayCode={self.state.overlayCode} overlayReset={self.handleOverlayReset} errorFiles={self.state.errorFiles} /> : null
                }
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
                        photoErrorCount={self.state.errorFiles.length}
                        updateField={self.updateField}
                        photoCollectionName={self.state.photoCollectionName}
                        photoUploadThumbnailIds={self.state.photoUploadThumbnailIds}
                        numberUploadedCount={self.state.numberUploadedCount}
                        cancelClickHandler={self.props.cancelClickHandler}
                        panelType={self.props.panelType}
                        updateDefaultThumbnail={self.updateDefaultThumbnail}
                        handleOpenMessageErrorFiles={self.handleOpenMessageErrorFiles}
                    />
                </div>
            );
        }
        return (
            <div className={className.join(' ')}>
                {
                    self.state.overlayCode ? <OverLayMessage overlayCode={self.state.overlayCode} overlayReset={self.handleOverlayReset} errorFiles={self.state.errorFiles} /> : null
                }
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
                                            photoErrorCount={self.state.errorFiles.length}
                                            updateField={self.updateField}
                                            photoCollectionName={self.state.photoCollectionName}
                                            photoUploadThumbnailIds={self.state.photoUploadThumbnailIds}
                                            numberUploadedCount={self.state.numberUploadedCount}
                                            handleOpenMessageErrorFiles={self.handleOpenMessageErrorFiles}
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
            case 0:
            console.log('YOOO')
                self.setState({ isOpen: false, overlayCode: 'limit' });
                break;  
            case 401:
                self.context.router.replace(UTILS.DRY_NAV.SIGNIN.URL);
                break;
            case 402:
                self.setState({ photoUploadMode:'initial', isOpen: false, overlayCode: 'limit' });
                break;
            case 404:
                self.context.router.replace('*');
                break;
            default:
                self.setState({ photoUploadMode:'initial', isOpen: false, overlayCode: err.code });
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
            self.throwUploadError({ code: 'VidInvalidUrl' });
            return
        };
        self.setState({
            isOpen: false,
            isOpenPhoto: false,
            isOpenVideo: false
        },  function() {
            self.POST('videos', options)
                .then(function(json) {
                    if (self.props.onboardingAction) {
                        self.props.onboardingAction('video', json.video.video_id);
                        self.setState({videoUploadUrl: ''});
                    }
                    else {
                        LoadActions.loadTags([json.video.tag_id]);
                        self.setState({videoUploadUrl: ''});
                    }

                })
                .catch(function(err) {
                    self.throwUploadError(err);
                });
        })
        TRACKING.sendEvent(self, arguments, self.props.isOnboarding);
    },
    sendLocalPhotos: function(e) {
         var self = this,
             files = e.target ? e.target.files : e,
             fileArray = []
         ;
         for (var i = 0, file; file = files[i]; i++) {
             fileArray.push(file);
         }
         self.formatData(fileArray, 'local');
    },
    grabDropBox: function() {
        var self = this,
            options = {
                success: function(urls) { self.props.panelType === 'video' ? self.updateDefaultThumbnail(urls) : self.formatData(urls, 'dropbox') },
                cancel: function() { self.setState({ photoUploadMode:'initial'}) },
                linkType: "direct",
                multiselect: !self.props.isAddPanel || self.props.panelType === 'photo',
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
        if (self.state.photoCollectionName === '') {
            self.throwUploadError({ code: 'ImgCollectionName' });
            return;
        }
        if (self.state.photoUploadThumbnailIds.length < 1) {
            self.throwUploadError({ code: 'NoImages' });
            return;
        };

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
            });
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
        self.setState({
            photoUploadMode: 'loading',
            photoUploadCount: 1
        },  function() {
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
    formatData: function(files, type) {
        var self = this,
            sizeTypes = type === 'dropbox' ? 'bytes' : 'size',
            filesToParse = _.partition(files, function(item) {return item[sizeTypes] <= UTILS.MAX_IMAGE_FILE_SIZE && (type === 'dropbox' || accept({name: item.name, type: item.type }, 'image/*' ))}),
            arrayToSend = [],
            arrayToAdd = [],
            size = 0
        ;
        filesToParse[0].forEach(function(item, index) {
            if (arrayToAdd.length + 1 <= UTILS.MAX_IMAGE_UPLOAD_COUNT && size + item[sizeTypes] <= UTILS.MAX_IMAGE_CHUNK_SIZE) {
                arrayToAdd.push(item);
                size += item[sizeTypes];
                index === filesToParse[0].length - 1 && arrayToSend.push(arrayToAdd);
            }
            else {
                arrayToSend.push(arrayToAdd);
                arrayToAdd = [];
                size = 0;
                size += item[sizeTypes];
                arrayToAdd.push(item);
                index === filesToParse[0].length - 1 && arrayToSend.push(arrayToAdd);
            }
        });
        if (filesToParse[0].length === 0) {
            self.throwUploadError({ code: 'AllFiles' })
            return;
        };
        if (self.state.photoUploadThumbnailIds.length + filesToParse[0].length  > UTILS.MAX_IMAGE_FILES_ALLOWED ||
            self.state.totalUploaded + filesToParse[0].length > UTILS.MAX_IMAGE_FILES_ALLOWED
         ) {
            self.throwUploadError({ code: 'ImgUploadMax' });
            return;
        };
        console.log(filesToParse[0])
        console.log(filesToParse[1])
            self.setState({
                photoUploadMode: 'loading',
                photoUploadCount: filesToParse[0].length,
                numberUploadedCount: 0,
                errorFiles: filesToParse[1]
            },  function() {
                if (type !== 'dropbox') { arrayToSend = self.createFormDataArray(arrayToSend);};
                console.log(arrayToSend) 
                self.grabRefreshToken(
                    arrayToSend.forEach(function(array) {
                        self.props.panelType === 'video' ? self.multiPartUpdateDefaultThumbnail(array) : self.sendFormattedData(array, type)
                    })
                )
            });
    },
    sendFormattedData: function(array, type) {
        var self = this,
            options,
            address =  self.props.isAddPanel ? 'thumbnails?tag_id=' + self.props.tagId : 'thumbnails'
        ;
        switch(type) {
            case 'dropbox':
                options = { data: { url: array.map(function(a) {return a.link;}).join(","),} };
                break;
            case 'local' :
                options = { data: array, processData : false, contentType: 'multipart/form-data' };
                break;
        }
        self.POST(address, options)
            .then(function(res) {
                var thumbnailIds = res.thumbnails.map(function(a) {return a.thumbnail_id;});
                self.setState({
                    photoUploadThumbnailIds: self.state.photoUploadThumbnailIds.concat(thumbnailIds),
                    numberUploadedCount: self.state.numberUploadedCount + thumbnailIds.length
                    }, function() {
                        console.log(self.state.numberUploadedCount)
                        console.log(self.state.photoUploadCount)
                        if (self.state.numberUploadedCount >= self.state.photoUploadCount) {
                            self.setState({
                                photoUploadMode:'success',
                                errorFiles: []
                                }, function() {
                                    self.props.isAddPanel && LoadActions.loadTags([self.props.tagId]);
                                    setTimeout(function() {
                                    self.setState({ photoUploadMode:'initial' });
                                    }, 3000)
                            });
                    }
                });
            })
            .catch(function(err) {
                console.log(err)
                self.throwUploadError(err);
            });
    },
    createFormDataArray: function(fileArray) {
        var formDataArray = [];
        fileArray.forEach(function(array, i){
            var formData = new FormData();
            array.forEach(function(file, i) {
                formData.append('upload', file);
            })
            formDataArray.push(formData);
        })
        return formDataArray;
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



