// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import DropDown from './DropDown';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideoUploadOverlay = React.createClass({
    getInitialState: function() {
        return {
            url: ''
        }
    },
    updateField: function(field, value) {
        var self = this;
        this.setState({
            [field]: value
        });
    },
    render() {
        const { isOnboarding } = this.props;
        var self = this,
            submitClassName = ['xxButton', 'xxButton--highlight'],
            isValid = !!self.state.url
        ;
        if (isValid) {
            submitClassName.push('xxButton--important');
        }
        return (
            <section className="xxUploadDialog">
                <div className="xxUploadDialog-inner">
                    <h2 className="xxTitle">Let’s analyze a video</h2>
                    <div className="xxFormField">
                        <label className="xxLabel" htmlFor="xx-upload-url">
                            {T.get('url')}
                        </label>
                        <input
                            className="xxInputText"
                            type="text"
                            id="xx-upload-url"
                            value={self.state.url}
                            placeholder={T.get('upload.videoUrl')}
                            type="url"
                            onChange={e => self.updateField('url', e.target.value)}
                        />
                    </div>
                    <button
                        disabled={!isValid}
                        className={submitClassName.join(' ')}
                        type="button"
                        onClick={self.handleClick}
                    >{T.get('upload.submit')}</button>
                </div>
            </section>
        );
    },
    handleClick: function() {
        var self = this;
        if (self.props.handleUpload) {
            self.props.handleUpload(self.state.url);
        }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideoUploadOverlay;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
