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
        var self = this
            // controlClassName = '',
            // iconType
        ;
        // switch(self.state.mode) {
        //     case 'processing':
        //         iconType = '';
        //         controlClassName = ' is-disabled';
        //         break;
        //     case 'success':
        //         iconType = 'fa fa-check';
        //         break;
        //     case 'error':
        //         iconType = 'fa fa-times';
        //         break;
        //     case 'loading':
        //         iconType = 'fa fa-cog fa-spin';
        //         break;
        //     case 'quiet':
        //         iconType = 'fa fa-pencil';
        //         break;
        // }
        // return (
        //     <div className={'control has-icon has-icon-right' + controlClassName}>
        //         <input
        //             className={self.props.classStyle + ' input wonderland-input-text-edit'}
        //             type="text"
        //             ref="inputElement"
        //             onChange={self.handleChange}
        //             onBlur={self.handleBlur}
        //             value={self.state.value}
        //             onKeyDown={self.handleKeyDown}
        //         />
        //         <Icon
        //             type={iconType}
        //             nowrap={true}
        //         />
        //     </div>
        // );
        return (
            <h5 className="subtitle is-5">{self.state.value}</h5>
        );
        
    }
    // handleBlur: function(e) {
    //     var self = this;
    //     self.blurProcess();
    // },
    // handleChange: function(e) {
    //     var self = this;
    //     self.setState({
    //         value: e.target.value
    //     });
    // },
    // handleKeyDown: function(e) {
    //     var self = this;
    //     //enter key == 13
    //     if (e.keyCode == 13) {
    //         self.refs.inputElement.blur();
    //     }
    // },
    // blurProcess: function() {
    //     var self = this;
    //     self.setState({
    //         mode: 'loading',
    //         value: self.state.value || self.props.fallbackValue
    //     },
    //         function() {
    //             self.putValue()
    //     }
    //     );
    // },
    // putValue: function() {
    //     var self = this,
    //         options = {
    //             data: {
    //                 [self.props.idType] : self.props.valueId,
    //                 [self.props.valueType] : self.state.value
    //             }
    //         }
    //     ;
    //     self.PUT(self.props.valueDest, options)
    //         .then(function(json) {
    //             self.setState(
    //                 {
    //                     mode: 'success'
    //                 },
    //                 self.fadeOutIcon()
    //             );
    //         })
    //         .catch(function(err) {
    //             self.setState(
    //                 {
    //                     mode: 'error'
    //                 },
    //                 self.fadeOutIcon()
    //             );
    //         });
    // },
    // fadeOutIcon: function() {
    //     var self = this;
    //     setTimeout(function() {
    //         self.setState({
    //             mode: 'quiet'
    //         })
    //     }, fadeTime);
    // }
});


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default InputTextEdit

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
