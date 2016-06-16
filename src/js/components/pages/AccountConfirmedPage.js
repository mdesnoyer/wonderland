// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';
import SignInForm from '../forms/SignInForm';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var AccountConfirmedPage = React.createClass({
    // mixins: [ReactDebugMixin],
    render: function() {
        var body = T.get('copy.accountConfirmed.body');
        return (
            <div>
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.accountConfirmed.title'))}
                />
                <SiteHeader />
                <section className="wonderland-section section">
                    <div className="columns is-desktop">
                        <div className="column is-half is-offset-one-quarter">
                           <h1 className="title is-2">{T.get('copy.accountConfirmed.heading')}</h1>
                            <div className="content">
                                <p><span dangerouslySetInnerHTML={{__html: body}} /></p>
                                <p><em>{T.get('app.companySig')}</em></p>
                            </div>
                            <SignInForm />
                        </div>
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
