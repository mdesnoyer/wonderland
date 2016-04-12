// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import {Link} from 'react-router';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const CONFIG = require('json../../../env/config.json');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SiteFooter = React.createClass({
    render: function() {
        return (
            <div>
                <footer className="footer wonderland-banner">
                    <div className="container">
                        <div className="content is-text-centered">
                            <p>{T.get('copy.copyright', {'@name': T.get('app.companyLongName')})}</p>
                            <p><Link activeClassName="active" to="/terms/">{T.get('nav.terms')}</Link> | <Link activeClassName="active" to="/contact/">{T.get('nav.contact')}</Link></p>
                            <p>{CONFIG.LABEL}</p>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SiteFooter;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
