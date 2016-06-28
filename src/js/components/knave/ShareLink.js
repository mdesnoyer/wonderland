// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var ShareLink = React.createClass({
    componentDidMount: function() {
        var self = this,
            c = new Clipboard(self.refs.copyUrl)
        ;
    },
    render: function(){
        var self = this;
        return (
            <div className="xxCollectionAction">
                <h2 className="xxTitle">{T.get('share')}</h2>
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
                <p>{T.get('copy.videoContent.share')}</p>
                <div className="xxFormField">
                    <label
                        className="xxLabel"
                        htmlFor="xx-share-link"
                    >Collection Link</label>
                    <input
                        className="xxInputText"
                        id="xx-share-link"
                        type="text"
                        value="https://demo.neon-lab.com/zX78xg"
                        data-clipboard-text="https://demo.neon-lab.com/zX78xg"
                        ref="copyUrl"
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
                        type="button"
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
    //PLACE HOLDER FOR URL IS GOOGLE.COM for current version.
    sendFacebookShare: function() {
    	alert('TODO');
    },
    sendTwitterShare: function() {
    	alert('TODO');
    },
    sendLinkedinShare: function() {
    	alert('TODO');
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ShareLink;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -