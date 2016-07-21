// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import T from '../../modules/translation';
import TRACKING from '../../modules/tracking';
import AjaxMixin from '../../mixins/Ajax';
import UTILS from '../../modules/utils';
import { windowOpen, objectToGetParams } from '../../modules/sharing';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var ShareLink = React.createClass({
    mixins: [AjaxMixin],
    getInitialState: function() {
        var self = this;
        return {
            shareUrl: self.props.shareUrl
        }
    },
    componentWillMount: function() {
        var self = this;
        UTILS.shortenUrl(self.state.shareUrl, self.handleUrlCallback);
    },
    handleUrlCallback: function(response) {
        var self = this;
        if (response.status_code === 200) {
            self.setState({
                shareUrl: response.data.url
            });
        }
    },
    componentDidMount: function() {
        var self = this,
            c = new Clipboard(self.refs.copyUrl)
        ;
    },
    render: function(){
        var self = this;
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
                        value={self.state.shareUrl}
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
                        data-clipboard-text={self.state.shareUrl}
                        value={self.state.shareUrl}
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
    sendFacebookShare: function() {
        var self = this,  
            url = UTILS.SHARE_LINK_FACEBOOK + objectToGetParams({ 
                u: self.state.shareUrl,
                title: T.get('copy.share.title'),
                quote: T.get('copy.share.facebook')
            })
        ;
        windowOpen(url);
        TRACKING.sendEvent(self, arguments, self.props.videoId);
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
        TRACKING.sendEvent(self, arguments, self.props.videoId);
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
        TRACKING.sendEvent(self, arguments, self.props.videoId);
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ShareLink

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
