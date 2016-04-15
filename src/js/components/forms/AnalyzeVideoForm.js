// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import AJAX from '../../modules/ajax';
import UTILS from '../../modules/utils';
import TRACKING from '../../modules/tracking';
import T from '../../modules/translation';
import ModalWrapper from '../core/ModalWrapper';
import Message from '../wonderland/Message';
import TutorialPanels from '../wonderland/TutorialPanels';
import E from '../../modules/errors';
import moment from 'moment';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var AnalyzeVideoForm = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getDefaultProps: function() {
        postHook: React.PropTypes.func
    },
    getInitialState: function() {
        var self = this;
        return {
            accessToken: '',
            refreshToken: '',
            mode: 'silent', // silent/loading/error
            url: '',
            optionalTitle: '',
            isModalActive: false,
            // currentVideoCount: self.props.currentVideoCount,
            maxVideoCount: self.props.maxVideoCount,
            //left at zero to demonstrate that it works
            currentVideoCount: 0, // TODO
            maxVideoCount: 10 // TODO
        };
    },
    render: function() {
        var self = this,
            messageNeeded = self.state.isError ? <Message header={T.get('copy.analyzeVideo.title') + ' ' + T.get('error')} body={E.getErrors()} flavour="danger" />  : '',
            tutorialComponent,
            panels = {
                'youtube-play': T.get('copy.analyzeVideoPanel.panel.1'),
                'files-o': T.get('copy.analyzeVideoPanel.panel.2'),
                'upload': T.get('copy.analyzeVideoPanel.panel.3'),
                'eye': T.get('copy.analyzeVideoPanel.panel.4')
            }
        ;
        if (self.state.currentVideoCount >= self.state.maxVideoCount) {
            var body = <span dangerouslySetInnerHTML={{
                __html: T.get('copy.analyzeVideo.maxLimitHit', {
                    '%limit': self.state.maxVideoCount
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
            tutorialComponent = self.state.currentVideoCount === 0 ? <TutorialPanels panels={panels}/> : '';
            return (
                <div>
                    {tutorialComponent}
                    <form onSubmit={self.handleSubmit}>
                        {messageNeeded}
                        <fieldset>
                            <legend className="subtitle is-5">{T.get('copy.analyzeVideo.heading')}</legend>
                            <p className="control is-grouped">
                                <input
                                    required
                                    className={inputClassName}
                                    type="url"
                                    ref="url"
                                    onChange={self.handleChangeUrl}
                                    value={self.state.url}
                                    placeholder={T.get('analyze.addVideoUrl')}
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
                            <p className="is-text-centered">
                                <button className={buttonClassName} type="submit">{T.get('analyze')}</button>
                            </p>
                        </fieldset>
                    </form>
                </div>
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
        TRACKING.sendEvent(self, arguments, url);
        self.analyzeVideo(UTILS.dropboxUrlFilter(url), optionalTitle);
        self.resetForm();
    },
    makeTitle: function() {
        var self = this;
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
                E.checkForError(err.statusText, false);
                self.setState({
                    isError: true
                });
            });
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default AnalyzeVideoForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
