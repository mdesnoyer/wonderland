// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import SignUpForm from '../forms/SignUpForm';
import T from '../../modules/translation';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';
import SESSION from '../../modules/session';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SignInPage = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {
            submissionComplete: false
        };
    },
    componentWillMount: function() {
        var self = this;
        if (SESSION.isUser()) {
            self.context.router.push(UTILS.DRY_NAV.DASHBOARD.URL);
        }
    },
    completeSubmission: function() {
        this.setState({
            submissionComplete: true
        });
    },
    handleBack: function() {
        var self = this;
        self.context.router.push(UTILS.DRY_NAV.HOME.URL);
    },
    render: function() {
        var self = this;
        return (
            <main className="xxPage">
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.signUp.head.title'))}
                    meta={[{"name": "viewport", "content": "width=device-width, initial-scale=1.0"},]}
                />
                <SiteHeader />
                <section className="xxMainForm">
                    <h1 className="xxSubtitle">{T.get('action.signUp')}</h1>
                    <h2 className="xxTitle">{T.get('copy.signUp.title.mobile')}</h2>
                    <SignUpForm
                        completeSubmission={self.completeSubmission}
                        handleClose={self.handleBack}
                    />
                </section>
                <SiteFooter />
            </main>
        );
    }



});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SignInPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
