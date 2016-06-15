// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import UTILS from '../../modules/utils';
import E from '../../modules/errors';
import AjaxMixin from '../../mixins/Ajax';
import Account from '../../mixins/Account';
import Message from '../wonderland/Message';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideoSharer = React.createClass({
    mixins: [AjaxMixin, Account], // ReactDebugMixin
    propTypes: {
        shareToken: React.PropTypes.string.isRequired,
        videoId: React.PropTypes.string.isRequired
    },
    getInitialState: function() {
        var self = this;
        return {
            mode: 'silent', // silent/loading/error/success/bonus
            shareToken: self.props.shareToken,
            videoId: self.props.videoId,
            shareUrl: '',
            shortUrl: ''
        }
    },
    componentWillMount: function() {
        var self = this;
    },
    componentWillUpdate: function(nextProps, nextState) {
        var self = this;
        if ((self.state.mode !== nextState.mode) && (nextState.mode === 'loading')) {
            self.generateShareUrl()
        }
    },
    componentWillUnmount: function(e) {
        E.clearErrors();
    },
    render: function() {
        // We need a videoId, shareToken, accountId to create this URL
        var self = this,
            urlToDisplay = '',
            controlClass = ''
        ;
        switch (self.state.mode) {
            case 'silent':
                urlToDisplay = '';
                controlClass = 'control';
                break;
            case 'loading':
                urlToDisplay = '';
                controlClass = 'control is-loading';
                break;
            case 'error':
                urlToDisplay = '';
                controlClass = 'control';
                break;
            case 'success':
                // /share/video/:videoId/account/:accountId/token/:token/
                urlToDisplay = window.location.origin + '/share/video/' + self.state.videoId + '/account/' + self.state.accountId + '/token/' + self.state.shareToken + '/';
                controlClass = 'control';
                break;
            case 'bonus':
                urlToDisplay = self.state.shortUrl;
                controlClass = 'control';
                break;
        }
        if (self.state.mode === 'error') {
            return (
                <Message header={'ERROR Heading TODO'} body={E.getErrors()} flavour="danger" />
            );
        }
        if (self.state.mode === 'silent') {
            return (
                <button className="button" onClick={self.handleShareClick}>
                    Share TODO
                </button>
            );
        }
        else {
            return (
                <div className="notification">
                    <p className={controlClass}>
                        <input
                            className="input"
                            type="url"
                            placeholder="URL to share"
                            disabled
                            value={urlToDisplay}
                        />
                    </p>
                </div>
            );
        }
        
    },
    handleShareClick: function(e) {
        var self = this;
        e.preventDefault();
        self.setState({
            mode: 'loading'
        });
    },
    generateShareUrl: function() {
        var self = this;
        self.getAccount()
            .then(function (account) {
                self.setState({
                    accountId: account.accountId,
                }, function() {
                    // We now have the accountId and the videoId, lets check
                    // the shareToken
                    if (self.state.shareToken) {
                        self.setState({
                            mode: 'success'
                        });  
                    }
                    else {
                        self.GET('videos/share', {
                            data: {
                                video_id: self.state.videoId
                            }
                        })
                            .then(function(json) {
                                self.setState({
                                    mode: 'success',
                                    shareToken: json.share_token
                                }, function() {
                                    UTILS.shortenUrl(self.state.shareUrl, self.handleUrl);
                                });
                            })
                            .catch(function(err) {
                                switch (err.code) {
                                    case 401:
                                        E.raiseError('TODO 401 Error message');
                                        self.setState({
                                            mode: 'error'
                                        });
                                        break;
                                    case 403:
                                        E.raiseError('TODO 403 Error message');
                                        self.setState({
                                            mode: 'error'
                                        });
                                        break;
                                    case 404:
                                        E.raiseError('TODO 404 Error message');
                                        self.setState({
                                            mode: 'error'
                                        });
                                        break;
                                    default:
                                        E.raiseError('TODO Default Error message');
                                        self.setState({
                                            mode: 'error'
                                        });
                                        break;
                                }
                            })
                        ;
                    }
                });
            })
            .catch(function (err) {
                console.log(err);
                E.raiseError(err);
                self.setState({
                    mode: 'error'
                });
            })
        ;
    },
    handleUrl: function(response) {
        var self = this;
        if (response.status_code === 200) {
            self.setState({
                mode: 'bonus',
                shortUrl: response.data.url
            });
        }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideoSharer;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
