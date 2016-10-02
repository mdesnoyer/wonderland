import React, { PropTypes } from 'react';
import _ from 'lodash';

import BaseCollection from './BaseCollection';
import VideoCollection from './VideoCollection';
import Clip from './Clip';
import MobileBaseCollection from './MobileBaseCollection';
import RENDITIONS from '../../modules/renditions';

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
        return super.getPanels(copyOverrideMap);
    }

    getControls() {
        return super.getControls();
        // if (!_.isEmpty(this.props.clips)) {
        //    const currentClip = this.props.clips[this.props.clipIds[this.state.selectedGifClip]];
        //    controls.push(<DownloadControl href={currentClip.renditions[0].url} />);
        // }
        // controls.push(<DeleteControl handleClick={() => this.setSelectedPanel(4)} />);
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
                subContent={<div />}
                infoActionPanels={this.getPanels()}
                infoActionControls={this.getControls()}
                selectedPanelIndex={this.state.selectedPanelIndex}
            />
        );
    }

    render() {
        console.log(this.props, this.state);
        return this.context.isMobile ? this.renderMobile() : this.renderDesktop();
    }
}

export default ClipCollection;
