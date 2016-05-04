// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import T from '../../modules/translation';
// import ReactDebugMixin from 'react-debug-mixin';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var SaveButton = React.createClass({
    // mixins: [ReactDebugMixin],
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
                <i className="fa fa-floppy-o" aria-hidden="true"></i>
                &nbsp;{T.get('action.save')}
            </button>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default SaveButton;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


