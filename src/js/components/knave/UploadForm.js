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
            formState: 'chooseUploadType', // addVideo // addCollection // updateCollection // updateVideoDefault // chooseUplodaType //
            urlInput:'', 
            collectionName:'', 
            uploadState: 'initial',  //initial // loading // success
            uploadingTotal: null,
            uploadedTotal: 0,
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
                uploadedTotal: TagStore.get(self.props.tagId).thumbnail_ids.length || 0,
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
        // if clicks out of their upload box then return to the choose upload type state
        self.setState({ isOpen: !self.state.isOpen, formState: 'chooseUploadType' });
    },
    updateField: function(field, value) {
        var self = this;
        self.setState({ [field]: value });
    },
    handleOpenPhoto: function(e) {
        // if user wants to post a collection
        e.preventDefault();
        this.setState({ formState: 'addCollection' });
    },
    handleOpenVideo: function(e) {
        // if user wants to post a video
        e.preventDefault();
        this.setState({ formState: 'addVideo' });
    },
    handleOpenMessageErrorFiles: function(e) {
        // if the user wants to see the files with errors throw appriprate overlay message
        e.preventDefault();
        this.throwUploadError({ code: 'ImgViewErrFiles' });
    },
    handleOverlayReset: function(e) {
        e.preventDefault();
        if (this.props.onboardingAction && this.state.overlayCode === 'timeout' ) {
        // when there is a timeout on onboarding upload route to the tutotiral then collections page
            this.props.onboardingAction('col');
        }
        this.setState({ overlayCode: null, isOpen: true });
    },
    handleInputClick: function() {
        // when the input is clicked on update default video thumb show the dragdrop again
        if (this.state.formState === 'updateVideoDefault') { this.setState({ showUrlUploader: false})} ;
        // due to css formating this fakes that the user is clicking the input when they are actullay clicking a dummy dom
        document.getElementById("file-input").click();
    },
    handleNameSubmit: function(e) {
        const self = this;
        e.preventDefault();
        self.sendCollectionName();
    },
    handleCollectionLoad: function() {
        //when a collection is done loading handle onboarding and regular actions
        if (this.props.onboardingAction) {
            this.props.onboardingAction('col');
        }
        else {
            LoadActions.loadFromSearchResult({ items: [{tag_id: this.state.tagId}] }, false, null, null, null);
            this.setState(this.getInitialState());
        }
    },
    handleUrlSubmit: function(e) {
        const self = this;
        e.preventDefault();
        self.sendVideoUrl(e.target.dataset.sendUrlType);
    },
    handleUpdateVideoDefault: function(e) {
        //set state to loading once a user has submitted their new default thumb
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
        //toggle for URL input of updating video default thumb
        this.setState({ showUrlUploader: !this.state.showUrlUploader });
    },
    handleCancelClick: function() {
        //hanlder for when the user click "back" button on the action panel
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
                { self.state.overlayCode ? (
                    <OverLayMessage 
                        handleOpenMessageErrorFiles={self.handleOpenMessageErrorFiles} 
                        overlayCode={self.state.overlayCode} 
                        overlayReset={self.handleOverlayReset} 
                        errorFiles={self.state.errorFiles} 
                    /> ) : null 
                }
                { 
                    !self.props.isAddPanel ? (
                        <a 
                            className="xxUploadButton"
                            title={T.get('action.analyze')}
                            onClick={self.toggleOpen}
                            >{T.get('action.analyze')} 
                        </a>
                    ) : null 
                }
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
                            handleOpenMessageErrorFiles={self.handleOpenMessageErrorFiles}
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
                self.setState({ isOpen: false, overlayCode: err.code });
        }
    },
    sendVideoUrl: function(sendUrlType) {
        var self = this,
            videoId = UTILS.generateId(),
            options = {
                data: {
                    external_video_ref: videoId,
                    url: UTILS.properEncodeURI(UTILS.dropboxUrlFilter(self.state.urlInput))
                }
            }
        ;

        if (sendUrlType === 'gif') { 
            options.data['result_type'] = 'clips';
            options.data['clip_length'] = 3;
            options.data['n_clips'] = 5;
        };

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
                    self.setState({ uploadState:'initial'
                    },  function() {
                        self.throwUploadError(err);
                    })
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
        // when updating the video default thumbnail exit out of url input box if dropbox button clicked 
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
            })
            .catch(function(err){
                self.throwUploadError(err);
            })
        ;
    },
    updateDefaultThumbnail: function(url) {
        var self = this,
        // this logic below is to handle both dropbox objects and url string that come in when updating a thumbnail 
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
        // if there are no files to parse show approriate error message
        if (filesToParse[0].length === 0) {
            self.throwUploadError({ code: 'AllFiles' })
            return;
        };
        // if the number of thumbnails to be uploaded + the current thumbnail count is over 100 throw approriate error message
        if (self.state.uploadThumbnailIds.length + filesToParse[0].length  > UTILS.MAX_IMAGE_FILES_ALLOWED ||
            self.state.uploadedTotal + filesToParse[0].length > UTILS.MAX_IMAGE_FILES_ALLOWED
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
                // if the request is a mulitpart form create and array of formdata objects 
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
            // if the request is dropbox then create a csv of all the url strings
            case 'dropbox':
                options = { data: { url: array.map(function(a) {return a.link;}).join(","),} };
                break;
            // if the request is a multipart form add the proper parameters to the request
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
                                // errorFiles: []
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
