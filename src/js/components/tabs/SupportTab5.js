// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var SupportTab5 = React.createClass({
    render: function() {
        var self = this;
        return (
            <section className="content">
                <h2 className="title is-3">Contact Support</h2>
                <p>Have a question? You can get in touch with us at <a href="mailto:support@neon-lab.com">support@neon-lab.com</a></p>
            </section>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SupportTab5;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
