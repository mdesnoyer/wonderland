// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import Thumbnail from './Thumbnail';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var Thumbnails = React.createClass({
    render: function() {
        var self = this;
        if (self.props.videoState === 'processing') {
            return (
                <div className="wonderland-slides">
                    <div className="wonderland-slides-slide notification is-info">
                        Thank you for uploading your video to Neon. We are scanning it now to determine the top 5  most "clickable" thumbnails.
                    </div>
                    <div className="wonderland-slides-slide notification is-info">
                        Please be patient. Scanning takes place in real time, so a 10 minute video will take approximately 10 minutes to scan.
                    </div>
                    <div className="wonderland-slides-slide notification is-info">
                        When complete, your thumbnails will appear below. If you don&rsquo;t want to wait, you can exit this page without interrupting the process and come back later to view the results.
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="columns is-multiline is-mobile">
                    {
                        this.props.thumbnails.map(function(thumbnail, i) {
                            if (thumbnail.type != 'random' && thumbnail.type !='centerframe') {
                                return (
                                    <div className="column is-half-mobile is-third-tablet is-third-desktop" key={i}>
                                        <Thumbnail index={i} videoStateMapping={self.props.videoStateMapping} thumbnail={thumbnail} />
                                    </div>
                                );
                            }
                            else {
                                return false;
                            }
                        })
                    }
                </div>
            );
        }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default Thumbnails;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
