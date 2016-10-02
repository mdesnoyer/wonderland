import React, { PropTypes } from 'react';
import _ from 'lodash';

import BaseCollection from './BaseCollection';
import VideoCollection from './VideoCollection';
import Clip from './Clip';
import MobileBaseCollection from './MobileBaseCollection';
import RENDITIONS from '../../modules/renditions';
import { DownloadControl } from './InfoActionPanels';
import { ThumbnailList } from './ThumbnailList';
import { SendActions } from '../../stores/CollectionStores';

class ClipCollection extends VideoCollection {

    static propTypes = {
        clips: PropTypes.arrayOf(PropTypes.object).isRequired,
        thumbnailMap: PropTypes.objectOf(PropTypes.object).isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedClipIndex: 0,
            selectedPanelIndex: 0,
        };
        this.onSetSelectedClipIndex = this.onSetSelectedClipIndex.bind(this);
    }

    onSetSelectedClipIndex(clipId) {
        const selectedClipIndex = _.findIndex(this.props.clips,
            clip => clip.clip_id === clipId);
        if (selectedClipIndex !== -1) {
            this.setState({ selectedClipIndex });
        }
    }

    bindMore() {
        // Stub out optional instance binds.
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

    getPanels() {
        const copyOverrideMap = {
            'copy.lift.explanation': 'copy.lift.explanation.gifs',
            'copy.lift.explanation.solo': 'copy.lift.explanation.gifs',
        };
        return super.getBasePanels(copyOverrideMap);
    }

    onRefilterVideo(gender, age, callback) {
        return SendActions.refilterVideoForClip(
            this.props.tagId, gender, age, callback);
    }

    getControls() {
        const controls = super.getBaseControls();
        if (this.props.isViewOnly) {
            return controls;
        }
        const clip = this.props.clips[this.state.selectedClipIndex];
        const url = RENDITIONS.findLargestUrl(clip.renditions, 'gif');
        // Put the Download before the last control.
        controls.splice(-1, 0, <DownloadControl href={url} />);
        return controls;
    }

    renderMobile() {
        const copyOverrideMap = {
            'copy.worstThumbnail': 'copy.currentThumbnail',
            'copy.bestThumbnail': 'copy.topNeonImage',
            'action.showMore': 'copy.thumbnails.low',
            'action.showLess': 'copy.thumbnails.high',
        };
        return (
            <MobileBaseCollection
                {...this.props}
                featureContent={this.renderClip()}
                subContent={<div />}
                wrapperClassName={'xxCollection xxCollection--video'}
                infoActionPanels={this.getPanels()}
                infoActionControls={this.getControls()}
                selectedPanelIndex={this.state.selectedPanelIndex}
                liftValue={this.getLiftValue()}
                setLiftThumbnailId={this.setLiftThumbnailId}
                copyOverrideMap={copyOverrideMap}
            />
        );
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
        return (
            <ThumbnailList
                className={this.getWidthClassName(thumbnails)}
                thumbnails={thumbnails}
                onClick={this.onSetSelectedClipIndex}
            />
        );
    }

    getWidthClassName(thumbnails) {
        switch (thumbnails.length) {
        case 2:
            return 'xxThumbnail--twowidth';
        case 3:
            return 'xxThumbnail--threewidth';
        case 4:
            return 'xxThumbnail--mediumwidth';
        case 5:
            return 'xxThumbnail--fivewidth';
        case 6:
            return 'xxThumbnail--smallwidth';
        default:
            return 'xxThumbnail--mediumwidth';
        }
    }

    renderClip() {
        const clip = this.props.clips[this.state.selectedClipIndex];
        const thumbnail = this.props.thumbnailMap[clip.thumbnail_id];
        const posterUrl = thumbnail ? RENDITIONS.findRendition(thumbnail, 1280, 720) : null;
        const url = RENDITIONS.findLargestUrl(clip.renditions, 'mp4');
        return (
            <Clip
                url={url}
                posterUrl={posterUrl}
                score={clip.neon_score}
            />
        );
    }

    renderDesktop() {
        return (
            <BaseCollection
                {...this.props}
                wrapperClassName={'xxCollection xxCollection--video'}
                featureContent={this.renderClip()}
                subContent={this.renderClipList()}
                infoActionPanels={this.getPanels()}
                infoActionControls={this.getControls()}
                selectedPanelIndex={this.state.selectedPanelIndex}
            />
        );
    }

    render() {
        if (this.context.isMobile) {
            this.renderMobile();
        }
        return this.renderDesktop();
    }
}

export default ClipCollection;
