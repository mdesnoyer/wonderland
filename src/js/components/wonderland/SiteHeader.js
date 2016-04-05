// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import NewsFlash from './NewsFlash';
import SiteBanner from './SiteBanner';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var SiteHeader = React.createClass({
    render: function() {
    	var newsFlashMessage = T.get('copy.newsFlashMessage')
        return (
            <div>
                <NewsFlash message={newsFlashMessage}/>
                <SiteBanner />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default SiteHeader;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
