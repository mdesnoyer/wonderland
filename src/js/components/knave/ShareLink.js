// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import T from '../../modules/translation';
import TRACKING from '../../modules/tracking';
import AjaxMixin from '../../mixins/Ajax';
import Account from '../../mixins/Account';
import UTILS from '../../modules/utils';
import { windowOpen, objectToGetParams } from '../../modules/sharing';
import ReactTooltip from 'react-tooltip';
import LoadingText from '../core/LoadingText';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var ShareLink = React.createClass({
    mixins: [AjaxMixin, Account],
    getInitialState: function() {
        var self = this;
        return {
            shareUrl: '',
            isLoading: true
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
            self.setState({
                shareUrl: response.data.url,
                isLoading: false
            });
        }
        else {
            self.setState({ isLoading: false });
        }
    },
    componentDidMount: function() {
        var self = this,
            clipboard = new Clipboard(self.refs.copyUrl);
            clipboard.on('success', e => {
                // Set the tooltip to reflect successful copy.
                self.props.setTooltipText('action.textCopied');
                e.clearSelection();
            });
            clipboard.on('error', e => {
                // Ask the user to Ctrl-C.
                self.props.setTooltipText('action.textSelected');
            });
        ;
        ReactTooltip.rebuild();
    },
    render: function(){
        var self = this,
            collectionClassName = self.props.isMobile ? 'xxOverlay xxOverlay--light xxOverlay--spaced' : 'xxCollectionAction'
        ;
        return (
            <div className={collectionClassName}>
                <h2 className="xxTitle">{T.get('copy.share.main')}</h2>
                {
                    self.props.isMobile ? (
                        <div 
                            className="xxOverlay-close"
                            data-action-label="info"
                            onClick={self.handleBackClick}>
                        </div>
                    ) : null
                }
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
                <div className="xxText">
                    <p>{T.get('copy.share.description')}</p>
                </div>
                <div className="xxFormField">
                    <label
                        className="xxLabel"
                        htmlFor="xx-share-link"
                    >{T.get('copy.share.label')}</label>
                    {
                        self.state.isLoading ? <LoadingText /> : (
                            <input
                                className="xxInputText"
                                id={"xx-share-link" + self.props.videoId}
                                type="text"
                                value={self.state.shareUrl}
                                readOnly
                            />
                        )
                    }
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
                        data-clipboard-target={"#xx-share-link" + self.props.videoId}
                        value={self.state.shareUrl}
                        ref="copyUrl"
                        type="button"
                        data-for="settableTooltip"
                        data-tip
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
    sendFacebookShare: function() {
        var self = this,  
            url = UTILS.SHARE_LINK_FACEBOOK + objectToGetParams({ 
                u: self.state.shareUrl,
                title: T.get('copy.share.title'),
                quote: T.get('copy.share.facebook')
            })
        ;
        windowOpen(url);
        TRACKING.sendEvent(self, arguments, 'facebook');
    },
    sendTwitterShare: function() {
        var self = this,  
            hashtags = [],
            url = UTILS.SHARE_LINK_TWITTER + objectToGetParams({
                url: self.state.shareUrl,
                text: T.get('copy.share.twitter')
            })
        ;
        windowOpen(url);
        TRACKING.sendEvent(self, arguments, 'twitter');
    },
    sendLinkedinShare: function() {
        var self = this,  
            url = UTILS.SHARE_LINK_LINKEDIN + objectToGetParams({ 
                url: self.state.shareUrl, 
                title: T.get('copy.share.title'), 
                summary: T.get('copy.share.linkedin') 
            })
        ;
        windowOpen(url);
        TRACKING.sendEvent(self, arguments, 'linkedin');
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ShareLink

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
