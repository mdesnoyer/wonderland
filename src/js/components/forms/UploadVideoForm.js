// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import AJAX from '../../modules/ajax';
import UTILS from '../../modules/utils';
import TRACKING from '../../modules/tracking';
import T from '../../modules/translation';
import TermsOfServiceModal from '../core/TermsOfServiceModal';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var UploadVideoForm = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {
            accessToken: '',
            refreshToken: '',
            mode: 'silent', // silent/loading/error
            isAgreementChecked: false,
            url: '',
            isModalActive: false
        };
    },
    handleToggleModal: function() {
        this.setState({
            isModalActive: !this.state.isModalActive
        });
    },
    render: function() {
        var copyTerms = T.get('copy.agreeTerms', {'@link': '/terms/'});
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
                    <legend className="title is-2">{T.get('upload')}</legend>
                    <p className="control">
                        ({T.get('copy.processingTime')})
                    </p>
                    <p className="control is-grouped">
                        <input required className={inputClassName} type="url" ref="url"  onChange={this.handleChangeUrl} value={this.state.url} placeholder={T.get('upload.addVideoUrl')} />
                        <button className={buttonClassName}>Upload</button>
                    </p>
                    <p className="control">
                        <input className={inputClassName} type="text" ref="title" placeholder={T.get('upload.optionalTitle')} />
                    </p>
                    <div className="control">
                        <label className="checkbox" onChange={this.handleChangeAgreement} checked={this.state.isAgreementChecked}>
                            <input type="checkbox" />
                        </label>
                        <span dangerouslySetInnerHTML={{__html: copyTerms}} />
                    </div>
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

export default UploadVideoForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
