// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import T from '../../modules/translation';
import Message from '../wonderland/Message'

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideoUploadOverlay = React.createClass({

    propTypes: {
        error: React.PropTypes.string,
        toggleOpen: React.PropTypes.func,
        updateField: React.PropTypes.func,
        urlInput: React.PropTypes.string
    },
    contextTypes: {
        isMobile: PropTypes.bool
    },

    componentDidMount: function() {
        const self = this;
        ReactDOM.findDOMNode(self.refs.urlInput).focus();
        window.addEventListener('keydown', self.handleKeyEvent);
    },

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyEvent);
    },

    handleKeyEvent(e) {
        // Enter submits form.
        const self = this;
        if (e.keyCode === 13) {
            if (self.props.urlInput) {
                e.target.dataset.sendUrl = true;
                self.props.toggleOpen(e);
            }
        }
    },
    render: function() {
        const { isOnboarding } = this.props;

        var self = this,
            submitClassName = ['xxButton', 'xxButton--highlight'],
            isValid = !!self.props.urlInput,
            messageNeeded = self.props.error ? <Message message={self.props.error} type={'formError'}/> : null
        ;
        const isMobile = self.context.isMobile;

        if (isValid) {
            submitClassName.push('xxButton--important');
        }
        return (
            <section className="xxUploadDialog">
                <div className="xxUploadDialog-inner">
                    <h2 className="xxTitle">
                        { isMobile ? T.get('copy.analyzeVideo.upload') : T.get('copy.analyzeVideo.lets') }
                    </h2>
                    {messageNeeded}
                    <div className="xxFormField">
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
                        {
                            isMobile ? (
                                <button
                                    className="xxButton"
                                    type="button"
                                    onClick={self.props.toggleOpen}
                                >{T.get('back')}</button>
                            ) : null
                        }
                        <button
                            disabled={!isValid}
                            className={submitClassName.join(' ')}
                            type="submit"
                            data-send-url={true}
                            onClick={self.props.handleUrlSubmit}
                        >{T.get('upload.submit')}</button>
                    </div>
                </div>
            </section>
        );
    },
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideoUploadOverlay;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
