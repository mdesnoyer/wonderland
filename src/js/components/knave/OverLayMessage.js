// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var OverLayMessage = React.createClass({
    getInitialState: function(){
        return {
            isOpen: true
        }
    },
    componentWillUnMount: function() {
        var self = this; 
        self.setState({
            isOpen: true 
        })
    },
    render: function() {
        var self = this; 
        return (
            <div>
                {
                    !self.state.isOpen ? null : (
                        <section className="xxOverlay">
                            <div className="xxOverlay-content">
                            <h2 className="xxTitle">You've hit your limit!</h2>
                            <h3 className="xxOnboardingSlide-description">Come back tomorrow to process more videos, or sign up to increase your limit.</h3>
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
                    )
                }
            </div>
        );
    },
    handleClick: function(e) {
        var self = this,
            buttonType = e.target.dataset.buttonType === "action"
        ;
        e.persist();
        self.setState({
            isOpen: false
        }, function() {   
            if (self.props.messageFunction && buttonType) {
                self.props.messageFunction(e);   
            }
        })
    },
    getDefaultProps: function() {
        return {
            message: 'There Seems to be and Error!'
        };
     },
    propTypes: {
        message: React.PropTypes.string,
        messageFunction: React.PropTypes.func
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default OverLayMessage

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
