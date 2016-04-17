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
            <div>
                <footer className="footer wonderland-banner wonderland-banner--footer">
                    <div className="container">
                        <div className="content is-text-centered">
                            <p>{T.get('copy.copyright', {'@name': T.get('app.companyLongName')})}</p>
                            <p><Link activeClassName="wonderland-active" to="/terms/">{T.get('nav.terms')}</Link> | <a href={UTILS.CONTACT_EXTERNAL_URL}>{T.get('nav.contact')}</a></p>
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
