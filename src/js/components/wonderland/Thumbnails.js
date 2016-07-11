// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import FuzzyTime from '../core/FuzzyTime';
import AjaxMixin from '../../mixins/Ajax';
import FeatureThumbnail from '../knave/FeatureThumbnail';
import ThumbnailCollection from '../knave/ThumbnailCollection';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Thumbnails = React.createClass({
    mixins: [AjaxMixin], // ReactDebugMixin
    propTypes: {
        isGuest: React.PropTypes.bool.isRequired,
        videoState: React.PropTypes.string.isRequired,
        thumbnails: React.PropTypes.array.isRequired,
        videoId: React.PropTypes.string.isRequired
    },
    getInitialState: function() {
        var self = this;
        return {
            thumbnails: self.props.thumbnails
        };
    },
    componentWillMount: function() {
        var self = this; 
    },
    render: function() {
        var self = this,
            thumbnailElements = []
        ;
        return (
            <div className="xxCollectionImages">
                <FeatureThumbnail
                    thumbnails={self.props.thumbnails}
                    videoId={self.props.videoId}
                    type="default"
                />
                <FeatureThumbnail
                    thumbnails={self.props.thumbnails}
                    videoId={self.props.videoId}
                    type="neon"
                    handleChildOnMouseEnter={self.props.handleChildOnMouseEnter}
                />
                <div className="xxCollectionImages-all">
                    <ThumbnailCollection
                        videoId={self.props.videoId}
                        thumbnails={self.state.thumbnails}
                        handleChildOnMouseEnter={self.props.handleChildOnMouseEnter}
                    />
                </div>
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Thumbnails;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
