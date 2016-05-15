// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var BrightcoveClientIdModal = React.createClass({
    render: function() {
        return (
            <section className="box is-desktop">
                <h1 className="title is-4">
                    Brightcove Video Cloud API Authentication Credentials
                </h1>
                <h4 className="title is-5"></h4>
                <p>In order to set up your API authentication credentials, go to the <a href="https://studio.brightcove.com/products/videocloud/admin/oauthsettings" rel="external">API Authentication</a> page in your Brightcove account.</p>
                <ol className="content">
                    <li>Click &ldquo;Register New Application&rdquo;</li>
                    <li>Enter &ldquo;Neon&rdquo; in the name field</li>
                    <li>Select the following permissions:
                        <ul>
                            <li>CMS
                                <ul>
                                    <li>Notifications</li>
                                    <li>Video Read</li>
                                    <li>Video Read/Write</li>
                                </ul>
                            </li>
                            <li>Players
                                <ul>
                                    <li>Read</li>
                                    <li>Read/Write</li>
                                </ul>
                            </li>
                            <li>Dynamic Ingest
                                <ul>
                                    <li>Create</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>Click &ldquo;Save&rdquo;</li>
                    <li>A window will appear with your Client ID and Client Secret. Copy these values into the Neon plugin configuration page, which you can access by clicking on the gear in your Neon account and selecting Plugins.</li>
                </ol>
                <p>For more information about managing your API authentication in Brightcove, see Brightcove&rsquo;s documentation <a href="https://support.brightcove.com/en/video-cloud/docs/managing-api-authentication-credentials" rel="external">here</a>.</p>
                <p>Learn about why we need these permissions here. (this should link to the “Why do we need these permissions?” section in the Brightcove plugin guide on our Support page.)</p>
            </section>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default BrightcoveClientIdModal;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
