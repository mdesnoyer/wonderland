// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var BrightcoveNewPlayerModal = React.createClass({
    render: function() {
        return (
            <section className="box is-desktop">
            <h1 className="title is-5">New Brightcove Player</h1>
            <p>To add the Neon Telemetry Player plugin to your Brightcove players, visit the Brightcove plugin settings page in your Neon UI and answer &ldquo;yes&rdquo; to &ldquo;Do you use the new Brightcove Player?&rdquo;</p>
            {/*<p className="TODO">TODO - insert picture</p>.*/}
            <p>You will now see a list of all the Brightcove Players in your account. Click &ldquo;enable&rdquo; to add the Neon plugin to each player that you would like to receive analytics from.</p>
            {/*<p className="TODO">TODO insert picture from our UI</p>*/}
            </section>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default BrightcoveNewPlayerModal;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
