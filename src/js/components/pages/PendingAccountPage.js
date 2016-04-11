// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var PendingAccountPage = React.createClass({
    render: function() {
        return (
            <div>
                <Helmet
                    title={UTILS.buildPageTitle('Your Account is Pending')}
                />
                <SiteHeader />
                <section className="section">
                    <div className="container">
                        <h1>Please check your Inbox for a verification email.</h1>
                        <p>If you don&rsquo;t see an email, please check your Spam or Junk folders</p>
                    </div>
                </section>
                <SiteFooter />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default PendingAccountPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
