// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import AJAX from '../../modules/ajax';
import UTILS from '../../modules/utils';
import TRACKING from '../../modules/tracking';
import T from '../../modules/translation';
import Message from '../wonderland/Message';
import TutorialPanels from '../wonderland/TutorialPanels';
import E from '../../modules/errors';
import moment from 'moment';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var AnalyzeVideoForm = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    propTypes: {
        showLegend: React.PropTypes.bool.isRequired
    },
    getDefaultProps: function() {
        return {
            videoCountServed: 0,
            showLegend: true
        }
    },
    getInitialState: function() {
        var self = this;
        return {
            accessToken: '',
            refreshToken: '',
            mode: 'silent', // silent/loading/error
            url: '',
            optionalTitle: '',
            maxVideoCount: 10,
            currentVideoCount: self.props.videoCountServed
        };
    },
    componentWillUnmount: function(e) {
        E.clearErrors();
    },
    render: function() {
        var self = this,
            messageNeeded = self.state.isError ? <Message header={T.get('copy.analyzeVideo.title') + ' ' + T.get('error')} body={E.getErrors()} flavour="danger" />  : '',
            legendElement = self.props.showLegend ? <legend className="title is-4">{T.get('copy.analyzeVideo.heading')}</legend> : ''
        ;
        if (self.state.currentVideoCount >= self.state.maxVideoCount) {
            var body = <span dangerouslySetInnerHTML={{
                __html: T.get('copy.analyzeVideo.maxLimitHit', {
                    '%limit': self.state.maxVideoCount,
                    '@link': UTILS.CONTACT_EXTERNAL_URL
                })
            }} />;
            return (
                <Message header={T.get('copy.analyzeVideo.heading')} body={body} flavour="danger" />
            );
        }
        else {
            if (self.state.mode === 'loading') {
                var buttonClassName = 'button is-primary is-medium is-disabled is-loading',
                    inputClassName = 'input is-medium is-disabled'
                ;
            }
            else if (!self.state.url && self.state.mode === 'silent') {
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
                    {messageNeeded}
                    <fieldset>
                        {legendElement}
                        <p className="control">
                            <input
                                required
                                className={inputClassName}
                                type="url"
                                ref="url"
                                onChange={self.handleChangeUrl}
                                value={self.state.url}
                                placeholder={T.get('analyze.videoUrl')}
                            />
                        </p>
                        <p className="control">
                            <input
                                className={inputClassName}
                                type="text"
                                ref="optionalTitle"
                                onChange={self.handleChangeOptionalTitle}
                                value={self.state.optionalTitle}
                                placeholder={T.get('analyze.optionalTitle')}
                            />
                        </p>
                        <p className="has-text-centered">
                            <button className={buttonClassName} type="submit">
                                <i className="fa fa-eye" aria-hidden="true"></i> {T.get('analyze')}
                            </button>
                        </p>
                    </fieldset>
                </form>
            );
        }

    },
    handleChangeUrl: function(e) {
        var self = this;
        self.setState({
            url: e.target.value
        });
    },
    handleChangeOptionalTitle: function(e) {
        var self = this;
        self.setState({
            optionalTitle: e.target.value
        });
    },
    resetForm: function() {
        var self = this;
        self.setState({
            isError: false,
            url: '',
            optionalTitle: ''
        });
    },
    handleSubmit: function (e) {
        var self = this,
            url = this.refs.url.value.trim(),
            optionalTitle = self.refs.optionalTitle.value.trim() || self.makeTitle()
        ;
        e.preventDefault();
        TRACKING.sendEvent('AnalyzeVideoForm','Submit', url);
        self.analyzeVideo(UTILS.dropboxUrlFilter(url), optionalTitle);
        self.resetForm();
    },
    makeTitle: function() {
        var self = this;
        TRACKING.sendEvent('AnalyzeVideoForm','Submit', 'Auto Generated Title Used');
        return T.get('app.companyShortName') + ' ' + T.get('video') + ' ' + moment(Date.now()).format('D MMM YYYY');
    },
    analyzeVideo: function (url, optionalTitle) {
        var self = this,
            videoId = UTILS.generateId(),
            options = {
                data: {
                    external_video_ref: videoId,
                    url: UTILS.properEncodeURI(url),
                    title: optionalTitle
                }
            }
        ;
        AJAX.doPost('videos', options)
            .then(function(json) {
                self.setState({
                    isError: false
                });
                if (self.props.postHook) {
                    self.props.postHook();
                }
                else {
                    self.context.router.push('/video/' + videoId + '/');
                }
            })
            .catch(function(err) {
                if (err.status === 402) {
                    E.checkForError(T.get('copy.analyzeVideo.maxLimitHit', {
                        '%limit': self.state.maxVideoCount,
                        '@link': UTILS.CONTACT_EXTERNAL_URL
                    }), false, 'AnalyzeVideoForm');
                }
                else {
                    E.checkForError(err.statusText, false, 'AnalyzeVideoForm');
                }
                self.setState({
                    isError: true
                });
            });
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default AnalyzeVideoForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
