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
        if (SESSION.isUser()) {
            self.context.router.push(UTILS.DRY_NAV.DASHBOARD.URL);
        }
    },
    render: function() {
        var self = this;
        return (
            <main className="xxPage">
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.signIn.title'))}
                    meta={[{"name": "viewport", "content": "width=device-width, initial-scale=1.0"},]}
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
