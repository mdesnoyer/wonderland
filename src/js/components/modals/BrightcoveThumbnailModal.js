// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var BrightcoveThumbnailModal = React.createClass({
    render: function() {
        return (
            <section className="box is-desktop">
                <h1 className="title is-4">2. Enable Image Serving</h1>
                <div className="content">
                    <p>Once you&rsquo;ve entered your Brightcove Account ID and API credentials into your Neon account, you&rsquo;re ready to move onto the next step. In this step, you&rsquo;ll ensure that Neon is able to serve images onto your site and perform realtime optimization.</p>
                    <p>To enable this functionality, you must specify our serving URL as the source of the thumbnail to display on your page. The serving URL will cause different images to be seen by different users, enabling the realtime optimization.  As a Brightcove customer, you might already be using the Brightcove Media API to determine which image to show on your site. If that is the case, you can skip this step and move on to the next step. If you&rsquo;re a Gallery customer, the default is to use the <a href="http://docs.brightcove.com/en/video-cloud/media/guides/quick-start.html" rel="external">Brightcove Media API</a>.</p>
                    <p>If you do not use the Brightcove Media API to determine the thumbnails shown on your site, then you must insert our serving URLs directly. Please see the image serving documentation for more details.</p>
                </div>
            </section>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default BrightcoveThumbnailModal;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
