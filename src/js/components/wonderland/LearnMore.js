// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var LearnMore = React.createClass({
    render: function() {
        return (
            <article className="xxPageOverlay-content">
                <h1 className="xxSubtitle">{T.get('nav.learnMore')}</h1>
                <h2 className="xxTitle">
                    Neon knows which images drive engagement for specific devices, audiences, and platforms.
                </h2>
                <div className="xxText">
                    <img src="/img/xx/temporary/learn-more-1.jpg" />
                    <p>Did you know that our brains decide in as few as 17 milliseconds which images we want to click on? Neon’s deep learning software knows which images and video thumbnails evoke emotion and drive engagement for specific audiences, devices, and platforms.</p>
                    <p>The NeonScore is a 0-99 scale that represents how engaging your image is. The higher the score, the more engaging the image. NeonScore uses neuroscience-based algorithms that closely mirror human visual preference. Neon analyzes each image or video frame for over 1,000 unique and interrelated valence features, and assigns a score. Some of these features include eye gaze, instability, color, and texture.</p>
                    <p>In order to identify these features in your images, we import your videos or image collections, analyze individual frames or images using our proprietary neuroscience-based deep learning algorithms, and compare your image to similar images in our image library. Find out more about what’s going on behind the scenes in <a href="https://neon-lab.com/how-neon-works/" rel="external">How It Works</a>.</p>
                    <p>During this process, we’re able to automatically pull out frames are are too dark, too blurry, or have too much text on them. You can see these frames in the “Low Scoring Images” box for each video you’ve uploaded. In order to determine which areas of your video to target, we can look at heatmaps like the one above that show where the most engaging frames are located.</p>
                    <p>Once we’ve analyzed your video, we show you the highest (and lowest) scoring images from it in your account. These images are optimized for a general audience. To see the best images for a specific demographic, you can reanalyze your video with different demographic filters. You might notice that you get some of the same images for multiple demographics but the images have different scores. This is because while a certain image might appeal to multiple audiences, it might appeal slightly more to one audience than another.</p>
                    <p>We’re only as good as your videos are, so upload the highest resolution version of a video you can if you want to see high resolution results.</p>
                </div>
            </article>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default LearnMore;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -