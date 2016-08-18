// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, {PropTypes} from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const TitleFilterLiftPanel = React.createClass({
    render: function() {
        (<div>
            <h1>{this.props.title}</h1>
            <h2>Filter</h2><select><input>Male</input><input>Female</input></select>
        </div>);

    }
});


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default TitleFilterLiftPanel;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
