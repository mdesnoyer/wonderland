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
        var self = this,
            title,
            description,
            firstButtonLabel,
            secondButtonLabel
        ;

        switch(self.props.type) {
            case 'limit':
                title = T.get('copy.analyzeVideo.maxLimitHit');
                description = T.get('copy.analyzeVideo.limitDate');
                firstButtonLabel = T.get('gotIt');
                secondButtonLabel = T.get('action.signUp');
                break;
            default:
                title ='title';
                description ='description';
                firstButtonLabel ='firstButtonLabel';
                secondButtonLabel ='secondButtonLabel';
        }
        return (
            <div>
                {
                    self.state.isOpen ? (
                        <section className="xxOverlay">
                            <div className="xxOverlay-content">
                            <h2 className="xxTitle">{title}</h2>
                            <h3 className="xxOnboardingSlide-description">{description}</h3>
                            <OverlayErrorFiles />
                            <fieldset>
                                <div className="xxCollectionAction-buttons">
                                    <button
                                        className="xxButton xxButton--highlight"
                                        type="button"
                                        data-button-type="close"
                                        onClick={self.handleClick}
                                    >{firstButtonLabel}</button>
                                    <button
                                        className="xxButton xxButton--highlight"
                                        type="button"
                                        data-button-type="action"
                                        onClick={self.handleClick}
                                    >{secondButtonLabel}</button>
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
        isOpenMessage: React.PropTypes.bool,
        type: React.PropTypes.string
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default OverLayMessage

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
