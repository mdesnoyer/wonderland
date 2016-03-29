// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import T from '../../translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var SiteFooter = React.createClass({
    render: function() {
        return (
            <div>
                <footer className="footer wonderland-banner">
                    <div className="container">
                        <div className="content is-text-centered">
                            <p>&copy; 2016 Neon Labs, Inc. All rights reserved.<br />Current locale is {T.getLocale()}</p>
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
