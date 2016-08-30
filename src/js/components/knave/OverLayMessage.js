// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import T from '../../modules/translation';
import OverlayErrorFiles from './OverlayErrorFiles';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var OverLayMessage = React.createClass({
    getInitialState: function(){
        var self = this;
        return {
            isOpen: false
        }
    },
    componentWillReceiveProps: function(nextProps, nextState) {
        var self = this;
        if (nextProps.isOpenMessage !== self.props.isOpenMessage) {
            self.setState({
                isOpen: nextProps.isOpenMessage
            });
        }
    },
    render: function() {
        var self = this;
        var message = typeof self.props.overlayCode === 'number' ? 'general' : self.props.overlayCode
        return (
            <div>
                <section className="xxOverlay">
                    <div className="xxOverlay-content">
                    <h2 className="xxTitle">{T.get('uploadError.title.' + message )}</h2>
                    <h3 className="xxOnboardingSlide-description">{T.get('uploadError.msg.' + message)}</h3>
                    <OverlayErrorFiles errorFiles={self.props.errorFiles} />
                    <fieldset>
                        <div className="xxCollectionAction-buttons">
                            <button
                                className="xxButton xxButton--highlight"
                                type="button"
                                data-button-type="close"
                                onClick={self.handleClick}
                            >{'Got It!'}</button>
                            <button
                                className="xxButton xxButton--highlight"
                                type="button"
                                data-button-type="action"
                                onClick={self.handleClick}
                            >{"placeholder"}</button>
                        </div>
                    </fieldset>
                    </div>
                </section>
            </div>
        );
    },
    handleClick: function(e) {
        this.props.overlayReset(e);
        // var self = this,
        //     buttonType = e.target.dataset.buttonType === "action"
        // ;
        // self.setState({
        //     isOpen: !self.state.isOpen
        // }, function() {
        //     if (self.props.messageFunction && buttonType) {
        //         self.props.messageFunction(e); 
        //     }
        // });
    },
    getDefaultProps: function() {
        return {
            message: 'There Seems to be and Error!',
            isOpenMessage: false
        };
     },
    propTypes: {
        message: React.PropTypes.string,
        messageFunction: React.PropTypes.func,
        isOpenMessage: React.PropTypes.bool,
        type: React.PropTypes.string
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default OverLayMessage

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
