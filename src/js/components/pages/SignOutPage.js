// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import Helmet from 'react-helmet';

import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import SignInForm from '../forms/SignInForm';
import SESSION from '../../modules/session';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import { resetStores } from '../../stores/CollectionStores.js';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SignOutPage = React.createClass({
    componentWillMount: function() {
        SESSION.end();
        resetStores();
    },
    render: function() {
        var self = this;
        return (
            <main className="xxPage">
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.signOut.title'))}
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

export default SignOutPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
