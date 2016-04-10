// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var SiteFooter = React.createClass({
    render: function() {
        return (
            <div>
                <footer className="footer wonderland-banner">
                    <div className="container">
                        <div className="content is-text-centered">
                            <p>{T.get('copy.copyright', {'@name': T.get('app.companyFullName')})}</p>
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
