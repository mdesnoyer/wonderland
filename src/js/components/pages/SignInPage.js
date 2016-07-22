// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import SignInForm from '../forms/SignInForm';
import T from '../../modules/translation';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';
import Message from '../wonderland/Message';
import SESSION from '../../modules/session';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SignInPage = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    componentWillMount: function() {
        var self = this;
        SESSION.user()
            .then(function(userData) {
                self.context.router.push(UTILS.DRY_NAV.DASHBOARD.URL);
            })
            .catch(function(err) {
                // do nothing
            })
        ;
    },
    render: function() {
        var self = this;
        return (
            <main className="xxPage">
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.signIn.title'))}
                />
                <SiteHeader />
                <section className="xxMainForm">
                    <h1 className="xxTitle">{T.get('action.signIn')}</h1>
                    <SignInForm />
                </section>
                <SiteFooter />
            </main>
        );
    }



});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SignInPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
