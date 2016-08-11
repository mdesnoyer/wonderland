// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import T from '../../modules/translation';
import Message from '../wonderland/Message'

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideoUploadOverlay = React.createClass({
    render: function() {
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
                    <h2 className="xxTitle">Let’s analyze a video</h2>
                    {messageNeeded}
                    <div className="xxFormField">
                        <label className="xxLabel" htmlFor="xx-upload-url">
                            {T.get('url')}
                        </label>
                        <input
                            className="xxInputText"
                            id="xx-upload-url"
                            placeholder={T.get('upload.videoUrl')}
                            type="url"
                            required
                            onChange={e => self.props.updateField('videoUploadUrl', e.target.value)}
                        />
                    </div>
                    <button
                        disabled={!isValid}
                        className={submitClassName.join(' ')}
                        type="submit"
                        data-send-url={true}
                        onClick={self.props.toggleOpen}
                    >{T.get('upload.submit')}</button>
                </div>
            </section>
        );
    },
    propTypes: {
        error: React.PropTypes.string,
        toggleOpen: React.PropTypes.func,
        updateField: React.PropTypes.func,
        videoUploadUrl: React.PropTypes.string
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideoUploadOverlay;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
