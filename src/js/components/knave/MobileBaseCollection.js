import React, { PropTypes } from 'react';

import BaseCollection from './BaseCollection';
import FeatureThumbnail from './FeatureThumbnail';
import InfoActionContainer from './InfoActionContainer';
import { ThumbnailList } from './ThumbnailList';
import Lift from '../knave/Lift';
import GifClip from './GifClip';
import RENDITIONS from '../../modules/renditions';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';

class MobileBaseCollection extends BaseCollection {

    static displayName = 'MobileBaseCollection';

    static propTypes = {
        // Left and right large thumbnail
        leftFeatureThumbnail: PropTypes.shape({
            thumbnail_id: PropTypes.string.isRequired,
        }).isRequired,
        rightFeatureThumbnail: PropTypes.shape({
            thumbnail_id: PropTypes.string.isRequired,
        }).isRequired,

        // A map of T get key string to T get key
        // e.g., {'action.showMore': 'copy.thumbnails.low', ...}
        // overrides "Show More" with "View Low Scores"
        copyOverrideMap: PropTypes.objectOf(PropTypes.string),

        infoActionPanels: PropTypes.arrayOf(PropTypes.node).isRequired,
        infoActionControls: PropTypes.arrayOf(PropTypes.node).isRequired,

        // List of thumbnails to be displayed as small items
        smallThumbnails: PropTypes.arrayOf(PropTypes.object).isRequired,

        // Handlers for image events
        onThumbnailClick: PropTypes.func,
        setLiftThumbnailId: PropTypes.func,

        // class name for the wrapper around the
        // component defaults to xxCollection
        wrapperClassName: PropTypes.string,
        onRightThumbnailClick: PropTypes.func,
        isSoloImage: PropTypes.bool,
        isMine: PropTypes.bool,
    }

    static defaultProps = {
        wrapperClassName: 'xxCollection',
        onThumbnailClick: Function.prototype,
        setLiftThumbnailId: Function.prototype,
        smallBadThumbnails: [],
        isMine: true,
    }

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            displayInfo: false,
        };
        this.onDisplayInfoToggle.bind(this);
        this.onMoreLessToggle.bind(this);
    }

    onDisplayInfoToggle(e) {
        e.preventDefault();
        this.setState({ displayInfo: !this.state.displayInfo });
    }

    onMoreLessToggle(e) {
        e.preventDefault();
        this.setState({ open: !this.state.open });
    }

    getOnClick(isLeft) {
        if (isLeft) {
            return this.onLeftThumbnailClick;
        }
        if (this.props.isSoloImage) {
            if (!this.props.isMine) {
                return null;
            }
        }
        return this.onRightThumbnailClick;
    }

    renderThumbnailList() {
        if (!this.props.smallThumbnails.length) {
            return null;
        }

        const toggleLabel = this.state.open ?
            T.get('action.showLess') :
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
                    thumbnails={this.props.smallThumbnails}
                    onClick={this.props.onThumbnailClick}
                    className="xxThumbnail--highLight"
                />
            ));
            if (this.props.smallBadThumbnails.length > 0) {
                children.push((
                    <span key="2">
                        {T.get('copy.videos.lowest')}
                    </span>
                ));
                children.push((
                    <ThumbnailList
                        key="3"
                        thumbnails={this.props.smallBadThumbnails}
                        onClick={this.props.onThumbnailClick}
                        classnNme="xxThumbnail--lowLight"
                    />
                ));
            }
        }
        children.push((
            <button key="4" className="xxShowMore" onClick={this.onMoreLessToggle}>
                <a>{toggleLabel}</a>
            </button>
        ));

        return <div>{children}</div>;
    }


    renderFeatureThumbnail(thumbnail, isLeft) {
        const title = T.get(isLeft ?
            'copy.worstThumbnail' : 'copy.bestThumbnail');
        const blurText = this.props.isMine ?
            T.get('imageUpload.addMoreBlurText') :
            '';
        const className = isLeft ? 'xxThumbnail--lowLight' : '';
        return (
            <FeatureThumbnail
                thumbnailId={thumbnail.thumbnail_id}
                title={title}
                score={thumbnail.neon_score}
                enabled={thumbnail.enabled}
                className={className}
                blurText={blurText}
                src={RENDITIONS.findRendition(thumbnail)}
                onClick={this.getOnClick(isLeft)}
                isSoloImage={!isLeft && this.props.isSoloImage}
            />
        );
    }

    renderClip() {
        const displayClassNames = [
            'xxPagingControls-next',
            'xxPagingControls-next--GifClip'];
        if (this.state.displayInfo) {
            displayClassNames.push('xxPagingControls-next--mobileGifClosed');
        }
        return (
            <div>
                <div className="xxCollection-content xxCollection-content--mobileGif">
                    <h1 className="xxCollection-title xxCollection-title--mobileGif ">
                        {this.props.title}
                    </h1>
                    <button
                        className={displayClassNames.join(' ')}
                        onClick={this.onDisplayInfoToggle}
                    />
                </div>
                <div className="xxCollectionImages">
                    <GifClip
                        url={this.props.clip.renditions[2].url}
                        score={this.props.clip.neon_score}
                        poster={this.props.clipPoster}
                        id={this.props.clip.clip_id}
                    />
                    {
                        this.state.displayInfo ? (
                            <div className="xxCollection-content">
                                <InfoActionContainer
                                    panels={this.props.infoActionPanels}
                                    controls={this.props.infoActionControls}
                                    selectedPanelIndex={this.props.selectedPanelIndex}
                                />
                            </div>
                        ) : null
                    }
                </div>
            </div>
        );
    }

    renderVideo() {
        return (
            <div>
                <div className="xxCollection-content">
                    <InfoActionContainer
                        controls={this.props.infoActionControls}
                        selectedPanelIndex={this.props.selectedPanelIndex}
                    >
                        {this.props.infoActionPanels}
                    </InfoActionContainer>
                </div>
                <div className="xxCollectionImages">
                    {this.getFeatureThumbnail(this.props.leftFeatureThumbnail, true)}
                    {this.getFeatureThumbnail(this.props.rightFeatureThumbnail, false)}
                    <Lift
                        displayThumbLift={this.props.liftValue}
                        copyOverrideMap={this.props.copyOverrideMap}
                    />
                    {this.renderThumbnailList()}
                </div>
            </div>
        );
    }

    render() {
        // Let mapped labels be overriden.
        const unapplyOverride = UTILS.applyTranslationOverride(this.props.copyOverrideMap);

        const result = (
            <div className={this.props.wrapperClassName}>
                {this.props.clip ? this.renderClip() : this.renderVideo()}
            </div>
        );

        // Remove translation override.
        unapplyOverride();
        return result;
    }
}

export default MobileBaseCollection;
