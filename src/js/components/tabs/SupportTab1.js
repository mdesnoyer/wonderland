// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SupportTab1 = React.createClass({
    render: function() {
        var self = this;
        return (
            <section className="content">
            <h2 className="title is-3">Overview</h2>

            <p>Neon surfaces the most engaging imagery for your content. Our software is built on science- and machine learning-based models that can predict how people will subconsciously engage with different images. Using this software, we analyze your videos, identify and surface the most engaging still images from the video, and serve and test the images on your site as video thumbnails.</p>

            <h3 className="title is-4">Get Started</h3>

            <p>It&rsquo;s simple. Just sign up for an account at <a href="http://app.neon-lab.com" rel="external">http://app.neon-lab.com</a> to try the service. Within minutes, you can see the most engaging images from almost any video on the internet.</p> 
            <p>Follow these simple steps:</p>
            <ol>
                <li>Log in to your Neon account.</li>
                <li>Paste a URL that links to a video stored online into the Video URL field.
                    <figure className="image wonderland-image">
                        <img src="/img/support/overview/1-video-url.png" alt="" title=""  />
                    </figure>
                </li>
                <li>Click &ldquo;Analyze&rdquo;. You can optionally include a URL to a default video thumbnail that you&rsquo;d like to associate with this video in your Neon account.</li>
                <li>Neon&rsquo;s software will analyze your video to surface the most engaging thumbnails. This process takes about the length of the video. You can navigate away from your Neon account and check back later without affecting the process. You can also choose to analyze additional videos during this time.</li>
                <li>Your Neon account will show the top thumbnails for each video when your videos have finished processing. You can now download images by clicking on the &ldquo;download image&rdquo; icon next to your image.
                    <figure className="image wonderland-image">
                        <img src="/img/support/overview/2-download-image.png" alt="" title="" />
                    </figure>
                    You can also copy the static link to your images by clicking on the &ldquo;copy image URL&rdquo; icon next to your image in your Neon account.
                    <figure className="image wonderland-image">
                        <img src="/img/support/overview/3-copy-image-url.png" alt="" title="" />
                    </figure>
                </li>
            </ol>

            <p>For a more automated video upload and processing experience, you can integrate your backend systems directly with Neon&rsquo;s. This allows us to automatically analyze each of your videos, run A/B testing, and provide analytics.</p>
            <p>If you are a Brightcove customer, then you can use the Brightcove Plugin to integrate in just a few steps. Otherwise, please see our custom integration guide.</p>
            
            <h3 className="title is-4">What&rsquo;s happening under the hood?</h3>

            <h4 className="title is-5">Video Analysis</h4>

            <p>We analyze your videos to extract and surface the best images to use as video thumbnails. We&rsquo;re able to analyze videos that are hosted on the internet and are publicly accessible. You can submit a video in two ways: via our UI, or via the CMS API. Once you&rsquo;ve submitted video content, our software analyzes your video, identifies engaging frames using our deep neural net-based model of the human visual system, and surfaces the images most likely to engage your users. This process takes approximately the same amount of time as the length of the video being processed.</p>
            
            <h4 className="title is-5">Editorial Partnering</h4>

            <p>Once your content has been analyzed, your Neon account will be populated with the top most effective images from your video. While our models are highly adept at understanding and predicting a user&rsquo;s gut reaction to an image, they&rsquo;re not quite as good as humans at understanding image context. This is why we give you the ability to disable some or all of a video&rsquo;s Neon images or add other images in your Neon Account. As with most complex systems, ours works best as a partnership between human and machine.</p>

            <p>If you have integrated your Brightcove account or other image platform, you can indicate which images you would like to exclude from image serving in your Neon account. Simply click on the image you&rsquo;d like to disable, then click the X on the left sidebar on the image.</p>

            <figure className="image wonderland-image">
                <img src="/img/support/overview/4-how-to-disable.png" alt="" title="" />
            </figure>

            <p>A disabled image will have an X over the image.</p>

            <figure className="image wonderland-image">
                <img src="/img/support/overview/5-disabled.png" alt="" title="" />
            </figure>

            <p>If you&rsquo;d like to re-enable a disabled image, simply click on the checkmark on the left sidebar of the image. The orange X over the image should disappear, and the image will now be served alongside your other enabled images for that video.</p>

            <h4 className="title is-5">Automated A/B Testing, Optimization, and Realtime Analytics</h4>

            <p>Though our models are very good at predicting the best image for your content, let&rsquo;s be honest: people are complex. They will always surprise us. So, to ensure that we are always showing the best image to your users, we run an A/B test with the set of images that represent your content. Once we are statistically confident that the best image has been found, we then make sure that we show only that image to the rest of your users, thus creating the most value possible for you.</p>
            <p>Running the A/B test provides a secondary valuable insight: being able to measure how effective each image is. This gives you some insight into how your users interact with images on your site, and additionally allows our models to constantly learn and improve.</p>
            <p>You can see this data in realtime by clicking on any image in your Neon account that is currently or has previously been live on your site. The clickthrough rate (CTR) will be listed on the right side of the image panel.</p>

            <figure className="image wonderland-image">
                <img src="/img/support/overview/6-ctr.png" alt="" title="" />
            </figure>

            <p>To perform the A/B testing, we serve images directly to your users and then collect telemetry, or data from your site, about how they interact with those images. Enabling this requires two steps:</p>

            <ol>
                <li>Inserting our serving URLs onto your site in place of the images currently there. These serving URLs point to our image serving platform, which determines which image each user will see. It will then issue a 302 redirect to the actual image sitting on a CDN.</li>
                <li>Inserting our telemetry tag on your site. Our telemetry tag is a one-line Javascript snippet that will asynchronously send telemetry back to our servers about how a user interacts with the imagery.</li>
            </ol>
            
            <p>For more details on enabling the A/B testing and realtime analytics, see the Brightcove plugin or Custom Integration guide.</p>

            </section>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SupportTab1;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
