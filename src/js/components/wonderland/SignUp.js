// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import SignUpForm from '../forms/SignUpForm';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SignUp = React.createClass({
    render: function() {
        var self = this,
            logIn = T.get('copy.signUp.logIn', {
                '@link' : UTILS.DRY_NAV.SIGNIN.URL
            })
        ;
        return (
            <div className="xxPageOverlay-content">
                <h1 className="xxSubtitle">{T.get('signUp')}</h1>
                <h2 className="xxTitle">{T.get('copy.signUp.title')}</h2>
                <div className="xxText">
                    <p>{T.get('copy.signUp.body')}</p>
                    <p dangerouslySetInnerHTML={{__html: logIn}} />
                </div>
                <SignUpForm handleClose={self.props.handleClose} />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SignUp;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -