// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var TutorialPanel = React.createClass({
    propTypes: {
        icon: React.PropTypes.string.isRequired,
        direction: React.PropTypes.string.isRequired
    },
    render: function() {
        var self = this;
        return (
            <div className="card column is-third">
                <div className="card-content is-text-centered">
                    <div className="icon is-large">
                        <i className={'fa fa-' + self.props.icon}></i>
                    </div>
                    <div className="content">
                        <span dangerouslySetInnerHTML={{__html: self.props.direction}} />
                    </div>
                </div>
            </div>
        );
    }
})
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default TutorialPanel;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
