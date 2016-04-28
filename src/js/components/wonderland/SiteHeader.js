// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import ReactDebugMixin from 'react-debug-mixin';
import NewsFlash from './NewsFlash';
import SiteBanner from './SiteBanner';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var SiteHeader = React.createClass({
	mixins: [ReactDebugMixin],
    render: function() {
        var newsFlashMessage = T.get('copy.newsFlashMessage');
        return (
            <div>
                <NewsFlash message={newsFlashMessage} isActive={false} />
                <SiteBanner />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default SiteHeader;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
