import React, { PropTypes } from 'react';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';
import Message from '../wonderland/Message'
import { DesktopUploadButton } from './UploadActions';

var VideoUploadOverlay = React.createClass({

    propTypes: {
        error: PropTypes.string,
        toggleOpen: PropTypes.func,
        updateField: PropTypes.func,
        urlInput: PropTypes.string,
        handleUploadVideo: PropTypes.func,
    },
    contextTypes: {
        isMobile: PropTypes.bool
    },
    componentDidMount: function() {
        this.urlInput.focus();
    },
    handleUrlSubmit(e) {
        e.preventDefault();
        const self = this;
        const url = self.getUrl();
        if (url) {
            self.props.handleUrlSubmit(e, url, self.getTitle());
        }
    },
    getUrl() {
        const self = this;
        if (self.props.urlInput) {
            return self.props.urlInput;
        }
        if (self.urlInput && self.urlInput.value) {
            return self.urlInput.value;
        }
        return null;
    },
    getTitle() {
        const self = this;
        return self.titleInput ? self.titleInput.value : null;
    },
    render: function() {
        const { isOnboarding } = this.props,
            submitClassName = ['xxButton', 'xxButton--highlight'],
            isValid = !!(this.props.urlInput),
            messageNeeded = this.props.error ? <Message message={this.props.error} type={'formError'}/> : null,
            isMobile = this.context.isMobile
        ;
        if (isValid) {
            submitClassName.push('xxButton--important');
        }
        console.log(this.props.urlInput)
        return (
            <section className="xxUploadDialog">
                <form className="xxUploadDialog-inner" onSubmit={this.handleUrlSubmit}>
                    <h2 className="xxTitle">
                        { isMobile ? T.get('copy.analyzeVideo.upload') : T.get('copy.analyzeVideo.lets') }
                    </h2>
                    {messageNeeded}
                    { 
                        this.props.uploadState === 'initial' && (
                            <div className="xxFormField">
                                <label className="xxLabel" htmlFor="xx-upload-local">
                                    {T.get('upload.videoUploadInstruct')}
                                </label>
                                <div className="xxUploadDialog-block">
                                    <DesktopUploadButton
                                         id="xx-upload-local"
                                         {...this.props}
                                         accept={UTILS.VIDEO_ACCEPT_MASK}
                                         multiple={false}
                                         sendLocalPhotos={this.props.handleUploadVideo}
                                         isMobile={isMobile}
                                    />
                                </div>
                                <div className="xxUploadButtonsChooser">
                                    <label className="xxLabel">{T.get('imageUpload.or')}</label>
                                </div>
                                    <input
                                        id="xx-upload-url"
                                        ref={(urlInput) => { this.urlInput = urlInput; }}
                                        className="xxInputText"
                                        placeholder={T.get('upload.videoUrl')}
                                        type="url"
                                    />
                            </div>    
                        ) 
                    }
                    {
                        this.props.uploadState === 'loading' && (
                            <div className="xxUploadDialog-block">
                                <div className="xxDragAndDrop-spinner"></div>
                            </div>
                        )
                    }
                    {
                        this.props.uploadState === 'success' && (
                            <div className="xxUploadDialog-block">
                                <div className="xxDragAndDrop-success"></div>
                            </div>
                        )
                    }
                    {
                        (this.props.uploadState === 'success' || this.props.uploadState === 'loading') && (
                            <div>
                                <label className="xxLabel" htmlFor="xx-upload-local">
                                    {T.get('label.title')}
                                </label>
                                <input
                                    id="xx-upload-title"
                                    className="xxInputText"
                                    ref={(titleInput) => { this.titleInput = titleInput; }}
                                    placeholder={T.get('upload.optionalTitle')}
                                />
                            </div>
                        )
                    }
                    <div className="xxFormButtons">
                        <label className="xxLabel" htmlFor="xx-upload-url">
                            {T.get('copy.analyzeVideo.giveMe')}
                        </label>
                        <div className="xxUploadButtonsChooser">
                            <button
                                 className={submitClassName.join(' ')}
                                 data-send-url-type="thumbnails"
                                 onClick={this.handleUrlSubmit}
                             >{T.get('thumbnails')}</button>
                             <button
                                 className={submitClassName.join(' ')}
                                 data-send-url-type="gif"
                                 onClick={this.handleUrlSubmit}
                             >{T.get('gifs')}</button>
                        </div>
                    </div>
                </form>
            </section>
        );
    },
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideoUploadOverlay;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
