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
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    componentWillMount: function() {
        var self = this;
        if (SESSION.active()) {
            SESSION.user()
                .then(function(userData) {
                    SESSION.end();
                })
                .catch(function(err) {
                    SESSION.end();
                    self.context.router.push(UTILS.DRY_NAV.SIGNIN.URL);
                })
            ;
        }
    },
    render: function() {
        var self = this;
        return (
            <main className="xxPage">
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.signOut.title'))}
                />
                <SiteHeader />
                <SignInForm />
                <SiteFooter />
            </main>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SignOutPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
