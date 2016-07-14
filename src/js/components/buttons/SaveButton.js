// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import T from '../../modules/translation';
import Icon from '../core/Icon';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SaveButton = React.createClass({
    propTypes: {
        isLoading: React.PropTypes.bool,
        isDisabled: React.PropTypes.bool
    },
    getDefaultProps: function() {
        return {
            isLoading: false,
            isDisabled: false
        }
    },
    render: function() {
        var self = this,
            baseClass = 'button is-medium is-primary',
            loadingClass = self.props.isLoading ? ' is-loading' : '',
            disabledClass = self.props.isDisabled ? ' is-disabled' : ''
        ;
        return (
            <button
                className={baseClass + loadingClass + disabledClass}
                type="submit"
            >
                <Icon type="floppy-o" />
                {T.get('action.save')}
            </button>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SaveButton;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


