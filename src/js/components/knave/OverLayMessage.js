// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import T from '../../modules/translation';

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
        return (
            <div>
                {
                    self.state.isOpen ? (
                        <section className="xxOverlay">
                            <div className="xxOverlay-content">
                            <h2 className="xxTitle">{T.get('copy.analyzeVideo.maxLimitHit')}</h2>
                            <h3 className="xxOnboardingSlide-description">{T.get('copy.analyzeVideo.limitMessage')}</h3>
                            <fieldset>
                                <div className="xxCollectionAction-buttons">
                                    <button
                                        className="xxButton xxButton--highlight"
                                        type="button"
                                        data-button-type="close"
                                        onClick={self.handleClick}
                                    >Got It!</button>
                                    <button
                                        className="xxButton xxButton--highlight"
                                        type="button"
                                        data-button-type="action"
                                        onClick={self.handleClick}
                                    >Sign Up</button>
                                </div>
                            </fieldset>
                            </div>
                        </section>
                    ): null
                }
            </div>
        );
    },
    handleClick: function(e) {
        var self = this,
            buttonType = e.target.dataset.buttonType === "action"
        ;
        self.setState({
            isOpen: !self.state.isOpen
        }, function() {
            if (self.props.messageFunction && buttonType) {
                self.props.messageFunction(e); 
            }
        });
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
        isOpenMessage: React.PropTypes.bool
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default OverLayMessage

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
