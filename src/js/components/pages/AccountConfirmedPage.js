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
        return (
            <div>
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.accountConfirmed.title'))}
                />
                <SiteHeader />
                <section className="section columns is-desktop">
                    <div className="column is-half is-offset-quarter">
                       <h1 className="title is-2">{T.get('copy.accountConfirmed.heading')}</h1>
                        <div className="content">
                            <p>{T.get('copy.accountConfirmed.body')}</p>
                        </div>
                        <SignInForm />
                    </div>
                </section>
                <SiteFooter />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default AccountConfirmedPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
