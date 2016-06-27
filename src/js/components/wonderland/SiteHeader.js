// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import NewsFlash from './NewsFlash';
import SiteBanner from './SiteBanner';
import AccountMasqueradeBar from './AccountMasqueradeBar';
import T from '../../modules/translation';
import PageOverlay from '../../MM-Restyle/PageOverlay';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SiteHeader = React.createClass({
    // mixins: [ReactDebugMixin],
    getInitialState: function() {
        return {
            overlayOpen: false,
            overlayContent: '' // learnMore, contact, signIn, signUp, account 
        }
    },
    setOverlayContent: function(content) {
        var self = this;
        self.setState({
            overlayOpen: true,
            overlayContent: content
        });
    },
    closeOverlay: function() {
        var self = this;
        self.setState({
            overlayOpen: false
        });
    },
    render: function() {
        var self = this, 
            newsFlashMessage = T.get('copy.newsFlashMessage')
        ;
        return (
            <div>
                <NewsFlash message={newsFlashMessage} isActive={false} />
                <AccountMasqueradeBar />
                <SiteBanner overlayOpen={self.state.overlayOpen} setOverlayContent={self.setOverlayContent}/>
                <PageOverlay 
                    overlayOpen={self.state.overlayOpen}
                    overlayContent={self.state.overlayContent}
                    closeOverlay={self.closeOverlay}
                />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SiteHeader;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
