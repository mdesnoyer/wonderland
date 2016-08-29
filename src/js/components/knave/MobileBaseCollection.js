// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, {PropTypes} from 'react';

import _ from 'lodash';

import FeatureThumbnail from './_FeatureThumbnail';
import InfoActionContainer from './InfoActionContainer';
import {
    ThumbnailList,
    ShowMoreThumbnailList,
    ShowLessThumbnailList,
    ShowMoreLessThumbnailList} from './ThumbnailList';

import Lift from '../knave/Lift';
import RENDITIONS from '../../modules/renditions';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const MobileBaseCollection = React.createClass({

    propTypes: {

        // Left and right large thumbnail
        leftFeatureThumbnail: PropTypes.object.isRequired,
        rightFeatureThumbnail: PropTypes.object.isRequired,

        // A map of T get key string to T get key
        // e.g., {'action.showMore': 'copy.thumbnails.low', ...}
        // overrides "Show More" with "View Low Scores"
        translationOverrideMap: PropTypes.object,

        infoActionPanels: PropTypes.array.isRequired,
        infoActionControls: PropTypes.array.isRequired,

        // List of thumbnails to be displayed as small items
        smallThumbnails: PropTypes.array.isRequired,

        // Handlers for image events
        onThumbnailClick: PropTypes.func,
        setLiftThumbnailId: PropTypes.func,

        // class name for the wrapper around the
        // component defaults to xxCollection
        wrapperClassName: PropTypes.string,
        onRightThumbnailClick: PropTypes.func,
    },

    getDefaultProps: function() {
        return {
            translationOverrideMap: {},
            wrapperClassName: 'xxCollection',
            onThumbnailClick: () => {},
            setLiftThumbnailId: () => {},
            smallBadThumbnails: []
        }
    },

    getInitialState: function() {
        return {open: false};
    },

    getThumbnailList: function() {

        if (this.props.smallThumbnails.length == 0) {
            return null;
        }

        const self = this;
        const onMoreLess = (e) => {
            e.preventDefault();
            self.setState({
                open: !this.state.open
            });
        };

        const toggleLabel = this.state.open?
            T.get('action.showLess'):
            T.get('action.showMore');

        const children = [];

        if (this.state.open) {
            children.push((
                <span key="0">
                    {T.get('copy.videos.topSelects')}
                </span>
            ));
            children.push((
                <ThumbnailList
                    key="1"
                    thumbnails={self.props.smallThumbnails}
                    onClick={self.props.onThumbnailClick}
                    classname="xxThumbnail--highLight"
                />
            ));
            if (self.props.smallBadThumbnails.length > 0) {
                children.push((
                    <span key="2">
                        {T.get('copy.videos.lowest')}
                    </span>
                ));
                children.push((
                    <ThumbnailList
                        key="3"
                        thumbnails={self.props.smallBadThumbnails}
                        onClick={self.props.onThumbnailClick}
                        classname="xxThumbnail--lowLight"
                    />
                ));
            }
        }
        children.push((
            <div key="4" className="xxShowMore" onClick={onMoreLess}>
                <a href="#">{toggleLabel}</a>
            </div>
        ));
        return <div>{children}</div>;
    },

    onRightThumbnailClick: function() {
        if (this.props.onRightThumbnailClick) {
            this.props.onRightThumbnailClick();
        } else {
            const rightThumbnailId = this.props.rightThumbnailId.thumbnail_id;
            this.props.onThumbnailClick(rightThumbnailId);
        }
    },

    render: function() {
        // Let mapped labels be overriden.
        const unapplyOverride = UTILS.applyTranslationOverride(this.props.translationOverrideMap);

        const leftThumbnailId = this.props.leftFeatureThumbnail.thumbnail_id;
        // The main left and right feature thumbnails
        const left = (
            <FeatureThumbnail
                title={T.get('copy.worstThumbnail')}
                score={this.props.leftFeatureThumbnail.neon_score}
                enabled={this.props.leftFeatureThumbnail.enabled} 
                className="xxThumbnail--lowLight"
                src={RENDITIONS.findRendition(this.props.leftFeatureThumbnail)}
                onClick={this.props.onThumbnailClick.bind(null, leftThumbnailId)}
            />
        );
        const rightThumbnailId = this.props.rightFeatureThumbnail.thumbnail_id;
        const right = (
            <FeatureThumbnail
                title={T.get('copy.bestThumbnail')}
                score={this.props.rightFeatureThumbnail.neon_score}
                enabled={this.props.rightFeatureThumbnail.enabled} 
                src={RENDITIONS.findRendition(this.props.rightFeatureThumbnail)}
                onClick={this.onRightThumbnailClick}
                isSoloImage={this.props.rightFeatureThumbnail.thumbnail_id === this.props.leftFeatureThumbnail.thumbnail_id}
            />
        );

        const result = (
            <div className={this.props.wrapperClassName}>
                <div className="xxCollection-content">
                    <InfoActionContainer
                        children={this.props.infoActionPanels}
                        controls={this.props.infoActionControls}
                        selectedPanel={this.props.selectedPanel}
                    />
                </div>
                <div className="xxCollectionImages">
                    {left}
                    {right}
                    <Lift
                        displayThumbLift={this.props.liftValue}
                        translationOverrideMap={this.props.translationOverrideMap}
                    />
                    {this.getThumbnailList()}
                </div>
            </div>
        );

        // Remove translation override.
        unapplyOverride();

        return result;
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default MobileBaseCollection;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
