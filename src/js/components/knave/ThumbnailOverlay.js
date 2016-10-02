// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import ReactDOM from 'react-dom';

import _ from 'lodash';

import T from '../../modules/translation';
import ZoomThumbnail from './ZoomThumbnail';
import UTILS from '../../modules/utils';
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
        thumbnailFeatureNameMap: React.PropTypes.object,
        copyOverrideMap: React.PropTypes.object,
    },
    componentDidMount: function() {
        var self = this;
        window.addEventListener('keydown', self.handleKeyEvent);
        ReactDOM.findDOMNode(self).scrollTop = 0;
        document.body.classList.add('has-overlayWithScroll', 'has-overlayDark');
        document.body.style.marginRight = `${scrollbarWidth}px`;
    },
    componentWillUnmount: function() {
        var self = this;
        window.removeEventListener('keydown', this.handleKeyEvent);
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
                e.stopPropagation();
                return self.props.closeThumbnailOverlay(e);
            case 37: // Left Arrow
                e.stopPropagation();
                return self.props.handleClickPrevious(e);
            case 39: // Right Arrow
                e.stopPropagation();
                return self.props.handleClickNext(e);
        }
    },
    getExtraClass: function(thumbnail, index) {
        // If this is the left feature thumbnail, then it is always lowlight.
        if (index === 0) {
            return 'xxThumbnail--lowLight';
        }
        // We need to handle the case where one of the top thumbnails is the
        // random or centerframe
        if (
            thumbnail.type === 'neon' ||
            thumbnail.type === 'random' ||
            thumbnail.type === 'centerframe'
        ) {
            return 'xxThumbnail--highLight';
        }
        if (this.props.tagType === UTILS.TAG_TYPE_IMAGE_COL &&
                thumbnail.type === 'customupload') {
            return 'xxThumbnail--highLight';
        }
        return 'xxThumbnail--lowLight';
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
                                        extraClass={self.getExtraClass(thumbnail, i)}
                                        handleClose={self.props.closeThumbnailOverlay}
                                        openLearnMore={self.props.openLearnMore}
                                        copyOverrideMap={self.props.copyOverrideMap}
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
