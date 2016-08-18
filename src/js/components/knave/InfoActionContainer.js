// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, {PropTypes} from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const InfoActionContainer = React.createClass({

    propTypes: {
        controls: PropTypes.array.isRequired
    },

    getInitialState: function() {
        return {
            // Id into props.children of current panel
            current: 0
        };
    },

    render: function() {
        // Convert single child children to array.
        const children = React.Children.toArray(this.props.children);
        const selected = children[this.state.current];
        let panelId = 0;
        // TODO need to wrap with click handlers with panelId
        const controls = this.props.controls.map(control => {
            return (
                <li
                    key={control.type.displayName}
                    className="xxCollectionActions-item"
                >
                    {control}
                </li>
            );
        });
        return (
            <div>
                {selected}
                <ul className="xxCollectionActions">
                    {controls}
                </ul>
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default InfoActionContainer;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
