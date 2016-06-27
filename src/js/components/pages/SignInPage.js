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
import PageOverlay from '../../MM-Restyle/PageOverlay';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SignInPage = React.createClass({
    // mixins: [ReactDebugMixin],
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {
            overlayOpen: false,
            overlayContent: '' // learnMore, contact, signIn, signUp, account 
        }
    },
    setOverlayContent: function(content) {
        var self = this;
        self.setState({
            overlayOpen: true,
            overlayContent: content
        });
    },
    closeOverlay: function() {
        var self = this;
        self.setState({
            overlayOpen: false
        });
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
            <div>
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.signIn.title'))}
                />
                <main className="xxPage">
                    <SiteHeader overlayOpen={self.state.overlayOpen} setOverlayContent={self.setOverlayContent}/>
                    <PageOverlay overlayOpen={self.state.overlayOpen} overlayContent={self.state.overlayContent} closeOverlay={self.closeOverlay}/>
                    <SignInForm showLegend={false} />
                    <SiteFooter />
                </main>
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SignInPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
