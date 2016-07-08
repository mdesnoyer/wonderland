// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import T from '../../modules/translation';
import AjaxMixin from '../../mixins/Ajax';
import Account from '../../mixins/Account';
import UTILS from '../../modules/utils';
import { windowOpen, objectToGetParams } from '../../modules/sharing';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var ShareLink = React.createClass({
    mixins: [AjaxMixin, Account],
    getInitialState: function() {
        var self = this;
        return {
            shareToken: self.props.shareToken,
            videoId: self.props.videoId,
            shortUrl: ''
        }
    },
    componentWillMount: function() {
        var self = this;
        self.generateShareUrl();
    },
    componentDidMount: function() {
        var self = this,
            c = new Clipboard(self.refs.copyUrl)
        ;
    },
    render: function(){
        var self = this,  
            urlToDisplay = self.determineUrl()
        ;
        return (
            <div className="xxCollectionAction">
                <h2 className="xxTitle">{T.get('copy.share.main')}</h2>
                <ul className="xxCollectionShare">
                    <li className="xxCollectionShare-item is-active">
                        <span
                            className="xxCollectionShare-anchor xxCollectionShare-link"
                        ><span>Link</span></span>
                    </li>
                    <li className="xxCollectionShare-item">
                        <a data-social-action-label="facebook"
                            onClick={self.handleSocialClick}
                            className="xxCollectionShare-anchor xxCollectionShare-fb"
                        ><span>Facebook</span></a>
                    </li>
                    <li className="xxCollectionShare-item">
                        <a data-social-action-label="twitter"
                            onClick={self.handleSocialClick}
                            className="xxCollectionShare-anchor xxCollectionShare-twitter"
                        ><span>Twitter</span></a>
                    </li>
                    <li className="xxCollectionShare-item">
                        <a data-social-action-label="linkedin"
                            onClick={self.handleSocialClick}
                            className="xxCollectionShare-anchor xxCollectionShare-linkedin"
                        ><span>LinkedIn</span></a>
                    </li>
                </ul>
                <p>{T.get('copy.share.description')}</p>
                <div className="xxFormField">
                    <label
                        className="xxLabel"
                        htmlFor="xx-share-link"
                    >{T.get('copy.share.label')}</label>
                    <input
                        className="xxInputText"
                        id="xx-share-link"
                        type="text"
                        value={urlToDisplay}
                        readOnly
                    />
                </div>
                <div className="xxCollectionAction-buttons">
                    <button
                        className="xxButton"
                        type="button"
                        data-action-label="info"
                        onClick={this.handleBackClick}
                    >{T.get('back')}</button>
                    <button
                        className="xxButton xxButton--highlight"
                        data-clipboard-text={urlToDisplay}
                        value={urlToDisplay}
                        ref="copyUrl"
                        type="button"
                        onClick={self.handleCopyClick}
                    >{T.get('copy')}</button>
                </div>
            </div>
        );
    },
    handleBackClick: function(e) {
        var self = this;
        self.props.handleMenuChange(e);
    },
    handleSocialClick: function(e) {
        var self = this;
        switch(e.target.dataset.socialActionLabel) {
            case 'facebook':
                self.sendFacebookShare();
                break;
            case 'twitter':
                self.sendTwitterShare();
                break;
            case 'linkedin':
                self.sendLinkedinShare();
                break;
        }
    },
    generateShareUrl: function() {
        var self = this;
        self.getAccount()
            .then(function (account) {
                self.setState({
                    accountId: account.accountId,
                }, function() {
                        self.GET('videos/share', {
                            data: {
                                video_id: self.state.videoId
                            }
                        })
                        .then(function(json) {
                            self.setState({
                                shareToken: json.share_token,
                            },
                                function(){
                                    self.shortenUrlWithBitly();
                                }
                            );
                        })
                        .catch(function(err) {
                            console.log(err);
                        });
                });
            })
            .catch(function (err) {
                console.log(err);
            });
    },
    returnLongUrl: function() {
        var self = this;
        return window.location.origin + '/share/video/' + self.state.videoId + '/account/' + self.state.accountId + '/token/' + self.state.shareToken + '/';
    },
    shortenUrlWithBitly: function() {
        var self = this;
        UTILS.shortenUrl(self.returnLongUrl(), self.handleUrlCallback);
    },
    handleUrlCallback: function(response) {
        var self = this;
        if (response.status_code === 200) {
            self.setState({shortUrl: response.data.url})
        }
    },
    determineUrl: function() {
        var self = this;
        return self.state.shortUrl !== '' ? self.state.shortUrl : self.returnLongUrl()
    },
    sendFacebookShare: function() {
        var self = this,  
            urlToDisplay = self.determineUrl(),
            url = UTILS.SHARE_LINK_FACEBOOK + objectToGetParams({ 
                u: urlToDisplay,
                title: T.get('copy.share.title'),
                quote: T.get('copy.share.facebook')
            })
        ;
        windowOpen(url);
    },
    sendTwitterShare: function() {
        var self = this,  
            urlToDisplay = self.determineUrl(),
            hashtags = [],
            url = UTILS.SHARE_LINK_TWITTER + objectToGetParams({
                url: urlToDisplay,
                text: T.get('copy.share.twitter')
            })
        ;
        windowOpen(url);
    },
    sendLinkedinShare: function() {
        var self = this,  
            urlToDisplay = self.determineUrl(),
            url = UTILS.SHARE_LINK_LINKEDIN + objectToGetParams({ 
                url: urlToDisplay, 
                title: T.get('copy.share.title'), 
                summary: T.get('copy.share.linkedin') 
            })
        ;
        windowOpen(url);
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ShareLink

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
