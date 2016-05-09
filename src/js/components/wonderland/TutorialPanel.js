// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var TutorialPanel = React.createClass({
	// mixins: [ReactDebugMixin],
    propTypes: {
        icon: React.PropTypes.string.isRequired,
        direction: React.PropTypes.string.isRequired
    },
    render: function() {
        var self = this;
        return (
            <div className="card column is-one-third">
                <div className="card-content has-text-centered">
                    <div className="icon is-large">
                        <i className={'fa fa-' + self.props.icon} aria-hidden="true"></i>
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
