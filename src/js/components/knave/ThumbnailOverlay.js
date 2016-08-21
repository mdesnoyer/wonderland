// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

import _ from 'lodash';

import T from '../../modules/translation';
import ZoomThumbnail from './ZoomThumbnail';
import ReactDOM from 'react-dom';
import scrollbarWidth from '../../xx/utils/scrollbarWidth';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var ThumbnailOverlay = React.createClass({
    _prevKeyDown: '',
    propTypes: {
        closeThumbnailOverlay: React.PropTypes.func.isRequired,
        thumbnails: React.PropTypes.array.isRequired,
        selectedItem: React.PropTypes.number.isRequired,
        handleClickPrevious: React.PropTypes.func.isRequired,
        handleClickNext: React.PropTypes.func.isRequired,
        displayThumbLift: React.PropTypes.number.isRequired,
        thumbnailFeatureNameMap: React.PropTypes.object
    },
    componentDidMount: function() {
        var self = this;
        if (document.body.onkeydown) {
            self._prevKeyDown = document.body.onkeydown;
        }
        document.body.onkeydown = self.handleKeyEvent;
        ReactDOM.findDOMNode(this).scrollTop = 0;
        document.body.classList.add('has-overlayWithScroll', 'has-overlayDark');
        document.body.style.marginRight = `${scrollbarWidth}px`;
    },
    componentWillUnmount: function() {
        var self = this;
        if (self._prevKeyDown) {
            document.body.onkeydown = self._prevKeyDown;
        }
        document.body.classList.remove('has-overlayWithScroll', 'has-overlayDark');
        document.body.style.marginRight = 0;
    },
    getValenceFeatures: function(thumbnail) {
        return (thumbnail.final_valence_features ? thumbnail.final_valence_features : []) 
    },
    handleKeyEvent: function(e) {
        var self = this;
        switch (e.keyCode) {
            case 27: // Escape
                return self.props.closeThumbnailOverlay(e);
            case 37: // Left Arrow
                return self.props.handleClickPrevious(e);
            case 39: // Right Arrow
                return self.props.handleClickNext(e);
        }
    },
    render: function() {
        var self = this;

        return (
            <article className="xxOverlay xxOverlay--dark xxOverlay--scroll">
                <a href="#" className="xxOverlay-close" onClick={self.props.closeThumbnailOverlay}>{T.get('action.close')}</a>
                    <div className="xxImageZoom">
                        {
                            self.props.thumbnails.map(function(thumbnail, i) {

                                const thumbnailId = thumbnail.thumbnail_id;

                                let valence;
                                const featureMap = self.props.thumbnailFeatureNameMap;
                                if (!_.isEmpty(featureMap) && thumbnailId in featureMap) {
                                    valence = featureMap[thumbnailId];
                                } else {
                                    valence = self.getValenceFeatures(thumbnail);
                                }

                                return (
                                    <ZoomThumbnail
                                        key={i}
                                        thumbnail={thumbnail}
                                        index={i}
                                        selectedItem={self.props.selectedItem}
                                        total={self.props.thumbnails.length}
                                        handleClickPrevious={self.props.handleClickPrevious}
                                        handleClickNext={self.props.handleClickNext}
                                        displayThumbLift={self.props.displayThumbLift}
                                        valence={valence}
                                        extraClass={thumbnail.type === 'neon' ? 'xxThumbnail--highLight' : 'xxThumbnail--lowLight'}
                                        handleClose={self.props.closeThumbnailOverlay}
                                        openLearnMore={self.props.openLearnMore}
                                    />
                                );
                            })
                        }
                    </div>
            </article>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ThumbnailOverlay;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
