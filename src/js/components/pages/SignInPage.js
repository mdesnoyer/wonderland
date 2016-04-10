// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import {Link} from 'react-router';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import SignInForm from '../forms/SignInForm';
import T from '../../modules/translation';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';
import Message from '../wonderland/Message';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var SignInPage = React.createClass({
    render: function() {
        var confirmed = this.props.location.query.confirmed ? <Message body={T.get('confirmedAccount')} flavour="success" />  : '';
        return (
            <div>
                <Helmet
                    title={UTILS.buildPageTitle('Sign In')}
                />
                <SiteHeader />
                <section className="section columns">
                    <div className="column is-half is-offset-quarter">
                        {confirmed}
                        <SignInForm />
                        <Link activeClassName="active" to="/forgot/">{T.get('reset.forgot')}</Link>
                    </div>
                </section>
                <SiteFooter />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default SignInPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
