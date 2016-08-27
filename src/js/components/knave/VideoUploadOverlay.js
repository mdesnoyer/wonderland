// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import ReactDOM from 'react-dom';
import T from '../../modules/translation';
import Message from '../wonderland/Message'

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideoUploadOverlay = React.createClass({

    propTypes: {
        error: React.PropTypes.string,
        toggleOpen: React.PropTypes.func,
        updateField: React.PropTypes.func,
        videoUploadUrl: React.PropTypes.string
    },

    componentDidMount: function() {
        // Put focus in the form name input when opening.
        const node = ReactDOM.findDOMNode(this.refs.urlInput);
        if(node) {
            node.focus();
        }
        window.addEventListener('keydown', this.handleKeyEvent);
    },
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyEvent);
    },

    handleKeyEvent(e) {
        // Enter submits form.
        const self = this;
        if (e.keyCode === 13) {
            if (this.props.videoUploadUrl) {
                e.target.dataset.sendUrl = true;
                self.props.toggleOpen(e);
            }
        }
    },
    render: function() {
        const { isOnboarding } = this.props;
        const isMobile = window.outerWidth < 768;
        var self = this,
            submitClassName = ['xxButton', 'xxButton--highlight'],
            isValid = !!self.props.videoUploadUrl,
            messageNeeded = self.props.error ? <Message message={self.props.error} type={'formError'}/> : null
        ;
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
                            onChange={e => self.props.updateField('videoUploadUrl', e.target.value)}
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
                            onClick={self.props.toggleOpen}
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
