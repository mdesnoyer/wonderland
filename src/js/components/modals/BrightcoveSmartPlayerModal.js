// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var BrightcoveSmartPlayerModal = React.createClass({
    render: function() {
        return (
            <section className="box wonderland-box is-desktop">
                <div className="content">
                    <h1 className="title is-4">Legacy Smart Player</h1>
                    <p>To configure a legacy Smart Player, you must add the Neon Telemetry Player URL to each player in your Brightcove account.</p>
                    <ol>
                        <li>Copy the Neon Telemetry Player URL to the plugin</li>
                        <li>Log in to your Brightcove Account</li>
                        <li>Go to <a href="https://videocloud.brightcove.com/publishing" rel="external">https://videocloud.brightcove.com/publishing</a></li>
                        <li>For each player you want to add the plugin to
                            <ol>
                                <li>Click Settings</li>
                                <li>In the resulting window, click &ldquo;Plug-ins&rdquo;</li>
                                <li>Paste the Neon Telemetry Plugin URL to URL bar</li>
                                <li>Click &ldquo;Add&rdquo;</li>
                            </ol>
                        </li>
                    </ol>
                    {/*<figure className="image wonderland-image">
                        <img src="/img/brightcoveNewPlayerModal.png" alt="" title="" />
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
