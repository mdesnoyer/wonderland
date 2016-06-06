// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import {Link} from 'react-router';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import SiteNavigation from '../wonderland/SiteNavigation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SiteFooter = React.createClass({
	// mixins: [ReactDebugMixin],
    render: function() {
        return (
            <footer className="footer wonderland-banner wonderland-banner--footer">
                <div className="container">
                    <div className="content has-text-centered">
                        <p>{T.get('copy.copyright', {'@name': T.get('app.companyLongName')})}</p>
                        <SiteNavigation pos="bottom" />
                        <span dangerouslySetInnerHTML={{__html: '<!-- ' + T.get('app.appName') + ' v' + UTILS.VERSION + '.' + CONFIG.LABEL + ' -->'}} />
                    </div>
                </div>
            </footer>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SiteFooter;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
