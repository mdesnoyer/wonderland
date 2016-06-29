// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default () => {
    return (
        <article className="xxPageOverlay-content">
            <h1 className="xxSubtitle">Learn More</h1>
            <h2 className="xxTitle">
                Neon knows which images drive engagement for specific devices,
                audiences, and platforms.
            </h2>
            <div className="xxText">
                <img src="/img/xx/temporary/learn-more-1.jpg" />
                <p>Did you know that our brains decide in as few as 17 milliseconds which images we want to click on? The prettiest images don’t always drive the most clicks. Neon’s deep learning software knows which images and video thumbnails evoke emotion and drive engagement for specific audiences, devices, and platforms.</p>
                <p>The NeonScore is a 0-99 scale that represents how engaging your image is. The higher the score, the more engaging the image. NeonScore uses neuroscience-based algorithms that closely mirror human visual preference.  Neon analyzes each image or video frame for over 1,024 unique and interrelated valence features, and assigns a score. Some of these features include eye gaze, instability, color, and texture.</p>
                <p>In order to identify these features in your images, we import your videos or image collections, analyze individual frames or images using our proprietary neuroscience-based deep learning algorithms, and compare your image to similar images in our image library. Find out more about what’s going on behind the scenes in <a href="#">How It Works</a>.</p>
                <p>During this process, we’re able to automatically pull out frames are are too dark, too blurry, or have too much text on them. You can see these frames in the “Low Scoring Images” box for each video you’ve uploaded. In order to determine which areas of your video to target, we can look at heatmaps like the one below that show where the most engaging frames are located.</p>
            </div>
        </article>
    );
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
