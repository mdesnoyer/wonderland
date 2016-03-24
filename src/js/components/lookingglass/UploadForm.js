// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import AJAX from '../../ajax';
import UTILS from '../../utils';
import TRACKING from '../../tracking';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var UploadForm = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {
            accessToken: '',
            refreshToken: '',
            mode: 'silent', // silent/loading/error
            isAgreementChecked: false,
            url: ''
        }
    },
    render: function() {
        if (this.state.mode === 'loading') {
            var buttonClassName = 'button is-primary is-disabled is-loading',
                inputClassName = 'input is-disabled'
            ;
        }
        else if ((!this.state.isAgreementChecked || !this.state.url) && (this.state.mode === 'silent')) {
            var buttonClassName = 'button is-primary is-disabled',
                inputClassName = 'input'
        }
        else {
            var buttonClassName = 'button is-primary',
                inputClassName = 'input'
            ;
        }
        return (
            <form onSubmit={this.handleSubmit} >
                <fieldset>
                    <legend className="title is-2">Upload Video</legend>
                    <p className="control">
                        (The processing time depends on the length of the video. It takes our computers about the same amount of time to watch a video as it takes you, so longer videos take a while.)
                    </p>
                    <p className="control is-grouped">
                        <input required className={inputClassName} type="url" ref="url"  onChange={this.handleChangeUrl} value={this.state.url} placeholder="Add Video URL" />
                        <button className={buttonClassName}>Upload</button>
                    </p>
                    <p className="control">
                        <input className={inputClassName} type="text" ref="title" placeholder="Optional Title" />
                    </p>
                    <p className="control">
                        <label className="checkbox" onChange={this.handleChangeAgreement}  checked={this.state.isAgreementChecked}>
                            <input type="checkbox" />I agree to Neon&rsquo;s terms and conditions of use.
                        </label>
                    </p>
                </fieldset>
            </form>
        );
    },
    handleChangeUrl: function(e) { 
        // TODO REGEX FOR URL IN THE INPUT 
        this.setState({url: e.target.value})
    },
    handleChangeAgreement: function(){
        this.setState({isAgreementChecked: !this.state.isAgreementChecked})
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var url = this.refs.url.value.trim();
        TRACKING.sendEvent(this, arguments, url);
        this.uploadVideo(UTILS.dropboxUrlFilter(url), this.refs.title.value.trim());
    },
    uploadVideo: function (url, title) {
        var self = this,
            videoId = UTILS.generateId(),
            options = {
                data: {
                    external_video_ref: videoId,
                    url: UTILS.properEncodeURI(url),
                    title: title
                }
            };

        AJAX.doPost('videos', options)
            .then(function(json) {
                self.context.router.push('/video/' + videoId + '/');
            })
            .catch(function(err) {
                console.error(err.responseText);
                self.context.router.push('/video/' + videoId + '/');
            });
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default UploadForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
