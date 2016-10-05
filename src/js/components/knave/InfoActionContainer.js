import React, { PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';

class InfoActionContainer extends React.Component {

    static displayName = 'InfoActionContainer';

    static propTypes = {
        // User's name of this collection
        title: PropTypes.string.isRequired,
        panels: PropTypes.arrayOf(PropTypes.node).isRequired,
        controls: PropTypes.arrayOf(PropTypes.node).isRequired,
        // If null, collapse the content; else this
        // a number index into the panels array.
        selectedPanelIndex: PropTypes.number,
    }

    static contextTypes = {
        isMobile: PropTypes.bool,
    }

    constructor(props) {
        super(props);
        this.state = { isControlOpen: null };
        this.onControlToggleClick = this.onControlToggleClick.bind(this);
    }

    componentDidUpdate() {
        // Needed to display the static tooltips that are bound
        // to newly mounted UI elements.
        ReactTooltip.rebuild();
    }

    onControlToggleClick() {
        const isControlOpen = !this.state.isControlOpen;
        this.setState({ isControlOpen });
    }

    renderControls() {
        if (this.state.isControlOpen === false ||
            (this.state.isControlOpen === null && this.props.selectedPanelIndex === null)) {
            // Then collapse the controls.
            return null;
        }
        const controls = this.props.controls.map(control => (
            <li
                key={control.type.displayName}
                className="xxCollectionActions-item"
            >
                {control}
            </li>
        ));
        return (
            <ul key="controls" className="xxCollectionActions">
                {controls}
            </ul>
        );
    }

    renderSelectedPanel() {
        if (this.state.isControlOpen === false || this.props.selectedPanelIndex === null) {
            return null;
        }
        return this.props.panels[this.props.selectedPanelIndex];
    }

    renderControlToggle() {
        if (this.state.isControlOpen !== null || this.props.selectedPanelIndex === null) {
            const classNames = ['xxPagingControls-next', 'xxPagingControls-next--GifClip'];
            if (this.state.isControlOpen) {
                classNames.push('xxPagingControls-next--mobileControlOpen');
            }
            return (
                <button
                    key="toggle"
                    className={classNames.join(' ')}
                    onClick={this.onControlToggleClick}
                />
            );
        }
        return null;
    }

    render() {
        const className = this.context.isMobile ?
            'xxCollection-controlPanel--mobile' :
            'xxCollection-controlPanel';
        return (
            <div>
                <div className={className}>
                    <h1 className="xxCollection-title">
                        {this.props.title}
                    </h1>
                    {this.renderControlToggle()}
                </div>
                {this.renderSelectedPanel()}
                {this.renderControls()}
            </div>
        );
    }
}

export default InfoActionContainer;
