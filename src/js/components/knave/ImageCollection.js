import React, { PropTypes } from 'react';

import ReactTooltip from 'react-tooltip';

import BaseCollection from './BaseCollection';
import MobileBaseCollection from './MobileBaseCollection';
import {
    InfoDemoLiftPanel,
    InfoLiftPanel,
    EmailPanel,
    EmailControl,
    SharePanel,
    ShareControl,
    DeletePanel,
    DeleteControl,
    AddPanel,
    AddControl } from './InfoActionPanels';
import { LoadActions } from '../../stores/CollectionStores';

const contextTypes = {
    isMobile: PropTypes.bool,
};

const propTypes = {
    tagId: PropTypes.string.isRequired,
    leftFeatureThumbnail: PropTypes.shape({
        thumbnail_id: PropTypes.string.isRequired,
    }).isRequired,
    rightFeatureThumbnail: PropTypes.shape({
        thumbnail_id: PropTypes.string.isRequired,
    }).isRequired,
    thumbLiftMap: PropTypes.object.isRequired,
    infoPanelOnly: PropTypes.bool,
    title: PropTypes.string.isRequired,
    onDemographicChange: PropTypes.func.isRequired,
    demographicOptions: PropTypes.array.isRequired,
    selectedDemographic: PropTypes.array.isRequired,
    shareUrl: PropTypes.string,
    socialClickHandler: PropTypes.func,
    setTooltipText: PropTypes.func,
    sendResultsEmail: PropTypes.func.isRequired,
    deleteCollection: PropTypes.func.isRequired,
};

