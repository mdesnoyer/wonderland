// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var OnboardingSlide = React.createClass({
    propTypes: {
        step: React.PropTypes.string,
        message: React.PropTypes.string
    },
    render: function() {
        var self = this;
        return (
        	<div className="column tile is-parent">
        	  <article className="tile is-child">
        	    <p className="title">{self.props.step}</p>
        	    <p className="subtitle">{self.props.message}</p>
        	  </article>
        	</div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default OnboardingSlide;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
