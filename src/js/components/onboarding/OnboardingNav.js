// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var OnboardingNav = React.createClass({
    propTypes: {
        type: React.PropTypes.string.isRequired,
        onClick: React.PropTypes.func.isRequired,
        barrier: React.PropTypes.number.isRequired,
        progress: React.PropTypes.number.isRequired,
        intro: React.PropTypes.bool
    },
    render: function() {
        var self = this,
            isIntroSlideLeftArrow = self.props.barrier === self.props.progress &&  self.props.intro,
            isIntroSlideRightArrow = self.props.barrier > 0 && self.props.intro,
            isLastSlideRightArrow = self.props.barrier > 0 && self.props.barrier === self.props.progress
        ;
        if(isIntroSlideLeftArrow || isIntroSlideRightArrow || isLastSlideRightArrow) {
            return <a className="column is-2"></a>;
        }
        else{
            return (
            	<a className="column is-2" onClick={self.clicked}>
            	    <span className="icon is-large">
            	        <i className={"fa fa-arrow-circle-o-" + self.props.type} aria-hidden="true"></i>
            	    </span>
            	</a>
            );
        }
    },
    clicked: function(e) {
        if(this.props.onClick) {
            this.props.onClick(true);
        }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default OnboardingNav;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

