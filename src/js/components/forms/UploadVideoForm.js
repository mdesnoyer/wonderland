// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import AJAX from '../../modules/ajax';
import UTILS from '../../modules/utils';
import TRACKING from '../../modules/tracking';
import T from '../../modules/translation';
import ModalWrapper from '../core/ModalWrapper';
import Message from '../wonderland/Message';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var UploadVideoForm = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getDefaultProps: function() {
        postHook: React.PropTypes.func.isRequired
    },
    getInitialState: function() {
        var self = this;
        return {
            accessToken: '',
            refreshToken: '',
            mode: 'silent', // silent/loading/error
            isAgreementChecked: false,
            url: '',
            isModalActive: false,
            currentVideoCount: self.props.currentVideoCount,
            maxVideoCount: self.props.maxVideoCount,
            currentVideoCount: 9, // TODO
            maxVideoCount: 10 // TODO
        };
    },
    render: function() {
        var self = this;
        if (self.state.currentVideoCount >= self.state.maxVideoCount) {
            return (
                <Message header={T.get('copy.uploadVideo.heading')} body={T.get('copy.uploadVideo.maxLimitHit', {
                    '%limit': self.state.maxVideoCount
                })} flavour="danger" /> 
            );
        }
        else {
            var copyTerms = T.get('copy.agreeTerms', {'@link': '/terms/'});
            if (self.state.mode === 'loading') {
                var buttonClassName = 'button is-primary is-medium is-disabled is-loading',
                    inputClassName = 'input is-medium is-disabled'
                ;
            }
            else if ((!self.state.isAgreementChecked || !self.state.url) && (self.state.mode === 'silent')) {
                var buttonClassName = 'button is-medium is-primary is-disabled',
                    inputClassName = 'input is-medium'
            }
            else {
                var buttonClassName = 'button is-medium is-primary',
                    inputClassName = 'input is-medium'
                ;
            }
            return (
                <form onSubmit={self.handleSubmit}>
                    <fieldset>
                        <legend className="subtitle is-5">{T.get('copy.uploadVideo.heading')}</legend>
                        <p className="control is-grouped">
                            <input required className={inputClassName} type="url" ref="url"  onChange={self.handleChangeUrl} value={self.state.url} placeholder={T.get('upload.addVideoUrl')} />
                            <button className={buttonClassName}>Upload</button>
                        </p>
                        <p className="control">
                            <input className={inputClassName} type="text" ref="title" placeholder={T.get('upload.optionalTitle')} />
                        </p>
                        <div className="control">
                            <label className="checkbox is-medium" onChange={self.handleChangeAgreement} checked={self.state.isAgreementChecked}>
                                <input type="checkbox" />
                                <span dangerouslySetInnerHTML={{__html: copyTerms}} />
                            </label>
                        </div>
                    </fieldset>
                </form>
            );
        }
        
    },
    handleChangeUrl: function(e) {
        this.setState({
            url: e.target.value
        });
    },
    handleChangeAgreement: function(e) {
        this.setState({
            isAgreementChecked: !this.state.isAgreementChecked
        });
    },
    handleSubmit: function (e) {
        var url = this.refs.url.value.trim();
        e.preventDefault();
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
            }
        ;
        AJAX.doPost('videos', options)
            .then(function(json) {
                if (self.props.postHook) {
                    self.props.postHook();
                }
                else {
                    self.context.router.push('/video/' + videoId + '/');
                }
            })
            .catch(function(err) {
                console.error(err.responseText);
                if (self.props.postHook) {
                    self.props.postHook();
                }
                else {
                    self.context.router.push('/video/' + videoId + '/');
                }
            });
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default UploadVideoForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
