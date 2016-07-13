// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import BrightcoveThumbnailContent from '../static/BrightcoveThumbnailContent';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var BrightcoveThumbnailModal = React.createClass({
    render: function() {
        return (
            <section className="box wonderland-box hero is-desktop">
                <div className="hero-body">
                    <div className="container">
                        <h1>Do you use the Brightcove Media API to determine which thumbnails are shown on your site?</h1>
                        <div className="content">
                            <BrightcoveThumbnailContent />
                            <p>If you are already using the Brightcove Media API, answer &ldquo;Yes&rdquo; to this quesion, otherwise, select &ldquo;no&rdquo;.</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
});


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default BrightcoveThumbnailModal;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
