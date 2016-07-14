// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var PasswordBrothers = React.createClass({
    propTypes: {
        handlePasswordInitialChange: React.PropTypes.func,
        handlePasswordConfirmChange: React.PropTypes.func,
    },
    handlePasswordInitialChange: function(e) {
        var self = this;
        self.props.handlePasswordInitialChange(e);
    },
    handlePasswordConfirmChange: function(e) {
        var self = this;
        self.props.handlePasswordConfirmChange(e);
    },
    render: function() {
        var self = this;
        return (
            <div>
                <div className="xxFormField">
                     <label className="xxLabel">{T.get('label.newPassword')}</label>
                     <input
                         className="xxInputText"
                         type="password"
                         data-ref="passwordInitial"
                         minLength="8"
                         maxLength="64"
                         placeholder={T.get('copy.passwordInitial')}
                         onChange={self.handlePasswordInitialChange}
                         autoComplete="off"
                         required
                     />
                 </div>
                 <div className="xxFormField">
                     <label className="xxLabel">{T.get('copy.passwordVerify')}</label>
                     <input
                         className="xxInputText"
                         type="password"
                         data-ref="passwordConfirm"
                         minLength="8"
                         maxLength="64"
                         placeholder={T.get('copy.passwordConfirm')}
                         onChange={self.handlePasswordConfirmChange}
                         autoComplete="off"
                         required
                     />
                 </div>
            </div>
        )
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default PasswordBrothers

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -