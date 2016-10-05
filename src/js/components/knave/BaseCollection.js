import React, { PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';

import UTILS from '../../modules/utils';
import { LoadActions } from '../../stores/CollectionStores';
import {
    InfoDemoLiftPanel,
    EmailControl,
    EmailPanel,
    SharePanel,
    FilterPanel,
    DeletePanel,
    ShareControl,
    DeleteControl } from './InfoActionPanels';
import InfoActionContainer from './InfoActionContainer';

class BaseCollection extends React.Component {

    static displayName = 'BaseCollection';

    static propTypes = {

        tagId: PropTypes.string.isRequired,

        featureContent: PropTypes.node.isRequired,
        subContent: PropTypes.node,

        controls: PropTypes.arrayOf(PropTypes.node).isRequired,
        panels: PropTypes.arrayOf(PropTypes.node).isRequired,
        selectedPanelIndex: PropTypes.number.isRequired,

        // Handlers for image events
        onThumbnailClick: PropTypes.func,

        // Email handler.
        onSendResultEmail: PropTypes.func,

        // class name for the wrapper around the
        // component defaults to xxCollection
        wrapperClassName: PropTypes.string,

        // A map of T get key string to T get key
        // e.g., {'action.showMore': 'copy.thumbnails.low', ...}
        // overrides "Show More" with "View Low Scores"
        copyOverrideMap: PropTypes.objectOf(PropTypes.string),

        onSetTooltipText: PropTypes.func,
        onDeleteCollection: PropTypes.func,
        onDemographicChange: PropTypes.func,
        onSocialShare: PropTypes.func,
        objectLiftMap: PropTypes.objectOf(PropTypes.number).isRequired,

        isViewOnly: PropTypes.bool.isRequired,
        shareUrl: PropTypes.string,
        title: PropTypes.string.isRequired,
        demographicOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
        selectedDemographic: PropTypes.objectOf(PropTypes.number).isRequired,
        isRefiltering: PropTypes.bool,
        timeRemaining: PropTypes.number,

    }

    static defaultProps = {
        wrapperClassName: 'xxCollection',
    }

    static contextTypes = {
        isMobile: PropTypes.bool,
    }


    constructor(props) {
        super(props);

        this.onControlCancelClick = this.onControlClick.bind(this, 0);
        this.onControlClick = this.onControlClick.bind(this);
        this.onControlRefilterClick = this.onControlClick.bind(this, 1);
        this.onDeleteCollection = this.onDeleteCollection.bind(this);
        this.onDemographicChange = this.onDemographicChange.bind(this);
        this.onLess = this.onLess.bind(this);
        this.onLoadShareUrl = this.onLoadShareUrl.bind(this);
        this.onMore = this.onMore.bind(this);
        this.onSendResultEmail = this.onSendResultEmail.bind(this);
        this.onSetDefaultLiftObject = this.onSetLiftObjectId.bind(this, null);
        this.onSetLiftObjectId = this.onSetLiftObjectId.bind(this);
        this.onThumbnailClick = this.onThumbnailClick.bind(this);
    }

    onControlClick(index) {
        // Hide any open tooltip.
        ReactTooltip.hide();
        this.setState({ selectedPanelIndex: index || 0 });
    }

    onDeleteCollection() {
        this.props.onDeleteCollection(this.props.tagId);
    }

    onDemographicChange(gender, age) {
        this.props.onDemographicChange(this.props.tagId, gender, age);
    }

    onThumbnailClick(thumbnailId) {
        this.props.onThumbnailClick(this.props.tagId, thumbnailId);
    }

    onLoadShareUrl() {
        LoadActions.loadShareUrl(this.props.tagId);
    }

    onSendResultEmail(email, callback) {
        this.props.onSendResultEmail(email, this.props.tagId, callback);
    }

    onSetLiftObjectId(liftObjectId) {
        this.setState({ liftObjectId });
    }

    onSetPanel(selectedPanelIndex) {
        // Clear any open tooltip.
        ReactTooltip.hide();
        this.setState({ selectedPanelIndex });
    }

    onMore(e) {
        e.preventDefault();
        this.setState({
            smallContentRows: this.state.smallContentRows + 3,
        });
    }

    onLess(e) {
        e.preventDefault();
        this.setState({
            smallContentRows: 1,
        });
    }

    onSetDefaultLift() {
        this.onSetLiftObjectId(null);
    }

    onControlCancelClick() {
        return this.onControlClick();
    }

    onControlRefilterClick() {
        this.onControlClick(1);
    }

    getLiftValue() {
        const selectedId = this.state.liftObjectId;
        const defaultId = this.getDefaultLiftObjectId();
        const map = this.props.objectLiftMap;
        // The lift value for a map of one thumbnail
        // is undefined to signal that components
        // will not render the lift score.
        if (Object.keys(map).length <= 1) {
            return undefined;
        }
        return map[selectedId || defaultId];
    }

    getBasePanels(copyOverrideMap = {}) {
        const unapply = UTILS.applyTranslationOverride(copyOverrideMap);
        const panels = [
            <InfoDemoLiftPanel
                title={this.props.title}
                liftValue={this.getLiftValue()}
                onDemographicChange={this.onDemographicChange}
                demographicOptions={this.props.demographicOptions}
                selectedDemographic={this.props.selectedDemographic}
                onControlRefilterClick={this.onControlRefilterClick}
                isRefiltering={this.props.isRefiltering}
                timeRemaining={this.props.timeRemaining}
                copyOverrideMap={copyOverrideMap}
                onWhyClick={this.onWhyClick}
            />,
            <FilterPanel
                onDemographicChange={this.onDemographicChange}
                onCancelClick={this.onControlCancelClick}
                onRefilterVideo={this.onRefilterVideo}
            />,
            <SharePanel
                tagId={this.props.tagId}
                shareUrl={this.props.shareUrl}
                onCancelClick={this.onControlCancelClick}
                onLoadShareUrl={this.onLoadShareUrl}
                onSetTooltipText={this.props.onSetTooltipText}
                onSocialShare={this.props.onSocialShare}
            />,
            <EmailPanel
                shareUrl={this.props.shareUrl}
                onLoadShareUrl={this.onLoadShareUrl}
                onSendResultEmail={this.onSendResultEmail}
                onCancelClick={this.onControlCancelClick}
            />,
            <DeletePanel
                onDeleteCollection={this.onDeleteCollection}
                onCancelClick={this.onControlCancelClick}
            />,
        ];
        unapply();
        return panels;
    }

    // Get the common set of controls.
    getBaseControls() {
        if (this.props.isViewOnly) {
            return [];
        }
        return [
            // Index=0 is the info panel.
            // Index=1 is the refilter panel.
            <ShareControl index={2} onClick={this.onControlClick} />,
            <EmailControl index={3} onClick={this.onControlClick} />,
            <DeleteControl index={4} onClick={this.onControlClick} />,
        ];
    }

    renderDesktop(componentMap) {
        return (
            <BaseCollection
                {...this.props}
                {...componentMap}
                selectedPanelIndex={this.state.selectedPanelIndex}
            />
        );
    }

    render() {
        // Let mapped labels be overriden.
        const unapplyOverride = UTILS.applyTranslationOverride(
            this.props.copyOverrideMap);

        const result = (
            <div className={this.props.wrapperClassName}>
                <div className="xxCollectionImages">
                    {this.props.featureContent}
                    {this.props.subContent}
                </div>
                <div className="xxCollection-content">
                    <InfoActionContainer
                        panels={this.props.panels}
                        controls={this.props.controls}
                        selectedPanelIndex={this.props.selectedPanelIndex}
                    />
                </div>
            </div>
        );
        // Remove translation override.
        unapplyOverride();
        return result;
    }
}

export default BaseCollection;
