// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import AJAX from '../../modules/ajax';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

const fadeTime = 1000;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var InputTextEdit = React.createClass({
    proptypes: {
        valueDest: React.PropTypes.string.isRequired,
        value: React.PropTypes.string.isRequired,
        fallbackValue: React.PropTypes.string.isRequired,
        valueType: React.PropTypes.string.isRequired,
        idType: React.PropTypes.string.isRequired,
        valueId: React.PropTypes.string.isRequired,
        classStyle: React.PropTypes.string
    },
    getInitialState: function() {
        var self = this;
        return {
            value: self.props.value,
            mode: 'silent' // loading/success/error/silent
        }
    },
    componentDidMount: function() {
        var self = this;
        self._isMounted = true;
    },
    componentWillUnmount: function() {
        var self = this;
        self._isMounted = false;
    },
    render: function() {
        var self = this,
            controlClassName = '',
            iconType = ''
        ;
        switch(self.state.mode) {
            case 'success':
                iconType = 'fa fa-check';
                break;
            case 'error':
                iconType = 'fa fa-times';
                break;
            case 'loading':
                iconType = 'fa fa-cog fa-spin';
                controlClassName = 'is-disabled';
                break;
            case 'silent':
                iconType = 'fa fa-pencil';
                break;
        }
        return (
            <div className={'control has-icon has-icon-right'}>
                <input 
                    className={self.props.classStyle + ' input wonderland-input-text-edit'}
                    type="text"
                    ref="inputElement"
                    onChange={self.handleChange}
                    onBlur={self.handleBlur}
                    value={self.state.value}
                    onKeyDown={self.handleKeyDown}
                />
                <i className={iconType} aria-hidden="true"></i>
            </div>
        );
    },
    handleBlur: function(e) {
        var self = this;
        self.blurProcess();
    },
    handleChange(e) {
        var self = this;
        self.setState({
            value: e.target.value
        });
    },
    handleKeyDown: function(e) {
        var self = this;
        //enter key == 13 
        if (e.keyCode == 13) {
            self.refs.inputElement.blur();
        }
    },
    blurProcess: function() {
        var self = this;
        self.setState({
            mode: 'loading',
            value: self.state.value || self.props.fallbackValue 
        }, 
        self.putValue()
        );
    },
    putValue: function() {
        var self = this,
            options = {
                data: {
                    [self.props.idType] : self.props.valueId,
                    [self.props.valueType] : self.state.value
                }
            }
        ;
        AJAX.doPut(self.props.valueDest, options)
            .then(function(json) {
                if (self._isMounted) {
                    self.setState({
                        mode: 'success'
                    }, 
                    self.fadeOutIcon()
                    );
                }
            })
            .catch(function(err) {
                if (self._isMounted) {
                    self.setState({
                        mode: 'error'
                    }, 
                    self.fadeOutIcon()
                    );
                }
            });
    },
    fadeOutIcon: function() {
        var self = this; 
        setTimeout(function(){
            if (self._isMounted) {
                self.setState({
                    mode: 'silent'
                });
            }
        }, fadeTime);
    }
});


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default InputTextEdit

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
