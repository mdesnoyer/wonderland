// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var BrightcoveSmartPlayerModal = React.createClass({
    render: function() {
        return (
            <section className="box is-desktop">
              <h1 className="title is-4">Legacy Smart Player</h1>
                <p>To configure a legacy Smart Player, you must add the Neon Telemetry Player URL to each player in your Brightcove account.</p>
                <ol>
                    <li>Visit the Plugin page in your Neon UI</li>
                    <li>Answer &ldquo;yes&rdquo; to &ldquo;Do you use the Smart Player?&rdquo;</li>
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
            </section>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default BrightcoveSmartPlayerModal;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
