// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import NewsFlash from './NewsFlash';
import SiteBanner from './SiteBanner';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var SiteHeader = React.createClass({
    render: function() {
        return (
            <div>
                <NewsFlash message="Note: Please be aware this is a V2 DEMO only and should not be shared yet. Thank you. Neon." />
                <SiteBanner />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default SiteHeader;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
