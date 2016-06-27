// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import NewsFlash from './NewsFlash';
import SiteBanner from './SiteBanner';
import AccountMasqueradeBar from './AccountMasqueradeBar';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SiteHeader = React.createClass({
    // mixins: [ReactDebugMixin],
    render: function() {
        var self = this, 
            newsFlashMessage = T.get('copy.newsFlashMessage')
        ;
        return (
            <div>
                <NewsFlash message={newsFlashMessage} isActive={false} />
                <AccountMasqueradeBar />
                <SiteBanner setOverlayContent={self.props.setOverlayContent}/>
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SiteHeader;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
