// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import T from '../../modules/translation';
import SignUpForm from '../forms/SignUpForm';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SignUp = React.createClass({
    render: function() {
        var self = this;
        return (
            <div className="xxPageOverlay-content">
                <h1 className="xxSubtitle">{T.get('signUp')}</h1>
                <h2 className="xxTitle">Analyze More Videos</h2>
                <div className="xxText">
                    <p>Create a free account to analyze more videos, see more NeonScores, and understand how images work.</p>
                </div>
                <SignUpForm handleClose={self.props.handleClose} />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SignUp;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -