// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import SignInForm from '../forms/SignInForm';
import SESSION from '../../modules/session';
import T from '../../modules/translation';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';
import Account from '../../mixins/Account';
import AjaxMixin from '../../mixins/Ajax';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var SignOutPage = React.createClass({
	mixins: [Account, AjaxMixin],
    getInitialState: function () {
        return {
            userName: 'Goodbye!'
        };
    },
    componentWillMount: function() {
        var self = this,
            displayName
        ;
        if (SESSION.active()) {
            SESSION.user()
                .then(function(userData) {
                    if (userData) {
                        if (userData.first_name) {
                            displayName = userData.first_name;
                        }
                        else {
                            displayName = userData.username
                        }
                        self.setState({
                            userName: displayName
                        });
                    }
                })
                .catch(function(err) {
                    console.log(err);
                })
            ;
        }
        else {
            // Do nothing
        }
        SESSION.end()
            .catch(function (err) {
                console.error(err);
            });
    },
    render: function() {
        var self = this,
            heading = T.get('copy.signOut.heading', {
                '@userName': self.state.userName
            }),
            body = T.get('copy.signOut.body', {
                '@link': UTILS.DRY_NAV.SIGNIN.URL
            })
        ;
        return (
            <div>
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.signOut.title'))}
                />
                <SiteHeader />
                <section className="section">
                    <div className="columns is-desktop">
                        <div className="column is-half is-offset-one-quarter">
                            <h1 className="title is-2">{heading}</h1>
                            <div className="content">
                                <p><span dangerouslySetInnerHTML={{__html: body}} /></p>
                            </div>
                            <SignInForm showLegend={false} />
                        </div>
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