export default class ImageCollection extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // What panel to display, based on user input by
            // clicking on the buttons (email/del/share) in the right panel
            selectedPanelIndex: 0,
            // Which thumbnail's lift to show
            liftThumbnailId: null,
        };

        this.onControlClick = this.onControlClick.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.onThumbnailMouseover = this.onThumbnailMouseover.bind(this);
        this.onSharePanelLoad = this.onSharePanelLoad.bind(this);
        this.onWhyClick = this.props.onThumbnailClick.bind(this,
            props.rightFeatureThumbnail.thumbnail_id);
        this.onShareControlClick = this.onControlClick.bind(this, 1);
        this.onEmailControlClick = this.onControlClick.bind(this, 2);
        this.onDeleteControlClick = this.onControlClick.bind(this, 3);
        this.onAddControlClick = this.onControlClick.bind(this, 4);
        this.onRightThumbnailClick = this.onRightThumbnailClick.bind(this);
        this.onSendResultsEmail = this.onSendResultsEmail.bind(this);
    }

    onRightThumbnailClick() {
        this.props.onThumbnailClick(this.props.rightFeatureThumbnail.thumbnail_id);
    }

    onControlClick(selectedPanelIndex) {
        // Hide any open tooltip.
        ReactTooltip.hide();
        this.setState({ selectedPanelIndex });
    }

    onThumbnailMouseover(liftThumbnailId) {
        this.setState({ liftThumbnailId });
    }

    onCancelClick() {
        this.onControlClick(0);
    }

    onSharePanelLoad() {
        LoadActions.loadShareUrl(this.props.tagId);
    }

    getLiftValue() {
        const selectedId = this.state.liftThumbnailId;
        const defaultId = this.props.rightFeatureThumbnail.thumbnail_id;
        const map = this.props.thumbLiftMap;
        // The lift value for a map of one thumbnail
        // is undefined to signal that components
        // will not render the lift score.
        if (Object.keys(map).length === 1) {
            return undefined;
        }
        return map[selectedId || defaultId];
    }

    getPanels() {
        const copyOverrideMap = {
            'copy.lift.explanation': 'copy.lift.explanation.images',
            'copy.lift.explanation.solo': 'copy.lift.explanation.images.solo',
        };
        const liftValue = this.getLiftValue();
        if (this.props.infoPanelOnly) {
            return [
                <InfoLiftPanel
                    title={this.props.title}
                    liftValue={this.getLiftValue()}
                    copyOverrideMap={copyOverrideMap}
                    onWhyClick={this.onWhyClick}
                />,
            ];
        }
        return [
            <InfoDemoLiftPanel
                title={this.props.title}
                liftValue={this.getLiftValue()}
                onDemographicChange={this.props.onDemographicChange}
                demographicOptions={this.props.demographicOptions}
                selectedDemographic={this.props.selectedDemographic}
                displayRefilterButton={false}
                copyOverrideMap={copyOverrideMap}
                onWhyClick={this.onWhyClick}
            />,
            <SharePanel
                cancelClickHandler={this.onCancelClick}
                socialClickHandler={this.props.socialClickHandler}
                tagId={this.props.tagId}
                shareUrl={this.props.shareUrl}
                loadShareUrl={this.onSharePanelLoad}
                setTooltipText={this.props.setTooltipText}
            />,
            <EmailPanel
                cancelClickHandler={this.onCancelClick}
                shareUrl={this.props.shareUrl}
                loadShareUrl={this.onSharePanelLoad}
                sendResultsEmail={this.onSendResultsEmail}
            />,
            <DeletePanel
                deleteCollection={this.props.deleteCollection}
                cancelClickHandler={this.onCancelClick}
            />,
            <AddPanel
                tagId={this.props.tagId}
                deleteCollection={this.props.deleteCollection}
                cancelClickHandler={this.onCancelClick}
                panelType="photo"
            />,
        ];
    }

    onSendResultsEmail(email, callback) {
        this.props.sendResultsEmail(email, this.props.tagId, callback);
    }

    getControls() {
        if (this.props.infoPanelOnly) {
            return [];
        }
        return [
            <ShareControl handleClick={this.onShareControlClick} />,
            <EmailControl handleClick={this.onEmailControlClick} />,
            <DeleteControl handleClick={this.onDeleteControlClick} />,
            <AddControl
                handleClick={this.onAddControlClick}
                panelType="photo"
            />,
        ];
    }

    getMobileComponent() {
        const copyOverrideMap = {
            'copy.lift.explanation': 'copy.lift.explanation.images',
            'copy.lift.explanation.solo': 'copy.lift.explanation.images.solo',
        };
        const onRightThumbnailClick = this.isSoloImage()?
            this.onAddControlClick :
            this.onRightThumbnailClick;
        return (
            <MobileBaseCollection
                {...this.props}
                infoActionPanels={this.getPanels()}
                infoActionControls={this.getControls()}
                selectedPanel={this.state.selectedPanelIndex}
                wrapperClassName={'xxCollection xxCollection--photo'}
                liftValue={this.getLiftValue()}
                copyOverrideMap={copyOverrideMap}
                isSoloImage={this.isSoloImage()}
                onRightThumbnailClick={onRightThumbnailClick}
            />
        );
    }

    getDesktopComponent() {

        // If the "Add More" overlay is going to be shown,
        // then clicks on it can select the AddPanel.
        const onRightThumbnailClick = this.isSoloImage()?
            this.onAddControlClick :
            this.onRightThumbnailClick;
        return (
            <BaseCollection
                {...this.props}
                infoActionPanels={this.getPanels()}
                infoActionControls={this.getControls()}
                selectedPanel={this.state.selectedPanelIndex}
                wrapperClassName={'xxCollection xxCollection--photo'}
                setLiftThumbnailId={this.onThumbnailMouseover}
                isSoloImage={this.isSoloImage()}
                onRightThumbnailClick={onRightThumbnailClick}
            />
        );
    }

    isSoloImage() {
        if (this.props) {
            return (this.props.thumbnailLength <= 1)
        }
        return false;
    }

    render() {
        if (this.context.isMobile) {
            return this.getMobileComponent();
        }
        return this.getDesktopComponent();
    }
}

ImageCollection.propTypes = propTypes;
ImageCollection.contextTypes = contextTypes;
