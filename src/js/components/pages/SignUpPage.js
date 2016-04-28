// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import ReactDebugMixin from 'react-debug-mixin';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import SignUpForm from '../forms/SignUpForm';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var SignUpPage = React.createClass({
	mixins: [ReactDebugMixin],
    render: function() {
        var heading = T.get('copy.signUp.heading'),
            body = T.get('copy.signUp.body')
        ;
        return (
            <div>
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.signUp.title'))}
                />
                <SiteHeader />
                <section className="section">
                    <div className="container">
                        <div className="columns is-desktop">
                            <div className="column is-half is-offset-one-quarter">
                                <h1 className="title is-2">{heading}</h1>
                                <div className="content">
                                    <p>{body}</p>
                                </div>
                                <SignUpForm showLegend={false} />
                            </div>
                        </div>
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
