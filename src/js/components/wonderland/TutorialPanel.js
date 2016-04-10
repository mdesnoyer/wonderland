// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var TutorialPanel = React.createClass({
    render: function() {
        return (
            <div className="card column is-quarter">
                <div className="card-content is-text-centered">
                    <div className="icon is-large">
                        <i className={"fa fa-" + this.props.icon}></i>
                    </div>
                    <div className="content">
                        {this.props.direction}
                    </div>
                </div>
            </div>
        );
    }
})
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default TutorialPanel;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
