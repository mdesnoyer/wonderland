// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, {PropTypes} from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const InfoActionContainer = React.createClass({

    propTypes: {
        panels: PropTypes.arrayOf(PropTypes.element).isRequired
    },

    getInitialState: function() {
        return {
            // Id into props of current panel
            current: 0
        };
    },

    render: function() {
        return (<div/>);
        //(this.props.panels[this.state.current])
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default InfoActionContainer;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
