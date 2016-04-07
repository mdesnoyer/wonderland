// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var ForgotPasswordPage = React.createClass({
    render: function() {
        return (
            <div>
                <Helmet
                    title={UTILS.buildPageTitle('Forgot Password')}
                />
                <SiteHeader />
                <section className="section">
                    <div className="container">
                        <ForgotPasswordForm />
                    </div>
                </section>
                <SiteFooter />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default ForgotPasswordPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
