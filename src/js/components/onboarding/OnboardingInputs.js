// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import OnboardingInput from './OnboardingInput';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var OnboardingInputs = React.createClass({
    propTypes: {
        inputProps: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired
    },
    render: function() {
        var self = this,
            inputs = self.props.inputProps
        ;
        return (
            <p className="control">
                {Object.keys(inputs).map(function(input, idx) {
                    return <OnboardingInput className="button is-primary" inputType={inputs[input].inputType} onChange={self.props.onChange}key={idx} />
                }.bind(self))}
            </p>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default OnboardingInputs;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
