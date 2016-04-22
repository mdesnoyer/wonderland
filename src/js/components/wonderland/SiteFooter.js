// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import {Link} from 'react-router';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const CONFIG = require('json../../../env/config.json');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SiteFooter = React.createClass({
    render: function() {
        return (
            <footer className="footer wonderland-banner wonderland-banner--footer">
                <div className="container">
                    <div className="content has-text-centered">
                        <p>{T.get('copy.copyright', {'@name': T.get('app.companyLongName')})}</p>
                        <p><Link activeClassName="wonderland-active" to="/terms/">{T.get('nav.terms')}</Link> | <a href={UTILS.CONTACT_EXTERNAL_URL}>{T.get('nav.contact')}</a></p>
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
