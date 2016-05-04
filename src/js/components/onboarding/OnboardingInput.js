// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var OnboardingInput = React.createClass({
    propTypes: {
        inputType: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired
    },
    render: function() {
        var self = this;
        return <input className="input" onChange={this.changed} placeholder={self.props.inputType} />;
    },
    changed: function(e){
        if(this.props.onChange) {
            this.props.onChange(e.target.value);
        }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default OnboardingInput;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
