// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import SignInForm from '../forms/SignInForm';
import T from '../../modules/translation';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';
import Message from '../wonderland/Message';
import SESSION from '../../modules/session';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const BREAKPOINT_MOBILE = 768;

var SignInPage = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
        return {
            windowWidth: window.outerWidth
        };
    },
    componentWillMount: function() {
        var self = this;
        if (SESSION.isUser()) {
            self.context.router.push(UTILS.DRY_NAV.DASHBOARD.URL);
        }
    },
    componentDidMount: function() {
        window.addEventListener('resize', this.handleWindowResize);
        this.handleWindowResize();
    },
    handleWindowResize: function() {
        const windowWidth = window.outerWidth;
        if (this.state.windowWidth !== windowWidth) {
            this.setState({
                windowWidth,
            });
        }
        if (windowWidth < BREAKPOINT_MOBILE) {
            document.documentElement.classList.add('is-mobile');
        } else {
            document.documentElement.classList.remove('is-mobile');
        }
    },
    render: function() {
        var self = this;
        return (
            <main className="xxPage">
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.signIn.title'))}
                    meta={[{"name": "viewport", "content": "width=device-width, initial-scale=1.0"},]}
                />
                <SiteHeader />
                <section className="xxMainForm">
                    <h1 className="xxTitle">{T.get('action.signIn')}</h1>
                    <SignInForm />
                </section>
                <SiteFooter />
            </main>
        );
    }



});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SignInPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
