// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import LearnMore from './LearnMore';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var PageOverlay = React.createClass({
    getInitialState: function() {
        var self = this;
        return {
            overlayOpen: self.props.overlayOpen
        };
    },
    handleBackgroundClose: function(e) {
        var self = this;
        e.preventDefault();
        self.setState({
            overlayOpen: false
        });
        console.log('background close');
        // tell site nav to close as well
    },
    handleClose: function(e) {
        var self = this;
        e.preventDefault();
        self.setState({
            overlayOpen: false
        });
        console.log('click close');
        // tell site nav to close as well
    },
    render: function() {
        var self = this,
            content = ''
        ;
        switch (self.props.overlayContent) {
            case 'learnMore':
                content = <LearnMore />;
                break;
            case 'contact':
                content = <div>Contact</div>;
                break;
            case 'signUp':
                content = <div>Sign Up</div>;
                break;
            case 'signIn':
                content = <div>Sign In</div>;
                break;
            case 'account':
                content = <div>Account</div>;
                break;
            default:
                break;
        }
        return (
            <div className="xxOverlay xxOverlay--scroll xxOverlay--visibleNav" onClick={self.handleBackgroundClose}>
                <div className="xxPageOverlay">
                    <a href="" className="xxPageOverlay-close" onClick={self.handleClose}>Close</a>
                    {content}
                </div>
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default PageOverlay;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -