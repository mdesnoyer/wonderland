// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var OnboardingSlide = React.createClass({
    propTypes: {
        step: React.PropTypes.string
    },
    render: function() {
        var self = this,
            message = self.props.message,
            displayMessage
        ;
        if(message.constructor === Array) {
           displayMessage = (
                <p className="content">
                    {message.map(function(result) {
                        return <p>{result}</p>
                    })}
                </p>
            );
        }
        else 
            {
                displayMessage = <p className="subtitle">{self.props.message}</p>
            }
        return (
        	<div className="column tile is-parent">
        	  <article className="tile is-child">
        	    <p className="title">{self.props.step}</p>
        	    {displayMessage}
        	  </article>
        	</div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default OnboardingSlide;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
