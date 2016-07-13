// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import SignInForm from '../forms/SignInForm';
import T from '../../modules/translation';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';
import Message from '../wonderland/Message';
import SESSION from '../../modules/session';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SignInPage = React.createClass({
    // mixins: [ReactDebugMixin],
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    componentWillMount: function() {
        if (SESSION.active()) {
            // Play nice, transport the user to the internal home
            // page (dashboard)
            this.context.router.push(UTILS.DRY_NAV.DASHBOARD.URL);
        }
    },
    render: function() {
        var self = this;
        return (
            <main className="xxPage">
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.signIn.title'))}
                />
                <SiteHeader />
                <SignInForm />
                <SiteFooter />
            </main>
        );
    }



});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SignInPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
