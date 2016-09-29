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
    },
    handleSubmit(e) {
        const self = this;
        self.props.toggleOpen(e);
        self.props.handleUrlSubmit(e);
    },
    render: function() {
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
                                 onClick={self.props.handleUrlSubmit}
                             >{T.get('thumbnails')}</button>
                             <button
                                 disabled={!isValid}
                                 className={submitClassName.join(' ')}
                                 type="submit"
                                 data-send-url-type="gif"
                                 onClick={self.props.handleUrlSubmit}
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
