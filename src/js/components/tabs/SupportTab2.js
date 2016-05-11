// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var SupportTab2 = React.createClass({
    render: function() {
        var self = this;
        return (
            <section className="content">

                <h2 className="title is-3">Brightcove Plugin Guide</h2>
                <p>Neon can be seamlessly connected to a Brightcove Video Cloud account without the help of a developer. Configuration and management of this plugin are available in the Gear &gt; <a href={UTILS.DRY_NAV.PLUGINS.URL}>Plugins</a> of your Neon account.</p>
                <p>In four quick steps, you can have Neon thumbnails on your site.</p>
                <ol>
                    <li>Link your Brightcove account</li>
                    <li>Enable image serving</li>
                    <li>Enable telemetry from your players</li>
                    <li>Enable telemetry from your site</li>
                </ol>
                <p>The easiest way to integrate your Neon account and your Brightcove account is by using Neon&rsquo;s plugins wizard, which you can access at any time by clicking on the Plugins tab and then &ldquo;Add Plugin&rdquo; in your Neon account. The wizard will guide you through the integration process step-by-step.</p>
                <p>If you want more information about what&rsquo;s happening at each step, or if you want to manage your plugin settings without using the wizard, you can read the guide below.</p>
                
                <h3 className="title is-4">1. Link Your Brightcove Account</h3>
                <p>To give Neon access to your Brightcove Video Cloud account, you&rsquo;ll need to have your Video Cloud Account ID and API authentication credentials on hand.</p>

                <h4 className="title is-5">Brightcove Video Cloud Account ID</h4>
                <p>You can locate your Video Cloud Account ID on the <a rel="external" href="https://studio.brightcove.com/products/videocloud/admin/accountsettings">Account Information</a> page in your Brightcove account. Your Account ID will look similar to this:</p>
                <figure className="image wonderland-image">
                    <img src="/img/support/brightcove/1-account-id.png" alt="" title="" />
                </figure>
                <p>Enter your Account ID into the plugins page in your Neon account. You can access this page by clicking on the gear and then Plugins in your Neon account.</p>
                {/*<p className="TODO">TODO - add screenshot here when UI is updated</p>*/}

                <h4 className="title is-5">Brightcove Video Cloud API Authentication Credentials</h4>
                <p>In order to set up your API authentication credentials, go to the <a href="https://studio.brightcove.com/products/videocloud/admin/oauthsettings" rel="external">API Authentication</a> page in your Brightcove account.</p>
                <ol>
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

                <h4 className="title is-5">Why do we need these permissions?</h4>
                <p>In order to provide you with the best service, Neon needs access to the following permissions in your Brightcove account:</p>
                <ul>
                    <li>Notifications
                        <ul>
                            <li>This allows us to respond to an updated video quickly.</li>
                        </ul>
                    </li>
                    <li>Video Read
                        <ul>
                            <li>This allows us to ingest videos with their existing thumbnails.</li>
                        </ul>
                    </li>
                    <li>Video Write
                        <ul>
                            <li>This allows us to push the serving URL into your Brightcove account. The serving URL lets Neon serve images and run realtime optimization directly on your site. As long as you already use the Brightcove Media API to define which video thumbnails are displayed for your videos, then no dev work is required on your end. Using the Brightcove Media API is the default setting for Video Cloud customers.</li>
                        </ul>
                    </li>
                    <li>Player Read
                        <ul>
                            <li>This allows us to see the details of your player(s) so we can help you configure the Neon Telemetry Player Plugin.</li>
                        </ul>
                    </li>
                    <li>Player Write
                        <ul>
                            <li>This allows us to help you configure your player(s) with the Neon Telemetry Player Plugin.</li>
                        </ul>
                    </li>
                    <li>Dynamic Ingest
                        <ul>
                            <li>This allows us to push images into your Brightcove account</li>
                        </ul>
                    </li>
                </ul>

                <h3 className="title is-4">2. Enable Image Serving</h3>
                <p>Once you&rsquo;ve entered your Brightcove Account ID and API credentials into your Neon account, you&rsquo;re ready to move onto the next step. In this step, you&rsquo;ll ensure that Neon is able to serve images onto your site and perform realtime optimization.</p>
                <p>To enable this functionality, you must specify our serving URL as the source of the thumbnail to display on your page. The serving URL will cause different images to be seen by different users, enabling the realtime optimization.  As a Brightcove customer, you might already be using the Brightcove Media API to determine which image to show on your site. If that is the case, you can skip this step and move on to the next step. If you&rsquo;re a Gallery customer, the default is to use the <a href="http://docs.brightcove.com/en/video-cloud/media/guides/quick-start.html" rel="external">Brightcove Media API</a>.</p>
                <p>If you do not use the Brightcove Media API to determine the thumbnails shown on your site, then you must insert our serving URLs directly. Please see the image serving documentation for more details.</p>

                <h3 className="title is-4">3. Enable Telemetry from Your Players</h3>
                <p>During this step, you&rsquo;ll add the Neon Telemetry Player plugin to your video players. This will allow us to understand how your video thumbnails are performing on your site, optimize your thumbnails in real time, and provide you with analytics about your thumbnail performance.</p>
                <p>You&rsquo;ll likely be using one of Brightcove&rsquo;s two types of players: the legacy <a href="https://support.brightcove.com/en/video-cloud/docs/delivering-video-html5-and-smart-players" rel="external">Smart Player</a> or the new <a href="https://support.brightcove.com/en/video-cloud/docs/what-new-brightcove-player" rel="external">Brightcove Player</a>. The process for installing the Neon plugin is different for each player.</p>
                
                <h4 className="title is-5">New Brightcove Player</h4>
                <p>To add the Neon Telemetry Player plugin to your Brightcove players, visit the Brightcove plugin settings page in your Neon UI and answer &ldquo;yes&rdquo; to &ldquo;Do you use the new Brightcove Player?&rdquo;</p>
                {/*<p className="TODO">TODO - insert picture</p>.*/}
                <p>You will now see a list of all the Brightcove Players in your account. Click &ldquo;enable&rdquo; to add the Neon plugin to each player that you would like to receive analytics from.</p>
                {/*<p className="TODO">TODO insert picture from our UI</p>*/}

                <h4 className="title is-5">Legacy Smart Player</h4>
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

                <h3 className="title is-4">4. Enable Telemetry from Your Site</h3>
                <p>Neon can receive telemetry from your players using the Neon Telemetry Player plugins for those players. Telemetry is the stream of data that tells us how users are interacting with your images and video, allowing us to ensure that your best images are always representing your content. The process for enabling telemetry for your players is covered in step 3 above. However, if you show thumbnails outside of your player, you must add the Neon Telemetry Tag to your site. If you&rsquo;re a Gallery customer, you must complete this step in order to get accurate data from Neon. If you have a self-managed site, you should complete this step if you show thumbnails outside of your player. For example, a common way to show thumbnails outside of your player is to show a video thumbnail on your homepage that, when clicked, takes the user to an article page that contains the video whose thumbnail was clicked on the homepage. You can find your customized tag in your Neon account by clicking the gear and selecting Telemetry.</p>
                
                <h4 className="title is-5">Self-managed site</h4>
                <p>Your Telemetry Tag can be added to your site using any tag manager (e.g. <a href="http://tealium.com/" rel="external">Tealium</a>, <a href="https://www.google.com/analytics/tag-manager/" rel="external">Google Tag Manager</a>, etc), or by adding it directly to the pages on your site that contain video thumbnail images you want to optimize.</p>
                
                <h4 className="title is-5">Gallery</h4>
                <p>To insert the Telemetry Tag into your Gallery site:</p>
                <ol>
                    <li>Log in to your Brightcove Account</li>
                    <li>Navigate to your Gallery settings</li>
                    <li>Select &ldquo;Header&rdquo;</li>
                    <li>Paste the Telemetry Tag into the Custom Header HTML field</li>
                </ol>
            </section>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SupportTab2;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
