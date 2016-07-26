// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';
import SignInForm from '../forms/SignInForm';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var AccountConfirmedPage = React.createClass({
    render: function() {
        var body = T.get('copy.accountConfirmed.body');
        return (
            <main className="xxPage">
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.accountConfirmed.title'))}
                />
                <SiteHeader />
                <section className="xxMainForm">
                    <h1 className="xxTitle">{T.get('copy.accountConfirmed.heading')}</h1>
                    <div className="xxText">
                        <p><span dangerouslySetInnerHTML={{__html: body}} /></p>
                        <p><em>{T.get('app.companySig')}</em></p>
                    </div>
                    <SignInForm />
                </section>
                <SiteFooter />
            </main>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default AccountConfirmedPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
