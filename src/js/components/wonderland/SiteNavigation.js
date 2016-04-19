// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import {Link} from 'react-router';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SiteNavigation = React.createClass({
    getDefaultProps: function() {
        var self = this;
        return {
            isSignedIn: false,
            displayName: ''
        }
    },
    getInitialState: function() {
        var self = this;
        return {
            isSignedIn: self.props.isSignedIn
        }
    },
    render: function() {
        var self = this,
            items = {
                logo: <a className="wonderland-navbar__logo" href="/" title="Go to the Home page"><img src="/img/logo-fff.svg" alt="Neon" title="Neon" /></a>,
                contact: <a className="wonderland-navbar__text" href={UTILS.CONTACT_EXTERNAL_URL}>{T.get('nav.contact')}</a>,
                dashboard: <Link className="wonderland-navbar__text" activeClassName="wonderland-active" to={UTILS.DRY_NAV.DASHBOARD.URL}>Dashboard</Link>,
                analyzeVideo: <Link className="wonderland-navbar__text" activeClassName="wonderland-active" to="/analyze/video/">{T.get('nav.analyze')}</Link>,
                videos: <Link className="wonderland-navbar__text" activeClassName="wonderland-active" to="/videos/">{T.get('nav.videoLibrary')}</Link>,
                signUp: <Link className="wonderland-navbar__button button is-danger" activeClassName="wonderland-active" to={UTILS.DRY_NAV.SIGNUP.URL}>{T.get('nav.signUp')}</Link>,
                forgotPassword: <Link className="wonderland-navbar__text" activeClassName="wonderland-active" to="/account/forgot/">Forgot Password</Link>,
                signIn: <Link className="wonderland-navbar__text" activeClassName="wonderland-active" to={UTILS.DRY_NAV.SIGNIN.URL}>{T.get('nav.signIn')}</Link>,
                signOut: <Link to={UTILS.DRY_NAV.SIGNOUT.URL}>{T.get('nav.signOut')}</Link>,
                username: <em className="wonderland-navbar__text">{self.props.displayName}</em>,
                billingPage: <Link to={UTILS.DRY_NAV.BILLING.URL} title={T.get('nav.billing')}>{T.get('nav.billing')}</Link>,
                telemetryPage: <Link to={UTILS.DRY_NAV.TELEMETRY.URL} title={T.get('nav.telemetry')}>{T.get('nav.telemetry')}</Link>,
                apiPage: <Link to={UTILS.DRY_NAV.API.URL} title={T.get('nav.api')}>{T.get('nav.api')}</Link>,
                neonscopePage: <Link to={UTILS.DRY_NAV.NEONSCOPE.URL} title={T.get('nav.neonscope')}>{T.get('nav.neonscope')}</Link>,
                accountSettingsPage: <Link to={UTILS.DRY_NAV.ACCOUNTSETTINGS.URL} title={T.get('nav.accountSettings')}>{T.get('nav.accountSettings')}</Link>,
                userSettingsPage: <Link to={UTILS.DRY_NAV.USERSETTINGS.URL} title={T.get('nav.userSettings')}>{T.get('nav.userSettings')}</Link>,
                integrationsPage: <Link to={UTILS.DRY_NAV.INTEGRATIONS.URL} title={T.get('nav.integrations')}>{T.get('nav.integrations')}</Link>,
            },  
            accountSettings = <span>
                                    <div className="wonderland-navbar__icon wonderland-navbar__icon--regular"><i className="fa fa-cog" aria-hidden="true" /></div>
                                    <ul className="box wul">
                                        <li>{items.accountSettingsPage}</li>
                                        <li>{items.integrationsPage}</li>
                                        <li>{items.neonscopePage}</li>
                                        <li>{items.telemetryPage}</li>
                                        <li>{items.apiPage}</li>
                                    </ul>
                                </span>,
            userSettings = <span>
                                <div className="wonderland-navbar__icon wonderland-navbar__icon--alternate"><i className="fa fa-user" aria-hidden="true" /></div>
                                <ul className="box wul">
                                    <li>{items.userSettingsPage}</li>
                                    <li>{items.billingPage}</li>
                                    <li>{items.signOut}</li>
                                </ul>
                            </span>,
            constructedNav = [],
            className = 'navbar-' + self.props.side
        ;
        if (self.state.isSignedIn) {
            // Signed In
            if (self.props.side === 'left') {
                constructedNav.push(items.logo);
                constructedNav.push(items.videos);
            }
            if (self.props.side === 'right') {
                constructedNav.push(items.username);
                constructedNav.push(userSettings);
                constructedNav.push(accountSettings);
                constructedNav.push(items.contact);
            }
        }
        else {
            // Signed Out
            if (self.props.side === 'left') {
                constructedNav.push(items.logo);
                // constructedNav.push(items.forgotPassword);
            }
            if (self.props.side === 'right') {
                constructedNav.push(items.contact);
                constructedNav.push(items.signIn);
                constructedNav.push(items.signUp);
            }
        }
        return (
            <div className={className}>
                {
                    constructedNav.map(function(navbarItem, i) {
                        return (
                            <div key={i} className="wonderland-navbar__item navbar-item">{navbarItem}</div>
                        );
                    })
                }
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SiteNavigation;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


