import React, { PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';

class InfoActionContainer extends React.Component {

    static displayName = 'InfoActionContainer';

    static propTypes = {
        panels: PropTypes.arrayOf(PropTypes.node).isRequired,
        controls: PropTypes.arrayOf(PropTypes.node).isRequired,
        selectedPanelIndex: PropTypes.number.isRequired,
    }

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

export default InfoActionContainer;
