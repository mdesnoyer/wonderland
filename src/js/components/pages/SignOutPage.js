// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import SignInForm from '../forms/SignInForm';
import SESSION from '../../modules/session';
import T from '../../modules/translation';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var SignOutPage = React.createClass({
    componentWillMount: function() {
        SESSION.end()
            .catch(function (err) {
                console.error(err);
            });
    },
    render: function() {
        var heading = T.get('copy.signOut.heading', { 
                // '@username': 'TODO'
            }),
            body = T.get('copy.signOut.body', {
                '@link': '/signin/'
            })
        ;
        return (
            <div>
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.signOut.title'))}
                />
                <SiteHeader />
                <section className="section columns is-desktop">
                    <div className="column is-half is-offset-quarter">
                        <h1 className="title is-2">{heading}</h1>
                        <div className="content">
                            <p><span dangerouslySetInnerHTML={{__html: body}} /></p>
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

export default SignOutPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
