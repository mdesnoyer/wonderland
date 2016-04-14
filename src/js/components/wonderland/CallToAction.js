// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var CallToAction = React.createClass({
    render: function() {
        var self = this;
        return (
                <div className="control">
                    <a className="button is-primary" href="/contact/">{T.get('contact')}</a>
                </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default CallToAction;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
