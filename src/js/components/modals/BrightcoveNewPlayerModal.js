// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var BrightcoveNewPlayerModal = React.createClass({
    render: function() {
        return (
            <section className="box is-desktop">
            <h1 className="title is-5">Do you use the new Brightcove Player?</h1>
            <p>If you use the new Brightcove HTML5 player, click "yes" and then enable the Neon plugin for each player you would like to receive analytics from.</p>
            </section>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default BrightcoveNewPlayerModal;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
