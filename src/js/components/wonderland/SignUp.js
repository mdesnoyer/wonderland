// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import SignUpForm from '../forms/SignUpForm';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SignUp = React.createClass({
    getInitialState: function() {
        return {
            submissionComplete: false,
        };
    },

    completeSubmission: function() {
        this.setState({
            submissionComplete: true,
        });
    },

    render: function() {
        const { submissionComplete } = this.state;

        if (submissionComplete) {
            return (
                <ReactCSSTransitionGroup transitionName="xxFadeInOut" transitionAppearTimeout={400} transitionAppear={true} transitionLeaveTimeout={400} transitionEnterTimeout={400}>
                    <div className="xxPageOverlay-content">
                        <h1 className="xxTitle">{T.get('copy.signUp.success.title')}</h1>
                        <p>{T.get('copy.signUp.success.body')}</p>
                    </div>
                </ReactCSSTransitionGroup>
            );
        } else {
            return (
                <div className="xxPageOverlay-content">
                    <h1 className="xxSubtitle">{T.get('action.signUp')}</h1>
                    <h2 className="xxTitle">{T.get('copy.signUp.title')}</h2>
                    <SignUpForm
                        completeSubmission={this.completeSubmission}
                        handleClose={this.props.handleClose}
                    />
                </div>
            );
        }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SignUp;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
