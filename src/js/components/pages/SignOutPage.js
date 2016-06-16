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

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SignOutPage = React.createClass({
    // mixins: [ReactDebugMixin],
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {
            displayName: ''
        }
    },
    componentWillMount: function() {
        var self = this;
        if (SESSION.active()) {
            SESSION.user()
                .then(function(userData) {
                    self.setState({
                        displayName: userData.displayName
                    }, function() {
                        SESSION.end();
                    });
                })
                .catch(function(err) {
                    console.error(err);
                })
            ;
        }
        else {
            // Play nice, transport the user to the Sign In page
            self.context.router.push(UTILS.DRY_NAV.SIGNIN.URL);
        }
    },
    render: function() {
        var self = this,
            heading = T.get('copy.signOut.heading', {
                '@displayName': self.state.displayName
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
                <section className="wonderland-section section">
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
