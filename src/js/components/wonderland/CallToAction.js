// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var CallToAction = React.createClass({
    render: function() {
        var self = this;
        return (
            <div className="control">
                <a className="button is-primary" href={UTILS.CONTACT_EXTERNAL_URL}>{T.get('nav.contact')}</a>
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default CallToAction;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
