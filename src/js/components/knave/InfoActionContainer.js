// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, {PropTypes} from 'react';

import ReactTooltip from 'react-tooltip';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const InfoActionContainer = React.createClass({

    propTypes: {
        // a mapping from string to index where 
        // string is the shortname of the the control 
        // and the int is the index into the panel array 
        controls: PropTypes.array.isRequired,

        // selectedPanel gets from user input on the parent object
        selectedPanel: PropTypes.number.isRequired
    },

    componentDidUpdate() {
        // Needed to display the static tooltips that are bound
        // to newly mounted UI elements.
        ReactTooltip.rebuild();
    },

    render: function() {
        // Convert single child children to array.
        const children = React.Children.toArray(this.props.children);
        const selected = children[this.props.selectedPanel];
        var control_array = this.props.controls;
        const controls = control_array.map(control => {
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
