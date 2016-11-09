import React, { PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';

import InfoActionContainer from './InfoActionContainer';
import Lift from './Lift';
import {
    InfoDemoLiftPanel,
    EmailControl,
    EmailPanel,
    SharePanel,
    FilterPanel,
    DeletePanel,
    ShareControl,
    DeleteControl } from './InfoActionPanels';
import { LoadActions } from '../../stores/CollectionStores';
import UTILS from '../../modules/utils';

class Collection extends React.Component {

    static displayName = 'Collection';

    static propTypes = {

        tagId: PropTypes.string.isRequired,

        featureContent: PropTypes.node.isRequired,
        subContent: PropTypes.node,

        controls: PropTypes.arrayOf(PropTypes.node).isRequired,
        panels: PropTypes.arrayOf(PropTypes.node).isRequired,
        selectedPanelIndex: PropTypes.number,

        // Handlers for image events
        onThumbnailClick: PropTypes.func,

        // Email handler.
        onSendResultEmail: PropTypes.func,

        // class name for the wrapper around the
        // component defaults to xxCollection
        wrapperClassName: PropTypes.string,

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

    constructor(props, context) {
        super(props, context);

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

    onControlClick(selectedPanelIndex) {
        // Hide any open tooltip.
        ReactTooltip.hide();
        this.setState({ selectedPanelIndex });
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

    onMore(e) {
        e.preventDefault();
        this.setState({
            smallContentRows: this.state.smallContentRows + 3,
        });
    }

    onLess(e) {
        e.preventDefault();
        // If the small content has been expanded from 1 row, then
        // reset it to 1 else reset it to 0 (fully collapsed).
        const smallContentRows = this.state.smallContentRows > 3 ? 1 : 0;
        this.setState({ smallContentRows });
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

    getBasePanels(copyOverrideMap) {
        const unapply = UTILS.applyTranslationOverride(copyOverrideMap);
        const panels = [
            <InfoDemoLiftPanel
                key="info"
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
                key="filter"
                onDemographicChange={this.onDemographicChange}
                onCancelClick={this.onControlCancelClick}
                onRefilterVideo={this.onRefilterVideo}
            />,
            <SharePanel
                key="share"
                tagId={this.props.tagId}
                shareUrl={this.props.shareUrl}
                onCancelClick={this.onControlCancelClick}
                onLoadShareUrl={this.onLoadShareUrl}
                onSetTooltipText={this.props.onSetTooltipText}
                onSocialShare={this.props.onSocialShare}
            />,
            <EmailPanel
                key="email"
                shareUrl={this.props.shareUrl}
                onLoadShareUrl={this.onLoadShareUrl}
                onSendResultEmail={this.onSendResultEmail}
                onCancelClick={this.onControlCancelClick}
            />,
            <DeletePanel
                key="delete"
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

    renderAsMobile(subcontent, copyOverrideMap) {
        if (this.context.isMobile) {
            return (
                <div>
                    <Lift
                        displayThumbLift={this.getLiftValue()}
                        copyOverrideMap={copyOverrideMap}
                        onWhyClick={this.onWhyClick}
                    />
                    {subcontent}
                </div>
            );
        }
        return subcontent;
    }

    render() {
        return (
            <div className={this.props.wrapperClassName}>
                <div key="panel" className="xxCollection-content">
                    <InfoActionContainer
                        title={this.props.title}
                        panels={this.props.panels}
                        controls={this.props.controls}
                        selectedPanelIndex={this.props.selectedPanelIndex}
                        isViewOnly={this.props.isViewOnly}
                    />
                </div>
                <div key="content" className="xxCollectionImages">
                    {this.props.featureContent}
                    {this.props.subContent}
                </div>
            </div>
        );
    }
}

export default Collection;