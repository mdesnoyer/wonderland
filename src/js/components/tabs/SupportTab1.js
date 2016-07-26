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
                <p>It&rsquo;s simple. Visit <a href="http://app.neon-lab.com" rel="external">http://app.neon-lab.com</a> to try it out. You can use the app with or without signing up for an account.</p>
                <p>Follow these simple steps:</p>
                <ol className="simple-ol-list">
                    <li>Sign in to your Neon account, or click Try It Out to use the app without an account.</li>
                    <li>Paste a URL that links to a video stored online into the Video URL field.
                        <figure>
                            <img src="/img/support/overview/1-analyze-video.png" />
                        </figure>
                    </li>
                    <li>Click &ldquo;Submit&rdquo; to begin the video analysis process.</li>

                    <li>Neon&rsquo;s software will analyze your video to surface the most clickable thumbnails. This process takes about two times the length of the video to complete. If you&rsquo;re logged in, you can navigate away from your Neon account and check back later without affecting the process. If you aren't logged in, you must either keep your browser open until the video has finished processing, or you can enter your email address to receive an email when your video is done processing.</li>
                    <li>When your video is done processing, your video results page will show the highest- and lowest-scoring thumbnails for each video you&rsquo;ve processed. The NeonScore is the number in the orange or grey box on the image. The higher the score, the more likely the image is to be clicked.
                        <figure>
                            <img src="/img/support/overview/2-high-and-low-scoring-images.png" />
                        </figure>
                        By hovering over images in the image collection view, you can see the projected lift for that image compared to the current image. Lift is the increase in click-through rate for one image over another image, in this case the Neon-selected image vs the current image for the video.
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
            </section>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SupportTab1;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
