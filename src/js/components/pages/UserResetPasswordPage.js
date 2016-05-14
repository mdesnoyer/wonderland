// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var UserResetPasswordPage = React.createClass({
    // mixins: [ReactDebugMixin],
    render: function() {
        return (
            <div>
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.resetPassword.title'))}
                />
                <SiteHeader />
                <section className="section">
                    <div className="columns is-desktop">
                        <div className="column is-half is-offset-one-quarter">
                            <h1 className="title is-2">{T.get('copy.resetPassword.heading')}</h1>
                            <div className="content">
                                <p>{T.get('copy.resetPassword.body')}</p>
                            </div>
                            TODO - FORM GOES HERE<br />
                            USERNAME<br />
                            NEW PASSWORD<br />
                        </div>
                    </div>
                </section>
                <SiteFooter />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default UserResetPasswordPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
