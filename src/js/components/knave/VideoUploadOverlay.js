// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import T from '../../modules/translation';
import Message from '../wonderland/Message'
import { DesktopUploadButton } from './UploadActions';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

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
        const self = this;
        ReactDOM.findDOMNode(self.refs.urlInput).focus();
    },
    handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        const self = this;
        self.props.toggleOpen(e);
        self.handleUrlSubmit(e);
    },
    handleUrlSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        const self = this;
        self.props.handleUrlSubmit(e, self.getTitle());
    },
    getTitle() {
        const self = this;
        const input = ReactDOM.findDOMNode(self.refs.titleInput);
        return input ? input.value : null;
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
                        <input
                            id="xx-upload-local"
                            className="xxInputText"
                            disabled
                            placeholder={T.get('upload.doneUpload')}
                        />
                        <label className="xxLabel" htmlFor="xx-upload-local">
                            {T.get('label.title')}
                        </label>
                        <input
                            id="xx-upload-title"
                            className="xxInputText"
                            ref="titleInput"
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
                    <div className="xxFormField">
                        <label className="xxLabel" htmlFor="xx-upload-local">
                            {T.get('upload')}
                        </label>
                        <input
                            id="xx-upload-local"
                            className="xxInputText"
                            disabled
                            placeholder={T.get('upload.uploading')}
                        />
                        <label className="xxLabel" htmlFor="xx-upload-local">
                            {T.get('label.title')}
                        </label>
                        <input
                            id="xx-upload-title"
                            className="xxInputText"
                            ref="titleInput"
                            placeholder={T.get('upload.optionalTitle')}
                        />
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
        if (this.props.formState === 'uploadingVideo') {
            return this.renderUploading();
        }
        if (this.props.formState === 'uploadedVideo') {
            return this.renderUploaded();
        }
        const { isOnboarding } = this.props,
            self = this,
            submitClassName = ['xxButton', 'xxButton--highlight'],
            isValid = !!self.props.urlInput,
            messageNeeded = self.props.error ? <Message message={self.props.error} type={'formError'}/> : null,
            isMobile = self.context.isMobile
        ;
        if (isValid) {
            submitClassName.push('xxButton--important');
        }
        return (
            <section className="xxUploadDialog">
                <form className="xxUploadDialog-inner" onSubmit={self.handleSubmit}>
                    <h2 className="xxTitle">
                        { isMobile ? T.get('copy.analyzeVideo.upload') : T.get('copy.analyzeVideo.lets') }
                    </h2>
                    {messageNeeded}
                    <div className="xxFormField">
                        <label className="xxLabel" htmlFor="xx-upload-local">
                            {T.get('upload')}
                        </label>
                         <DesktopUploadButton
                             id="xx-upload-local"
                             {...this.props}
                             accept={"video/*"}
                             multiple={false}
                             sendLocalPhotos={self.props.handleUploadVideo}
                         />
                        <label className="xxLabel" htmlFor="xx-upload-url">
                            {T.get('url')}
                        </label>
                        <input
                            id="xx-upload-url"
                            ref="urlInput"
                            className="xxInputText"
                            placeholder={T.get('upload.videoUrl')}
                            type="url"
                            required
                            onChange={e => self.props.updateField('urlInput', e.target.value)}
                        />
                    </div>
                    <div className="xxFormButtons">
                        <label className="xxLabel" htmlFor="xx-upload-url">
                            {T.get('copy.analyzeVideo.giveMe')}
                        </label>
                        <div className="xxUploadButtonsChooser">
                            <button
                                 disabled={!isValid}
                                 className={submitClassName.join(' ')}
                                 type="submit"
                                 data-send-url-type="thumbnails"
                                 onClick={self.handleUrlSubmit}
                             >{T.get('thumbnails')}</button>
                             <button
                                 disabled={!isValid}
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
