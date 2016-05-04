// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var OnboardingButtons = React.createClass({
    propTypes: {
        buttonProps: React.PropTypes.object.isRequired,
        onClick: React.PropTypes.func.isRequired
    },
    render: function() {
        var self = this,
            buttons = self.props.buttonProps
        ;
        return (
            <ul className="control">
                {Object.keys(buttons).map(function(button, idx) {
                    return <li key={idx} ><input className="button is-primary" type={buttons[button].type} value={buttons[button].name} data-response={buttons[button].response} onClick={self.clicked} /></li>
                }.bind(self))}
            </ul>
        );
    },
    clicked: function(e) {
        var self = this;
        if(self.props.onClick) {
            self.props.onClick(
                e.target.value, 
                e.target.dataset.response, 
                e.target.type
            );
        }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default OnboardingButtons;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
