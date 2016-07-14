// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import T from '../../modules/translation';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';
import Secured from '../../mixins/Secured';
import Account from '../../mixins/Account';
import AjaxMixin from '../../mixins/Ajax';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var TelemetryPage = React.createClass({
    mixins: [Secured, Account, AjaxMixin],
    getInitialState: function () {
        return {
            snippetElement: '',
            isBrightCoveGalleryIntegration: false
        };
    },
    componentDidMount: function() {
        var self = this;
        self.GET('telemetry/snippet')
            .then(function(snippet) {
                self.setState({
                    isBrightCoveGalleryIntegration: (snippet.indexOf('neonBrightcoveGallery') > -1), // YUCK!
                    snippetElement: snippet
                })
            })
            .catch(function(err) {
                console.log(err);
            })
        ;
    },
    render: function() {
        var self = this;
        return (
            <div>
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.telemetry.title'))}
                />
                <SiteHeader />
                <section className="wonderland-section section">
                    <div className="container">
                        <h1>{T.get('copy.telemetry.heading')}</h1>

                        <div className={'content' + (self.state.isBrightCoveGalleryIntegration ? '' : ' is-hidden')}>
                            <h2>Brightcove Gallery integration</h2>
                            <p>Inserting the Neon Telemetry Tag into your site allows us to understand how your users are interacting with images across your site. Our technology uses this anonymized data to ensure that your most effective images are always representing your content. Below, you can find your custom Neon Telemetry Tag, instructions for how to insert the Telemetry Tag into your Gallery site, and a status indicator to let you know whether the Telemetry Tag is working properly.</p>
                            <h3>Your custom Neon Telemetry Tag</h3>
                            <textarea
                                readOnly
                                className="textarea"
                                value={self.state.snippetElement}
                            >
                            </textarea>
                            {/*Last active on your site: [auto updated with date and time to reflect when we last saw data from their site via this tag; if we’ve never seen data from this tag, then it should say "Never"]*/}
                            <h3>Insert the Telemetry Tag</h3>
                            <p>To insert the Telemetry Tag into your Gallery site:</p>
                            <ol>
                                <li>Log in to your Brightcove Account</li>
                                <li>Navigate to your <a href="https://studio.brightcove.com/products/videocloud/gallery#settings" rel="external">Gallery settings</a></li>
                                <li>Select &ldquo;Settings&rdquo;</li>
                                <li>Paste the <a href={UTILS.DRY_NAV.TELEMETRY.URL}>Telemetry Tag</a> into the &ldquo;Custom Footer HTML&rdquo; field</li>
                            </ol>
                        </div>
                        
                        <div className={'content' + (!self.state.isBrightCoveGalleryIntegration ? '' : ' is-hidden')}>
                            <h2>Other Integrations</h2>

                            <p>Inserting the Neon Telemetry Tag into your site allows us to understand how your users are interacting with images across your site. Our technology uses this anonymized data to ensure that your most effective images are always representing your content. Below, you can find your custom Neon Telemetry Tag, instructions for how to insert the Telemetry Tag into your site, and a status indicator to let you know whether the Telemetry Tag is working properly.</p> 

                            <h3>Your custom Neon Telemetry Tag</h3>
                            <textarea
                                readOnly
                                className="textarea"
                                value={self.state.snippetElement}
                            >
                            </textarea>
                            {/*Last active on your site: [auto updated with date and time to reflect when we last saw data from their site via this tag; if we’ve never seen data from this tag, then it should say "Never"]*/}

                            <h3>Insert the Telemetry Tag</h3>
                            <p>To use this tag, your site must meet the following two criteria:</p>
                            <p>1. Your thumbnails are inside an anchor tag. Each thumbnail can be either an img tag or a background-image CSS property. For example:</p>
<pre className="wonderland-pre"><code>{`<a href="http://www.mysite.com/play_video1">
    <img src="http://i3.neon-images.com/v1/client/1234/neonvid_video1.jpg" />
</a>`}</code></pre>
                            <p>Or</p>
<pre className="wonderland-pre"><code>{`<a href="http://www.mysite.com/play_video1">
    <div style="background-image: url('http://i3.neon-images.com/v1/client/1234/neonvid_video1.jpg');"></div>
</a>`}</code></pre>
                            <p>2. Any click that causes the video to play resolves to the same location as the destination of the above anchor tag.</p>
                            <p>If your site meets these two criteria, you can simply add your custom Neon Telemetry Tag to your site using any tag manager (e.g. <a href="http://tealium.com/" rel="external">Tealium</a>, <a href="https://www.google.com/analytics/tag-manager/" rel="external">Google Tag Manager</a>, etc), or add it directly to your webpages.</p>
                            <p>If your site does not conform to the the two requirements above, then you can also send beacons describing the events of your user as they move through your site and interact with imagery. For more information, see the <a href="/support/#custom-plugin-guide">Custom Implementation Guide</a>.</p>
                        </div>
                    </div>
                </section>
                <SiteFooter />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default TelemetryPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
