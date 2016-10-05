import React, { PropTypes } from 'react';
import _ from 'lodash';

import Clip from './Clip';
import Collection from './Collection';
import VideoCollection from './VideoCollection';
import RENDITIONS from '../../modules/renditions';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import { DownloadControl } from './InfoActionPanels';
import {
    ShowLessThumbnailList,
    ShowMoreThumbnailList,
    ThumbnailList } from './ThumbnailList';
import { SendActions } from '../../stores/CollectionStores';

class ClipCollection extends VideoCollection {

    static displayName = 'ClipCollection';

    static propTypes = {
        clips: PropTypes.arrayOf(PropTypes.object).isRequired,
        thumbnailMap: PropTypes.objectOf(PropTypes.object).isRequired,
    }

    static copyOverrideMap = {
        'copy.lift.explanation': 'copy.lift.explanation.gifs',
        'copy.lift.explanation.solo': 'copy.lift.explanation.gifs',
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            ...this.state,
            // Which clip is selected.
            selectedClipIndex: 0,
        };

        this.onSetSelectedClipIndex = this.onSetSelectedClipIndex.bind(this);
        // No inline "Why" in the lift panel copy.
        this.onWhyClick = null;
    }

    onSetSelectedClipIndex(clipId) {
        const selectedClipIndex = _.findIndex(this.props.clips,
            clip => clip.clip_id === clipId);
        if (selectedClipIndex !== -1) {
            this.setState({ selectedClipIndex });
        }
    }

    onRefilterVideo(gender, age, callback) {
        return SendActions.refilterVideoForClip(
            this.props.tagId, gender, age, callback);
    }

    bindMore() {
        // Block VideoCollection's binds.
    }

    getLiftValue() {
        const map = this.props.objectLiftMap || {};
        // The lift value for a map of one thumbnail
        // is undefined to signal that components
        // will not render the lift score.
        if (_.size(map).length <= 1) {
            return undefined;
        }
        return map[this.state.liftObjectId];
    }

    getWidthClassName(thumbnails) {
        switch (thumbnails.length) {
        case 2:
            /* falls through */
        case 3:
            return 'xxThumbnail--threewidth'; // FIXME use descriptive class names.
        case 5:
            return 'xxThumbnail--fivewidth';
        case 6:
            return 'xxThumbnail--smallwidth';
        default:
            return 'xxThumbnail--mediumwidth';
        }
    }

    renderPanels() {
        return super.getBasePanels(ClipCollection.copyOverrideMap);
    }

    renderControls() {
        const controls = super.getBaseControls();
        if (this.props.isViewOnly) {
            return controls;
        }
        const clip = this.props.clips[this.state.selectedClipIndex];
        const rend = RENDITIONS.findLargestRendition(clip.renditions, 'gif');
        const url = rend.url;
        // Put the Download before the last control.
        controls.splice(-1, 0, <DownloadControl href={url} />);
        return controls;
    }

    renderClipList() {
        if (this.props.clips.length <= 1) {
            return null;
        }
        const thumbnails = this.props.clips.map(clip => (
            {
                thumbnail_id: clip.clip_id,
                neon_score: clip.neon_score,
                renditions: clip.renditions,
            }
        ));
        // Show a collapsed view if no rows.
        if (!this.state.smallContentRows) {
            return (
                <ShowMoreThumbnailList
                    className={this.getWidthClassName(thumbnails)}
                    numberToDisplay={0}
                    thumbnails={thumbnails}
                    moreLabel={T.get('action.showMore.gifs')}
                    onMore={this.onMore}
                    onClick={this.onSetSelectedClipIndex}
                />
            );
        } else if (this.state.smallContentRows > 1) {
            return (
                <ShowLessThumbnailList
                    className={this.getWidthClassName(thumbnails)}
                    thumbnails={thumbnails}
                    lessLabel={T.get('action.showLess.gifs')}
                    onLess={this.onLess}
                    onClick={this.onSetSelectedClipIndex}
                />
            );
        }
        return (
            <ThumbnailList
                className={this.getWidthClassName(thumbnails)}
                thumbnails={thumbnails}
                onClick={this.onSetSelectedClipIndex}
            />
        );
    }

    renderClip() {
        const clip = this.props.clips[this.state.selectedClipIndex];
        const thumbnail = this.props.thumbnailMap[clip.thumbnail_id];
        const posterUrl = thumbnail ? RENDITIONS.findRendition(
            thumbnail, UTILS.CLIP_LARGE_WIDTH, UTILS.CLIP_LARGE_HEIGHT) : null;
        const rend = RENDITIONS.findLargestRendition(clip.renditions, 'mp4');
        return (
            <Clip
                url={rend.url}
                width={rend.width}
                height={rend.height}
                posterUrl={posterUrl}
                score={clip.neon_score}
            />
        );
    }

    render() {
        const content = {
            featureContent: this.renderClip(),
            subContent: this.renderAsMobile(
                this.renderClipList(),
                ClipCollection.copyOverrideMap),
            panels: this.renderPanels(),
            controls: this.renderControls(),
            wrapperClassName: 'xxCollection xxCollection--video',
            selectedPanelIndex: this.state.selectedPanelIndex,
        };
        return <Collection {...this.props} {...content} />;
    }
}

export default ClipCollection;
