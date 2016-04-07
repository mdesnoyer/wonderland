// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import SignUpForm from '../forms/SignUpForm';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var SignUpPage = React.createClass({
    render: function() {
        return (
            <div>
                <Helmet
                    title={UTILS.buildPageTitle('Sign Up')}
                />
                <SiteHeader />
                <section className="section columns">
                    <div className="column is-half is-offset-quarter">
                        <SignUpForm />
                    </div>
                </section>
                <SiteFooter />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default SignUpPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
