import React, { PropTypes } from 'react';
import T from '../../modules/translation';
import Message from '../wonderland/Message'
import { DesktopUploadButton, UrlUploadButton } from './UploadActions';

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
        // this.urlInput.focus();
    },
    handleUrlSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
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
    doNothing(e) {
        e.preventDefault();
    },
    renderUploaded() {
        const isMobile = this.context.isMobile;
        const submitClassName = ['xxButton', 'xxButton--highlight', 'xxButton--important'];
        return (
            <section className="xxUploadDialog">
                <form className="xxUploadDialog-inner" onSubmit={this.doNothing}>
                    <h2 className="xxTitle">
                        { isMobile ? T.get('copy.analyzeVideo.upload') : T.get('copy.analyzeVideo.lets') }
                    </h2>
                    <div className="xxFormField">
                        <label className="xxLabel" htmlFor="xx-upload-local">
                            {T.get('upload')}
                        </label>
                        <div className="xxUploadDialog-block">
                            <div className="xxDragAndDrop-success"></div>
                            <span>{T.get('upload.doneUpload')}</span>
                        </div>
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
                    <div className="xxFormButtons">
                        <label className="xxLabel" htmlFor="xx-upload-url">
                            {T.get('copy.analyzeVideo.giveMe')}
                        </label>
                        <div className="xxUploadButtonsChooser">
                            <button
                                className={submitClassName.join(' ')}
                                type="submit"
                                data-send-url-type="thumbnails"
                                onClick={this.handleUrlSubmit}
                            >{T.get('thumbnails')}</button>
                            <button
                                className={submitClassName.join(' ')}
                                type="submit"
                                data-send-url-type="gif"
                                onClick={this.handleUrlSubmit}
                            >{T.get('gifs')}</button>
                        </div>
                    </div>
                </form>
            </section>
        );
    },
    renderUploading() {
        const isMobile = this.context.isMobile;
        const submitClassName = ['xxButton', 'xxButton--highlight', 'xxButton--important'];
        return (
            <section className="xxUploadDialog">
                <form className="xxUploadDialog-inner" onSubmit={this.doNothing}>
                    <h2 className="xxTitle">
                        { isMobile ? T.get('copy.analyzeVideo.upload') : T.get('copy.analyzeVideo.lets') }
                    </h2>
                    <div className="xxUploadDialog-block">
                    <div className="xxDragAndDrop-spinner"></div>
                    <span>{T.get('upload.uploading')}</span>
                    </div>
                    <div className="xxFormButtons">
                        <label className="xxLabel" htmlFor="xx-upload-url">
                            {T.get('copy.analyzeVideo.giveMe')}
                        </label>
                        <div className="xxUploadButtonsChooser">
                            <button
                                disabled
                                className={submitClassName.join(' ')}
                                type="submit"
                                data-send-url-type="thumbnails"
                                onClick={this.doNothing}
                            >{T.get('thumbnails')}</button>
                            <button
                                disabled
                                className={submitClassName.join(' ')}
                                type="submit"
                                data-send-url-type="gif"
                                onClick={this.doNothing}
                            >{T.get('gifs')}</button>
                        </div>
                    </div>
                </form>
            </section>
        );
    },

    render: function() {
        var props = this.props;
        if (this.props.formState === 'uploadingVideo') {
            return this.renderUploading();
        }
        if (this.props.formState === 'uploadedVideo') {
            return this.renderUploaded();
        }
        const { isOnboarding } = this.props,
            self = this,
            submitClassName = ['xxButton', 'xxButton--highlight'],
            isValid = !!(self.urlInput && self.urlInput.value),
            messageNeeded = self.props.error ? <Message message={self.props.error} type={'formError'}/> : null,
            isMobile = self.context.isMobile
        ;
        if (isValid) {
            submitClassName.push('xxButton--important');
        }
        return (
            <section className="xxUploadDialog">
                <form className="xxUploadDialog-inner" onSubmit={self.doNothing}>
                    <h2 className="xxTitle">
                        { isMobile ? T.get('copy.analyzeVideo.upload') : T.get('copy.analyzeVideo.lets') }
                    </h2>
                    {messageNeeded}
                    <div className="xxFormField">
                        <label className="xxLabel" htmlFor="xx-upload-local">
                            {T.get('upload')}
                        </label>
                        <div className="xxUploadDialog-block">
                        <div className="xxUploadButtonsChooser">
                            <DesktopUploadButton
                                id="xx-upload-local"
                                {...this.props}
                                accept={"video/*"}
                                multiple={false}
                                sendLocalPhotos={self.props.handleUploadVideo}
                            />
                            <UrlUploadButton {...props} />
                        </div>
                        </div>
                        <div className="xxUploadButtonsChooser">
                            <label className="xxLabel">{isMobile ? T.get('label.location.myPhone') : T.get('label.location.desktop')}</label>
                            <label className="xxLabel">URL</label>
                        </div>
                        {

                            !this.props.showUrlUploader ? '' : (
                                <input
                                    id="xx-upload-url"
                                    ref={(urlInput) => { this.urlInput = urlInput; }}
                                    className="xxInputText"
                                    placeholder={T.get('upload.videoUrl')}
                                    type="url"
                                />
                            )
                        }

                    </div>
                    <div className="xxFormButtons">
                        <label className="xxLabel" htmlFor="xx-upload-url">
                            {T.get('copy.analyzeVideo.giveMe')}
                        </label>
                        <div className="xxUploadButtonsChooser">
                            <button
                                 className={submitClassName.join(' ')}
                                 type="submit"
                                 data-send-url-type="thumbnails"
                                 onClick={self.handleUrlSubmit}
                             >{T.get('thumbnails')}</button>
                             <button
                                 className={submitClassName.join(' ')}
                                 type="submit"
                                 data-send-url-type="gif"
                                 onClick={self.handleUrlSubmit}
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
