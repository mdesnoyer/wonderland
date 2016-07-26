// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SupportTab1 = React.createClass({
    render: function() {
        var self = this;
        return (
            <section className="xxText">
                <h1 className="xxCollection-title">Overview</h1>
                <p>Neon surfaces the most engaging imagery for your content. Our software is built on science- and machine learning-based models that can predict how people will subconsciously engage with different images. Using this software, we analyze your videos, identify and surface the most engaging still images from the video, and serve and test the images on your site as video thumbnails.</p>

                <h1 className="xxCollection-title">Get Started</h1>
                <p>It&rsquo;s simple. Just sign up for an account at <a href="http://app.neon-lab.com" rel="external">http://app.neon-lab.com</a> to try the service. Within minutes, you can see the most engaging images from almost any video on the internet.</p> 
                <p>Follow these simple steps:</p>
                <ol className="simple-ol-list">
                    <li>{T.get('action.signIn')} to your Neon account.</li>
                    <li>Paste a URL that links to a video stored online into the Video URL field.
                        <figure>
                            <img src="/img/support/overview/1-analyze-video.png" />
                        </figure>
                    </li>
                    <li>Click &ldquo;Submit&rdquo; to begin the video analysis process.</li>
                    <li>Neon&rsquo;s software will analyze your video to surface the most engaging thumbnails. This process takes about two times the length of the video to complete. You can navigate away from your Neon account and check back later without affecting the process.</li>
                    <li>Your Neon account will show the top, highest-scoring thumbnails for each video when your videos have finished processing. Your account will also show the low-scoring thumbnails for each video. NeonScore corresponds with valence—the higher the score, the more likely the image is to be clicked. An image&rsquo;s NeonScore is the number in the orange box in the lower left corner.
                        <figure>
                            <img src="/img/support/overview/2-high-and-low-scoring-images.png" />
                        </figure>
                        By hovering over images in the image collection view, you can see the projected lift for that image compared to the default image. Lift is the increase in click-through rate for one image over another image, in this case the Neon-selected image vs the default image for the video.
                        <figure>
                            <img src="/img/support/overview/3-lift-hover.png" />
                        </figure>
                        By clicking on a Neon-selected image, you can see the automatically detected valence features that contributed to the perceived engagingness and the NeonScore for the image.
                        <figure>
                            <img src="/img/support/overview/4-valence-features.png" />
                        </figure>
                        If you’d like to see the images from your video that are most suited to a particular audience, you can reprocess the video for a demographic. To do this, click on the orange &ldquo;filter&rdquo; button.
                        <figure>
                            <img src="/img/support/overview/5-refilter-hover.png" />
                        </figure>
                        Then, select a target gender and/or age group, and click &ldquo;Apply&rdquo;.
                        <figure>
                            <img src="/img/support/overview/6-refilter-apply.png" />
                        </figure>
                        Because our software will need to search through your video to find the best audience-specific thumbnails, you will be able to view your new thumbnails after the video is reprocessed. To look at thumbnails for different audiences you’ve processed for in the past, click the down arrow next to &ldquo;Filters&rdquo; and select the audience you&rsquo;d like to see images for.
                        <figure>
                            <img src="/img/support/overview/7-view-other-demographics.png" />
                        </figure>
                        You can share your image results on social media by clicking on the share icon.
                        <figure>
                            <img src="/img/support/overview/8-share-hover.png" />
                        </figure>
                        You can also receive an email containing the image results for a specific video by clicking on the email icon.
                        <figure>
                            <img src="/img/support/overview/9-email-hover.png" />
                        </figure>
                    </li>
                </ol>
                <p>For a more automated video upload and processing experience, you can integrate your backend systems directly with Neon&rsquo;s. This allows us to automatically analyze each of your videos, run A/B testing, and provide analytics.</p>
                <p>If you are a Brightcove customer, then you can use the <a href={UTILS.DRY_NAV.SUPPORT_BRIGHTCOVE_PLUGIN_GUIDE.URL}>Brightcove Plugin</a> to integrate in just a few steps. Otherwise, please see our <a href={UTILS.DRY_NAV.SUPPORT_CUSTOM_PLUGIN_GUIDE.URL}>Custom Plugin Guide</a>.</p>
                
                <h1 className="xxCollection-title">What&rsquo;s happening under the hood?</h1>
                <h1 className="xxPage-Subtitle">Video Analysis</h1>
                <p>We analyze your videos to extract and surface the best images to use as video thumbnails. We&rsquo;re able to analyze videos that are hosted on the internet and are publicly accessible. You can submit a video in two ways: via our UI, or via the CMS API. Once you&rsquo;ve submitted video content, our software analyzes your video, identifies engaging frames using our deep neural net-based model of the human visual system, and surfaces the images most likely to engage your users. This process takes approximately the same amount of time as the length of the video being processed.</p>
                
                <h1 className="xxPage-Subtitle">Editorial Partnering</h1>
                <p>Once your content has been analyzed, your Neon account will be populated with the top most effective images from your video. While our models are highly adept at understanding and predicting a user&rsquo;s gut reaction to an image, they&rsquo;re not quite as good as humans at understanding image context. This is why we give you the ability manually manage your video thumbnails by hiding a video from view in your Neon account. As with most complex systems, ours works best as a partnership between human and machine.</p>
                <p>You can hide a video from your Neon account by clicking the &ldquo;delete&rdquo; icon and then confirming that you&rsquo;d like to delete your video.</p>
                <figure>
                    <img src="/img/support/overview/10-hover-delete.png" />
                </figure>
                <figure>
                    <img src="/img/support/overview/11-delete-collection.png" />
                </figure>
                <p>This will cause the video to be hidden from view in your Neon account. Please note that this will not cause the deleted video to disappear from your CMS or OVP.</p>

                <h1 className="xxPage-Subtitle">Automated A/B Testing, Optimization, and Realtime Analytics</h1>
                <p>Though our models are very good at predicting the best image for your content, let&rsquo;s be honest: people are complex. They will always surprise us. So, to ensure that we are always showing the best image to your users, we run an A/B test with the set of images that represent your content. Once we are statistically confident that the best image has been found, we then make sure that we show only that image to the rest of your users, thus creating the most value possible for you.</p>
                <p>Running the A/B test provides a secondary valuable insight: being able to measure how effective each image is. This gives you some insight into how your users interact with images on your site, and additionally allows our models to constantly learn and improve.</p>
                <p>To perform the A/B testing, we serve images directly to your users and then collect <a href={UTILS.DRY_NAV.TELEMETRY.URL}>telemetry</a>, or data from your site, about how they interact with those images. Enabling this requires two steps:</p>
                <ol className="simple-ol-list">
                    <li>Inserting our serving URLs onto your site in place of the images currently there. These serving URLs point to our image serving platform, which determines which image each user will see. It will then issue a 302 redirect to the actual image sitting on a CDN.</li>
                    <li>Inserting our telemetry tag on your site. Our telemetry tag is a one-line Javascript snippet that will asynchronously send telemetry back to our servers about how a user interacts with the imagery.</li>
                </ol>
                <p>For more details on enabling the A/B testing and realtime analytics, see the <a href={UTILS.DRY_NAV.SUPPORT_BRIGHTCOVE_PLUGIN_GUIDE.URL}>Brightcove Plugin</a> or <a href={UTILS.DRY_NAV.SUPPORT_CUSTOM_PLUGIN_GUIDE.URL}>Custom Plugin Guide</a>.</p>
            </section>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SupportTab1;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
