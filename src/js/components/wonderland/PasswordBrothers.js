// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var PasswordBrothers = React.createClass({
    // mixins: [ReactDebugMixin],
    _minLength: 8,
    _maxLength: 64,
    propTypes: {
        handlePasswordInitialChange: React.PropTypes.func,
        handlePasswordConfirmChange: React.PropTypes.func,
        mode: React.PropTypes.string.isRequired
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
            <p className={'control is-grouped is-' + self.props.mode}>
                <input className="input is-medium"
                    type="password"
                    ref="passwordInitial"
                    required
                    minLength={self._minLength}
                    maxLength={self._maxLength}
                    placeholder={T.get('copy.passwordInitial')}
                    onChange={self.handlePasswordInitialChange}
                    autoComplete="off"
                />
                <input className="input is-medium"
                    type="password"
                    ref="passwordConfirm"
                    required
                    minLength={self._minLength}
                    maxLength={self._maxLength}
                    placeholder={T.get('copy.passwordConfirm')}
                    onChange={self.handlePasswordConfirmChange}
                    autoComplete="off"
                />
            </p>
        )
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default PasswordBrothers

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


