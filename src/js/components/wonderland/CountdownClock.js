// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var CountdownClock = React.createClass({
    render: function() {
        var self = this;
        return (
            <fieldset className={self.props.outerClass}>
                <label className={self.props.innerClass}>
                    {self.props.displayValue}
                </label>
            </fieldset>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default CountdownClock;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
