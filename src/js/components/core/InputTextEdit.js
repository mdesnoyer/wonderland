// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import AjaxMixin from '../../mixins/Ajax';
import Icon from '../core/Icon';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const fadeTime = 1000;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var InputTextEdit = React.createClass({
    mixins: [AjaxMixin],
    proptypes: {
        valueDest: React.PropTypes.string.isRequired,
        value: React.PropTypes.string.isRequired,
        fallbackValue: React.PropTypes.string.isRequired,
        valueType: React.PropTypes.string.isRequired,
        idType: React.PropTypes.string.isRequired,
        valueId: React.PropTypes.string.isRequired,
        classStyle: React.PropTypes.string,
        videoState: React.PropTypes.string
    },
    getInitialState: function() {
        var self = this,
            isProcessing = self.props.videoState === 'processing'
        ;
        return {
            value: (self.props.value === null) ? self.props.fallbackValue : self.props.value,
            mode: isProcessing ? 'processing' : 'quiet' // loading/success/error/quiet/processing
        }
    },
    componentWillReceiveProps: function(nextProps) {
        var self = this;
            self.setState({
                value: nextProps.value
            });
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        var self = this;
        return ((self.state.mode === 'processing' && nextProps.value !== self.props.value) || ( self.state.mode !== 'processing' && nextState.value !== self.props.value));
    },
    render: function() {
        var self = this;
        return (
            <h5 className="subtitle is-5">{self.state.value}</h5>
        );        
    }
});


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default InputTextEdit

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
