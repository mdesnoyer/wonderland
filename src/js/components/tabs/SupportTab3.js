// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SupportTab3 = React.createClass({
    render: function() {
        var self = this;
        return (
            <section className="content">
                
                <h2 className="title is-3">Overview</h2>

                <p>If we have not yet created a plugin for your video and web platform, then you can always interface directly with our APIs. To successfully interface with our <a href="http://api.docs.neon-lab.com" rel="external">APIs</a>, there are three major integration points that need to be wired up:</p>
                <ol>
                    <li>Video Ingestion</li>
                    <li>Image Serving</li>
                    <li>Telemetry</li>
                </ol>

                <h3 className="title is-4">1. Video Ingestion</h3>
                
                <p>When you are ready for Neon to analyze a video, you can use Neon&rsquo;s CMS API to submit that video. The video must be available at a publicly accessible URL. Our servers will download that video, analyze it, and send you a callback when the job is complete. To submit a video, send a POST request to:</p>

<pre className="wonderland-pre"><code>{`https://services.neon-lab.com/api/v2/{account_id}/videos`}</code></pre>

                <p>The body of the request must be a JSON object. For example:</p>

<pre className="wonderland-pre"><code>{`{
    "external_video_ref": "video1",
    "url" : "http://video_repo.com/myvideo.mp4",
    "callback_url" : "http://myserver.com/neon"
}`}</code></pre>

                <p>Additional options for this call are detailed in the <a href="http://api.docs.neon-lab.com/cmsapiv2_public.html#!/videos/post_account_id_videos" rel="external">reference manual</a>.</p>
                <p>When the video is has finished, a PUT request will be sent to callback_url. Details about the callbacks are available in the callbacks section below.</p>

                <h3 className="title is-4">2. Image Serving</h3>
                <p>Neon will serve images onto your site and perform realtime optimization. In order to effectively optimize your video thumbnails, different users on your site will see different images via 302 redirect to the correct image asset. To enable this functionality, you must insert the Neon serving URL for the video on your site in place of your existing thumbnail.</p>
                <p>WARNING: In order to serve images on your site at scale, our system needs to have the images available at our edge servers. This takes approximately 5-10 minutes after the video has been analyzed. Therefore, you must ensure that the video is in the serving state before inserting the serving URL onto your site. If you submitted the video with a callback_url, then you will receive a callback when the video is ready to serve. Otherwise, you can poll the video state by sending a GET request to the /videos endpoint of the CMS API.</p>
                <p>The serving URL to insert is available in the callback section below or by sending a GET request to the /videos endpoint of the CMS API. By default the image size will be 160x90 pixels, however, the following extra query parameters can be added to the serving URL in order to render an image in custom sizes:</p>

                <ul>
                    <li><strong>height</strong> - Height in pixels of the image to serve</li>
                    <li><strong>width</strong> - Width in pixels of the image to serve</li>
                </ul>

                <p>A resulting URL will look like:</p>

<pre className="wonderland-pre"><code>{`http://i2.neon-images.com/v1/client/12345/neonvid_video1.jpg?height=90&width=160`}</code></pre>

                <h3 className="title is-4">3. Telemetry</h3>
                <p>After serving different images to different users, we use telemetry from your site to measure which images are most effective. This allows you to measure the impact of better thumbnails, as well as ensure that you always have the most effective thumbnails live on your site.</p>
                
                <h4 className="title is-5">Using Neon&rsquo;s Telemetry Tag</h4>
                <p>Neon has created a telemetry tag that will provide the necessary telemetry from most sites. To use this tag, your site must meet the following two criteria:</p>

                <h5 className="title is-6">1. Your thumbnails are inside an anchor tag. Each thumbnail can be either an img tag or a background-image css property. For example:</h5>

<pre className="wonderland-pre"><code>{`<a href="http://www.mysite.com/play_video1">
    <img src="http://i3.neon-images.com/v1/client/1234/neonvid_video1.jpg" />
</a>`}</code></pre>

                <p>Or</p>

<pre className="wonderland-pre"><code>{`<a href="http://www.mysite.com/play_video1">
    <div style="background-image: url('http://i3.neon-images.com/v1/client/1234/neonvid_video1.jpg');"></div>
</a>`}</code></pre>

                <h5 className="title is-6">2. Any click that causes the video to play resolves to the same location as the destination of the above anchor tag.</h5>

                <p>Your customized tag is available in your Neon UI by clicking the gear and clicking &ldquo;Telemetry&rdquo;. The tag is a single line of JavaScript that can be added to your site using any tag manager (e.g. <a href="http://tealium.com/" rel="external">Tealium</a>, <a href="https://www.google.com/analytics/tag-manager/" rel="external">Google Tag Manager</a>, etc), or by adding it directly to your pages.</p>

                <h4 className="title is-5">Sending Your Own Beacons</h4>

                <p>If your site does not conform to the requirements for the standard Neon Telemetry Tag, then you can also send beacons describing the events of your user as he/she moves through your site and interacts with imagery. The specifications for the beacons are available in the <a href={UTILS.DRY_NAV.API.URL}>API reference manual</a>.</p>
                
                <h4 className="title is-5">Events Collected</h4>
                
                <p>As a user moves through your site, there is a sequence of events that we are interested in. These events tell us how imagery impacts a user. We connect these events into chains to understand how users fall of in a potential flow. The types of events are:</p>

                <ol>
                    <li>Image Load - An image was loaded into the user&rsquo;s browser</li>
                    <li>Image View - An image was visible in the browser for at least 1 second</li>
                    <li>Image Click - A user clicked on an image</li>
                    <li>Ad Play - An ad was shown to the user</li>
                    <li>Video Play - A video started to play to the user</li>
                    <li>Video View Percentage - A user watched at least X% of the video</li>
                </ol>

                <h3 className="title is-4">Callbacks</h3>
                
                <p>As a video transitions from one state to another, (optional) callbacks will be sent to your endpoint. Alternatively, you can poll the CMS API for the state of the video.</p>
                <p>When submitting a video to Neon, there is an optional <strong>callback_url</strong> parameter. If this is set, then, as the video moves through its lifetime, PUT requests with the current video state will be sent to your endpoint. The <a href="http://api.docs.neon-lab.com/#!/callback/put_video_transition_callback" rel="external">full callback</a> is defined in the reference manual. Two fields track the state of the video: <strong>processing_state</strong> and <strong>experiment_state</strong>. You can expect to receive the following callbacks:</p>

                <table className="table is-bordered">
                    <thead>
                        <tr>
                            <th>Event</th>
                            <th>experiment_state</th>
                            <th>processing_state</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>An error occurred while processing the video.</td>
                            <td></td>
                            <td>failed</td>
                        </tr>
                        <tr>
                            <td>The video is finished processing. You can now query the CMS API to view the selected images.</td>
                            <td></td>
                            <td>processed</td>
                        </tr>
                        <tr>
                            <td>Thumbnails for the video are ready to be served onto your website at scale.</td>
                            <td></td>
                            <td>serving</td>
                        </tr>
                        <tr>
                            <td>The experiment phase is complete and we have found the best thumbnail.</td>
                            <td>complete</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>

                <p>The recommended callback handler has the following logic:</p>

<pre className="wonderland-pre"><code>{`def put(body):
    if body['processing_state'] == 'failed':
        # Report processing error

    else if body['processing_state'] == 'processed':
        # Display thumbnails to an editorial team for review

    else if body['processing_state'] == 'serving':
        # The experiment url is ready to serve so replace the url 
        # on your site for this video with the Neon Serving URL.
        # The desired width and height can be appended to the serving url.
        CMS.Video(body['video_id']).thumbnail_url = body['serving_url'] + "?height=90&width=160"`}</code></pre>

            </section>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SupportTab3;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
