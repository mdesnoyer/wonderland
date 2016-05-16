// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var BrightcoveThumbnailModal = React.createClass({
    render: function() {
        return (
            <section className="box is-desktop">
                <h1 className="title is-4">Do you use the Brightcove Media API to determine which thumbnails are shown on your site?</h1>
                <div className="content">
                    <p>In order to allow Neon to serve and test the thumbnail images on your site, you need to specify our serving URL as the source of the thumbnail to display on your page. The serving URL will cause different images to be seen by different users, enabling the realtime optimization.</p>
                    <p>As a Brightcove customer, you might already be using the Brightcove Media API to determine which image to show on your site. If that is the case, answer &ldquo;Yes&rdquo; to this question. If you&rsquo;re a Gallery customer, the default is to use the Brightcove Media API.</p>
                    <p>If you do not use the Brightcove Media API to determine the thumbnails shown on your site, then you must insert our serving URLs directly. Select &ldquo;no&rdquo; and then see the <a href="/support/#custom-plugin-guide">image serving documentation</a> for more details.</p>
                </div>
            </section>
        );
    }
});


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default BrightcoveThumbnailModal;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
