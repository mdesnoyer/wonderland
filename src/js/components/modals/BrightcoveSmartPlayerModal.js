// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import BrightcoveSmartPlayerContent from '../static/BrightcoveSmartPlayerContent';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var BrightcoveSmartPlayerModal = React.createClass({
    render: function() {
        return (
            <section className="box wonderland-box is-desktop">
                <div className="content">
                    <h1>Legacy Smart Player</h1>
                    <p>To configure a legacy Smart Player, you must add the Neon Telemetry Player URL to each player in your Brightcove account.</p>
                    <BrightcoveSmartPlayerContent />
                    {/*<figure className="image wonderland-image">
                        <img src="/img/brightcoveNewPlayerModal.png" />
                    </figure>*/}

                    {/*<p>(note, where will the Telemetry URL appear during this flow? Will they be able to copy the URL on the page where they clicked the question mark to open this modal? point 1 above can be updated with this information.)</p>*/}
                    {/*<p>(also note, you might want to change the text of the question on the main plugins page to say something like "Do you use the legacy Smart Player?&rdquo; and in smaller text below it: &ldquo;If you do, please follow these instructions to add the Neon Telemetry Player Plugin to your players: [link to legacy player instructions in the brightcove guide on our support page]</p>*/}
                </div>
            </section>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default BrightcoveSmartPlayerModal;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
