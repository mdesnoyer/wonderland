// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import BrightcoveAccountIdContent from '../static/BrightcoveAccountIdContent';
import BrightcoveClientIdContent from '../static/BrightcoveClientIdContent';
import BrightcoveSmartPlayerContent from '../static/BrightcoveSmartPlayerContent';
import BrightcoveThumbnailContent from '../static/BrightcoveThumbnailContent';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SupportTab2 = React.createClass({
    render: function() {
        var self = this;
        return (
            <section className="content">

                <h2>Brightcove Plugin Guide</h2>
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

                <h3>1. Link Your Brightcove Account</h3>
                <p>To give Neon access to your Brightcove Video Cloud account, you&rsquo;ll need to have your Video Cloud Account ID and API authentication credentials on hand.</p>

                <BrightcoveAccountIdContent />
                <p>Enter your Account ID into the plugins page in your Neon account. You can access this page by clicking on the gear and then Plugins in your Neon account.</p>
                {/*<p className="TODO">TODO - add screenshot here when UI is updated</p>*/}

                <BrightcoveClientIdContent />

                <h4>Why do we need these permissions?</h4>
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

                <h3>2. Enable Image Serving</h3>
                <p>Once you&rsquo;ve entered your Brightcove Account ID and API credentials into your Neon account, you&rsquo;re ready to move onto the next step. In this step, you&rsquo;ll ensure that Neon is able to serve images onto your site and perform realtime optimization.</p>
                <BrightcoveThumbnailContent />

                <h3>3. Enable Telemetry from Your Players</h3>
                <p>During this step, you&rsquo;ll add the Neon Telemetry Player plugin to your video players. This will allow us to understand how your video thumbnails are performing on your site, optimize your thumbnails in real time, and provide you with analytics about your thumbnail performance.</p>
                <p>You&rsquo;ll likely be using one of Brightcove&rsquo;s two types of players: the legacy <a href="https://support.brightcove.com/en/video-cloud/docs/delivering-video-html5-and-smart-players" rel="external">Smart Player</a> or the new <a href="https://support.brightcove.com/en/video-cloud/docs/what-new-brightcove-player" rel="external">Brightcove Player</a>. The process for installing the Neon plugin is different for each player.</p>

                <h4>New Brightcove Player</h4>
                <p>To add the Neon Telemetry Player plugin to your Brightcove players, visit the Brightcove plugin settings page in your Neon UI and answer &ldquo;yes&rdquo; to &ldquo;Do you use the new Brightcove Player?&rdquo;</p>
                {/*<p className="TODO">TODO - insert picture</p>.*/}
                <p>You will now see a list of all the Brightcove Players in your account. Click &ldquo;enable&rdquo; to add the Neon plugin to each player that you would like to receive analytics from.</p>
                {/*<p className="TODO">TODO insert picture from our UI</p>*/}

                <h4>Legacy Smart Player</h4>
                <p>To configure a legacy Smart Player, you must add the Neon Telemetry Player URL to each player in your Brightcove account. Visit the Plugin page in your Neon UI and answer &ldquo;yes&rdquo; to &ldquo;Do you use the Smart Player?&rdquo;</p>
                <BrightcoveSmartPlayerContent />

                <h3>4. Enable Telemetry from Your Site</h3>
                <p>Neon can receive telemetry from your players using the Neon Telemetry Player plugins for those players. Telemetry is the stream of data that tells us how users are interacting with your images and video, allowing us to ensure that your best images are always representing your content. The process for enabling telemetry for your players is covered in step 3 above. However, if you show thumbnails outside of your player, you must add the Neon Telemetry Tag to your site. If you&rsquo;re a Gallery customer, you must complete this step in order to get accurate data from Neon. If you have a self-managed site, you should complete this step if you show thumbnails outside of your player. For example, a common way to show thumbnails outside of your player is to show a video thumbnail on your homepage that, when clicked, takes the user to an article page that contains the video whose thumbnail was clicked on the homepage. You can find your customized tag in your Neon account by clicking the gear and selecting <a href={UTILS.DRY_NAV.TELEMETRY.URL}>Telemetry</a>.</p>

                <h4>Self-managed site</h4>
                <p>Your <a href={UTILS.DRY_NAV.TELEMETRY.URL}>Telemetry Tag</a> can be added to your site using any tag manager (e.g. <a href="http://tealium.com/" rel="external">Tealium</a>, <a href="https://www.google.com/analytics/tag-manager/" rel="external">Google Tag Manager</a>, etc), or by adding it directly to the pages on your site that contain video thumbnail images you want to optimize.</p>

                <h4>Gallery</h4>
                <p>To insert the <a href={UTILS.DRY_NAV.TELEMETRY.URL}>Telemetry Tag</a> into your Gallery site:</p>
                <ol>
                    <li>Log in to your Brightcove Account</li>
                    <li>Navigate to your <a href="https://studio.brightcove.com/products/videocloud/gallery#settings" rel="external">Gallery settings</a></li>
                    <li>Select &ldquo;Settings&rdquo;</li>
                    <li>Paste the <a href={UTILS.DRY_NAV.TELEMETRY.URL}>Telemetry Tag</a> into the &ldquo;Custom Footer HTML&rdquo; field</li>
                </ol>
            </section>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SupportTab2;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
