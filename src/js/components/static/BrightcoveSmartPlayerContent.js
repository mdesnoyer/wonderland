// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var BrightcoveSmartPlayerContent = React.createClass({
    render: function() {
        return(
            <ol className="simple-ol-list">
                <li>Copy the Neon Telemetry Player URL to the plugin</li>
                <li>Log in to your Brightcove Account</li>
                <li>Go to <a href="https://videocloud.brightcove.com/publishing" rel="external">https://videocloud.brightcove.com/publishing</a></li>
                <li>For each player you want to add the plugin to
                    <ol className="simple-ol-list">
                        <li>Click Settings</li>
                        <li>In the resulting window, click &ldquo;Plug-ins&rdquo;</li>
                        <li>Paste the Neon Telemetry Plugin URL to URL bar</li>
                        <li>Click &ldquo;Add&rdquo;</li>
                    </ol>
                </li>
            </ol>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default BrightcoveSmartPlayerContent;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -