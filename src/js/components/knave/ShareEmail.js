// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import AjaxMixin from '../../mixins/Ajax';
import T from '../../modules/translation';
import TRACKING from '../../modules/tracking';
import UTILS from '../../modules/utils';
import RENDITIONS from '../../modules/renditions';
import Message from '../wonderland/Message';
import Account from '../../mixins/Account';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var ShareEmail = React.createClass({
    mixins: [AjaxMixin, Account],
    getInitialState: function() {
        var self = this;
        return {
            mode: 'quiet', // quiet, error, loading, success
            shareUrl: '',
            errorMessage: T.get('error.unableToSendEmail')
        }
    },
    componentWillMount: function() {
        var self = this;
        if (!self.props.isGuest) {
            self.getAccount()
                .then(function(account) {
                    self.GET('videos/share', {
                        data: {
                            video_id: self.props.videoId
                        }
                    })
                    .then(function(json) {
                        self.setState({
                            shareUrl: window.location.origin + '/share/video/' + self.props.videoId + '/account/' + account.accountId + '/token/' + json.share_token + '/'
                        }, function() {
                            UTILS.shortenUrl(self.state.shareUrl, self.handleUrlCallback)
                        });
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
                })
                .catch(function(err) {
                    console.log(err);
                })
            ;
        }
    },
    handleUrlCallback: function(response) {
        var self = this;
        if (response.status_code === 200) {
            self.setState({ shareUrl: response.data.url });
        }
    },
    render: function() {
        var self = this,
            userMessage = false
        ;
        switch (self.state.mode) {
            case 'error':
                userMessage = <Message message={self.state.errorMessage} type="formError" />;
                break;
            case 'loading':
                userMessage = <Message message={T.get('copy.loading')} />;
                break;
            default:
                break;
        }
        return (
            <div className="xxCollectionAction">
                <h2 className="xxTitle">{T.get('email')}</h2>
                {
                    (self.state.mode === 'success') ? (
                        <div>
                            <div className="xxText">
                                <p>{T.get('copy.videoContent.email.success')}</p>
                            </div>
                            <div className="xxCollectionAction-buttons">
                                <button
                                    className="xxButton"
                                    type="button"
                                    data-action-label="info"
                                    onClick={self.handleBackClick}
                                >{T.get('back')}</button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="xxText">
                                <p>{T.get('copy.videoContent.email')}</p>
                            </div>
                            {userMessage}
                            <div className="xxFormField">
                                <label
                                    className="xxLabel"
                                    htmlFor="xx-email-from"
                                >{T.get('label.yourEmail')}</label>
                                <input
                                    ref="email"
                                    className="xxInputText"
                                    id="xx-email-from"
                                    type="email"
                                    placeholder={UTILS.EXAMPLE_EMAIL}
                                    required
                                />
                            </div>
                            <div className="xxCollectionAction-buttons">
                                <button
                                    className="xxButton"
                                    type="button"
                                    data-action-label="info"
                                    onClick={self.handleBackClick}
                                >{T.get('back')}</button>
                                <button
                                    className="xxButton xxButton--highlight"
                                    type="button"
                                    onClick={self.handleSubmit}
                                >{T.get('send')}</button>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    },
    handleBackClick: function(e) {
        var self = this;
        self.props.handleMenuChange(e);
    },
    handleSubmit: function(e) {
        var self = this,
            sortedThumbnails = UTILS.fixThumbnails(self.props.thumbnails, true),
            email = self.refs.email.value.trim(),
            re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ;
        e.preventDefault();
        if (re.test(email)) {
            self.setState({
                mode: 'loading'
            }, function() {
                var options = {
                    data: {
                        subject: UTILS.RESULTS_EMAIL_SUBJECT,
                        to_email_address: email,
                        template_slug: UTILS.RESULTS_MANDRILL_SLUG,
                        template_args: {
                            'top_thumbnail': RENDITIONS.findRendition(sortedThumbnails[0], 425, 240),
                            'lift': UTILS.makePercentage(sortedThumbnails[0].lift, 0, true),
                            'thumbnail_one': RENDITIONS.findRendition(sortedThumbnails[1], 140, 79),
                            'thumbnail_two': RENDITIONS.findRendition(sortedThumbnails[2], 140, 79),
                            'thumbnail_three': RENDITIONS.findRendition(sortedThumbnails[3], 140, 79),
                            'collection_url': self.state.shareUrl
                        }
                    }
                };
                self.POST('email', options)
                    .then(function(res) {
                        TRACKING.sendEvent(self, arguments, self.props.videoId);
                        self.setState({
                            mode: 'success'
                        });
                    })
                    .catch(function(err) {
                        self.setState({
                            mode: 'error'
                        });
                    })
                ;
            })
        }
        else {
            self.setState({
                mode: 'error',
                errorMessage: T.get('error.invalidEmail')
            })
        }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ShareEmail;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
