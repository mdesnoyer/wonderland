// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SupportTab4 = React.createClass({
    render: function() {
        var self = this;
        return (
            <section className="xxText">
                <h1 className="xxCollection-title">Reference</h1>
                <p>You can access more information about our APIs and read our API documentation at <a href="http://api.docs.neon-lab.com/" rel="external">api.docs.neon-lab.com</a></p>
            </section>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SupportTab4;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
