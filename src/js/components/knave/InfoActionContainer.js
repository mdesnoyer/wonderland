import React, { PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';

const propTypes = {
    panels: PropTypes.arrayOf(PropTypes.node).isRequired,
    controls: PropTypes.arrayOf(PropTypes.node).isRequired,
    selectedPanelIndex: PropTypes.number.isRequired,
};

class InfoActionContainer extends React.Component {

    componentDidUpdate() {
        // Needed to display the static tooltips that are bound
        // to newly mounted UI elements.
        ReactTooltip.rebuild();
    }

    renderSelectedPanel() {
        if (this.props.selectedPanelIndex === null) {
            return null;
        }
        return this.props.panels[this.props.selectedPanelIndex];
    }

    render() {
        const controls = this.props.controls.map(control => (
            <li
                key={control.type.displayName}
                className="xxCollectionActions-item"
            >
                {control}
            </li>
        ));

        return (
            <div>
                {this.renderSelectedPanel()}
                <ul className="xxCollectionActions">
                    {controls}
                </ul>
            </div>
        );
    }
}
InfoActionContainer.propTypes = propTypes;

export default InfoActionContainer;
