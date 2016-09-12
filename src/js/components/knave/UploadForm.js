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
import UploadActionsContainer from './UploadActionsContainer';

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
            tagId: null,
            formState: 'chooseUploadType', // addVideo // addCollection // updateCollection // updateVideoDefault // chooseUplodaType // closed
            urlInput:'', 
            collectionName:'', 
            uploadState: 'initial',  //initial // loading // success
            uploadingTotal: null,
            uploadedTotal: null,
            uploadThumbnailIds: [],
            errorFiles: [],
            overlayCode: null,
            showUrlUploader: false
        };
    },
    componentWillMount: function() {
        var self = this;
        if (self.props.isAddPanel && self.props.panelType === 'photo') {
            self.setState({ 
                uploadTotal: TagStore.get(self.props.tagId).thumbnail_ids.length || 0,
                tagId: self.props.tagId,
                isOpen: true,
                formState: 'updateCollection'
            });
        };
        if (self.props.isAddPanel && self.props.panelType === 'video') {
            self.setState({
                isOpen: true,
                formState: 'updateVideoDefault'             
            })
        }
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
        self.setState({ isOpen: !self.state.isOpen, formState: 'chooseUploadType' });
    },
    updateField: function(field, value) {
        var self = this;
        self.setState({ [field]: value });
    },
    handleOpenPhoto: function(e) {
        e.preventDefault();
        this.setState({ formState: 'addCollection' });
    },
    handleOpenVideo: function(e) {
        e.preventDefault();
        this.setState({ formState: 'addVideo' });
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
    handleInputClick: function() {
        if (this.state.formState === 'updateVideoDefault') { this.setState({ showUrlUploader: false})} ;
        document.getElementById("file-input").click();
    },
    handleNameSubmit: function() {
        this.sendCollectionName();
    },
    handleCollectionLoad: function() {
        if (this.props.onboardingAction) {
            this.props.onboardingAction('col');
        }
        else {
            LoadActions.loadFromSearchResult({ items: [{tag_id: this.state.tagId}] });
            this.setState(this.getInitialState());
        }
    },
    handleUrlSubmit: function() {
        this.sendVideoUrl();
    },
    handleUpdateVideoDefault: function(e) {
        e.preventDefault();
        this.setState({
            showUrlUploader: false,
            uploadState: 'loading',
            uploadingTotal: 1
        },  function() {
            this.updateDefaultThumbnail(this.state.urlInput)
        })
    },
    handleshowUrlUploader: function() {
        this.setState({ showUrlUploader: !this.state.showUrlUploader });
    },
    handleCancelClick: function() {
        // this.setState(this.getInitialState());
        this.props.cancelClickHandler();
    },
    render: function() {
        var self = this,
            className = ['xxUpload']
        ;
        if (self.state.isOpen && !self.props.isAddPanel) {
            className.push('is-open');
        };
        if (self.state.formState === 'addVideo' || self.state.formState === 'addCollection') {
            className.push('has-dialog');
        };
        return (
            <div className={className.join(' ')}>
                { self.state.overlayCode ? <OverLayMessage overlayCode={self.state.overlayCode} overlayReset={self.handleOverlayReset} errorFiles={self.state.errorFiles} /> : null }
                { !self.props.isAddPanel  ? <a className="xxUploadButton" title={T.get('action.analyze')} onClick={self.toggleOpen}> {T.get('action.analyze')} </a> : null }
                { !self.state.isOpen ? null : (
                        <UploadActionsContainer 
                            formState={self.state.formState}
                            uploadState={self.state.uploadState}
                            showUrlUploader={self.state.showUrlUploader}
                            urlInput={self.state.urlInput} 
                            tagId={self.state.tagId}
                            collectionName={self.state.collectionName}
                            uploadingTotal={self.state.uploadingTotal}
                            uploadedTotal={self.state.uploadedTotal}
                            uploadThumbnailIds={self.state.uploadThumbnailIds}
                            errorFiles={self.state.errorFiles}
                            overlayCode={self.state.overlayCode}
                            toggleOpen={self.toggleOpen}
                            updateField={self.updateField}
                            handleOpenVideo={self.handleOpenVideo}
                            handleOpenPhoto={self.handleOpenPhoto}
                            handleNameSubmit={self.handleNameSubmit}
                            handleCollectionLoad={self.handleCollectionLoad}
                            handleUrlSubmit={self.handleUrlSubmit}
                            handleUpdateVideoDefault={self.handleUpdateVideoDefault}
                            handleshowUrlUploader={self.handleshowUrlUploader}
                            handleInputClick={self.handleInputClick}
                            handleCancelClick={self.handleCancelClick}
                            grabDropBox={self.grabDropBox}
                            sendLocalPhotos={self.sendLocalPhotos}
                        />
                    )
                }
            </div>
        );
    },
    throwUploadError: function(err) {
        var self = this;
        switch(err.code) {
            case 0:
                self.setState({ isOpen: false, overlayCode: 'timeout' });
                break;  
            case 401:
                self.context.router.replace(UTILS.DRY_NAV.SIGNIN.URL);
                break;
            case 402:
                self.setState({ uploadState:'initial', isOpen: false, overlayCode: 'limit' });
                break;
            case 404:
                self.context.router.replace('*');
                break;
            default:
                self.setState({ uploadState:'initial', isOpen: false, overlayCode: err.code });
        }
    },
    sendVideoUrl: function() {
        var self = this,
            videoId = UTILS.generateId(),
            options = {
                data: {
                    external_video_ref: videoId,
                    url: UTILS.properEncodeURI(UTILS.dropboxUrlFilter(self.state.urlInput))
                }
            }
        ;
        if (!UTILS.validateUrl(self.state.urlInput)) {
            self.throwUploadError({ code: 'VidInvalidUrl' });
            return
        };
        self.setState({
            isOpen: false
        },  function() {
            self.POST('videos', options)
                .then(function(json) {
                    if (self.props.onboardingAction) {
                        self.props.onboardingAction('video', json.video.video_id);
                        self.setState({urlInput: ''});
                    }
                    else {
                        LoadActions.loadTags([json.video.tag_id]);
                        self.setState({urlInput: ''});
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
                cancel: function() { self.setState({ uploadState:'initial'}) },
                linkType: "direct",
                multiselect: !self.props.isAddPanel || self.props.panelType === 'photo',
                extensions: UTILS.IMAGE_FILE_TYPES_ALLOWED
            }
        ;
        if (self.state.formState === 'updateVideoDefault') { self.setState({ showUrlUploader: false})} ;
        Dropbox.choose(options);
    },

    sendCollectionName: function() {
        var self = this, 
            options = { data: { name: self.state.collectionName } }
        ;
        self.POST('tags', options)
            .then(function(res) {
                self.setState({ tagId: res.tag_id });
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
            uploadState: 'loading',
            uploadingTotal: 1
        },  function() {
                self.PUT('videos?video_id=' + self.props.videoId, options)
                    .then(function(res) {
                        self.setState({
                            uploadState: 'success'
                        },  function() {
                            LoadActions.loadTags([self.state.tagId])
                            setTimeout(function() {
                            self.setState({ uploadState: 'initial' });
                            }, 4000)                           
                        })
                    })
                    .catch(function(err) {
                        self.setState({
                            uploadState:'initial'
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
                self.setState({
                    uploadState: 'success'
                },  function() {
                    LoadActions.loadTags([self.state.tagId])
                    setTimeout(function() {
                    self.setState({ uploadState: 'initial' });
                    }, 4000)   
                })
            })
            .catch(function(err) {
                self.setState({
                    uploadState:'initial'
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
        if (self.state.uploadThumbnailIds.length + filesToParse[0].length  > UTILS.MAX_IMAGE_FILES_ALLOWED ||
            self.state.uploadTotal + filesToParse[0].length > UTILS.MAX_IMAGE_FILES_ALLOWED
         ) {
            self.throwUploadError({ code: 'ImgUploadMax' });
            return;
        };
            self.setState({
                uploadState: 'loading',
                uploadingTotal: filesToParse[0].length,
                uploadedTotal: 0,
                errorFiles: filesToParse[1]
            },  function() {
                if (type !== 'dropbox') { arrayToSend = self.createFormDataArray(arrayToSend);};
                self.grabRefreshToken(
                    arrayToSend.forEach(function(array) {
                        self.props.panelType === 'video' ? self.multiPartUpdateDefaultThumbnail(array) : self.sendFormattedData(array, type)
                    })
                )
            });
    },
    sendFormattedData: function(array, type) {
        var self = this,
            options
        ;
        switch(type) {
            case 'dropbox':
                options = { data: { url: array.map(function(a) {return a.link;}).join(","),} };
                break;
            case 'local' :
                options = { data: array, processData : false, contentType: 'multipart/form-data' };
                break;
        }
        self.POST('thumbnails?tag_id=' + self.state.tagId, options)
            .then(function(res) {
                var thumbnailIds = res.thumbnails.map(function(a) {return a.thumbnail_id;});
                self.setState({
                    uploadThumbnailIds: self.state.uploadThumbnailIds.concat(thumbnailIds),
                    uploadedTotal: self.state.uploadedTotal + thumbnailIds.length
                    }, function() {
                        if (self.state.uploadedTotal >= self.state.uploadingTotal) {
                            self.setState({
                                uploadState:'success',
                                errorFiles: []
                                }, function() {
                                    self.props.isAddPanel && LoadActions.loadTags([self.state.tagId]);
                                    setTimeout(function() {
                                    self.setState({ uploadState: 'initial' });
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
