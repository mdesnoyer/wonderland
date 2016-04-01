// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import Thumbnail from './Thumbnail';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var Thumbnails = React.createClass({
    render: function() {
        var self = this;
        if (self.props.videoState === 'processing') {
            return (
                <div className="wonderland-slides">
                    <div className="wonderland-slides-slide notification is-info">
                        {T.get('copy.slideOne')}
                    </div>
                    <div className="wonderland-slides-slide notification is-info">
                        {T.get('copy.slideTwo')}
                    </div>
                    <div className="wonderland-slides-slide notification is-info">
                        {T.get('copy.slideThree')}
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
