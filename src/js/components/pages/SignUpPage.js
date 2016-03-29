// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import SiteHeader from '../lookingglass/SiteHeader';
import SiteFooter from '../lookingglass/SiteFooter';
import SignUpForm from '../lookingglass/SignUpForm';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var SignUpPage = React.createClass({
    render: function() {
        return (
            <div>
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
