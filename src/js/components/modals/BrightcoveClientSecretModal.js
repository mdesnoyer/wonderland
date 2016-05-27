// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var BrightcoveSecretIdModal = React.createClass({
    render: function() {
        return (
            <section className="box wonderland-box hero is-desktop">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title is-4">
                            Brightcove Video Cloud API Authentication Credentials
                        </h1>
                        <div className="content">
                            <p>In order to set up your API authentication credentials, go to the <a href="https://studio.brightcove.com/products/videocloud/admin/oauthsettings" rel="external">API Authentication</a> page in your Brightcove account.</p>
                            <ol>
                                <li>Click &ldquo;Register New Application&rdquo;</li>
                                <li>Enter &ldquo;Neon&rdquo; in the name field</li>
                                <li>Select the following permissions:
                                    <div className='box'>
                                        <img src="/img/brightcovepermissions.png" alt="" title="" />
                                    </div>
                                </li>
                                <li>Click &ldquo;Save&rdquo;</li>
                                <li>A window will appear with your Client ID and Client Secret. Copy these values into the Neon plugin configuration page, which you can access by clicking on the gear in your Neon account and selecting Plugins.</li>
                            </ol>
                            <p>For more information about managing your API authentication in Brightcove, see Brightcove&rsquo;s documentation <a href="https://support.brightcove.com/en/video-cloud/docs/managing-api-authentication-credentials" rel="external">here</a>.</p>
                            <p>Learn about why we need these permissions <a href="/support/#brightcove-plugin-guide">here</a>.</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default BrightcoveSecretIdModal;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

