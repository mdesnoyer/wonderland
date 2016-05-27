// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import {Link} from 'react-router';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import Icon from '../core/Icon';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SiteNavigation = React.createClass({
	// mixins: [ReactDebugMixin],
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
            signedInAs = T.get('copy.signedInAs', {'@user': self.props.displayName}),
            itemClass = '',
            items = {
                logo: <a className="wonderland-level__logo" href="/" title="Go to the Home page"><img src="/img/logo-fff.svg" alt={T.get('app.companyShortName')} title={T.get('app.companyShortName')} /></a>,
                contactPagePlain: <a href={UTILS.CONTACT_EXTERNAL_URL}>{T.get('nav.contact')}</a>,
                contactPageFancy: <a className="wonderland-level__text" href={UTILS.CONTACT_EXTERNAL_URL}>{T.get('nav.contact')}</a>,
                termsPagePlain: <a href={UTILS.DRY_NAV.TERMS.URL}>{T.get('nav.terms')}</a>,
                dashboard: <Link className="wonderland-level__text" activeClassName="wonderland-active" to={UTILS.DRY_NAV.DASHBOARD.URL}>Dashboard</Link>,
                analyzeVideo: <Link className="wonderland-level__text" activeClassName="wonderland-active" to="/analyze/video/">{T.get('nav.analyze')}</Link>,
                videos: <Link className="wonderland-level__text" activeClassName="wonderland-active" to="/videos/">{T.get('nav.videoLibrary')}</Link>,
                signUp: <Link className="wonderland-level__button button is-danger" activeClassName="wonderland-active" to={UTILS.DRY_NAV.SIGNUP.URL}>{T.get('nav.signUp')}</Link>,
                signIn: <Link className="wonderland-level__text" activeClassName="wonderland-active" to={UTILS.DRY_NAV.SIGNIN.URL}>{T.get('nav.signIn')}</Link>,
                signOut: <Link to={UTILS.DRY_NAV.SIGNOUT.URL}>{T.get('nav.signOut')}</Link>,
                username: <em className="wonderland-level__text">{self.props.displayName}</em>,
                billingPage: <Link to={UTILS.DRY_NAV.BILLING.URL}>{T.get('nav.billing')}</Link>,
                telemetryPage: <Link to={UTILS.DRY_NAV.TELEMETRY.URL}>{T.get('nav.telemetry')}</Link>,
                apiPage: <Link to={UTILS.DRY_NAV.API.URL}>{T.get('nav.api')}</Link>,
                supportPagePlain: <Link to={UTILS.DRY_NAV.SUPPORT.URL}>{T.get('nav.support')}</Link>,
                supportPageFancy: <Link className="wonderland-level__text" activeClassName="wonderland-active" to={UTILS.DRY_NAV.SUPPORT.URL}>{T.get('nav.support')}</Link>,
                accountSettingsPage: <Link to={UTILS.DRY_NAV.SETTINGS_ACCOUNT.URL}>{T.get('nav.accountSettings')}</Link>,
                userSettingsPage: <Link to={UTILS.DRY_NAV.SETTINGS_USER.URL}>{T.get('nav.userSettings')}</Link>,
                integrationsPage: <Link to={UTILS.DRY_NAV.PLUGINS.URL}>{T.get('nav.plugins')}</Link>,
                avatar: <img className="wonderland-level__avatar" src={self.props.avatar} alt={signedInAs} title={signedInAs} />
            },
            accountSettings = <span>
                                    <div className="wonderland-level__icon wonderland-level__icon--regular">
                                        <Icon
                                            type="cog"
                                            nowrap={true}
                                        />
                                    </div>
                                    <nav className="wonderland-level__subnav">
                                        <ul className="box wonderland-box is-paddingless">
                                            <li>{items.accountSettingsPage}</li>
                                            <li>{items.billingPage}</li>
                                            <li>{items.integrationsPage}</li>
                                            <li>{items.telemetryPage}</li>
                                            <li>{items.apiPage}</li>
                                            <li>{items.supportPagePlain}</li>
                                        </ul>
                                    </nav>
                                </span>,
            userSettings = <span>
                                {items.avatar}
                                    <nav className="wonderland-level__subnav">
                                        <ul className="box wonderland-box is-paddingless">
                                            <li>{items.userSettingsPage}</li>
                                            <li>{items.signOut}</li>
                                        </ul>
                                    </nav>
                            </span>,
            constructedNav = [],
            navClass = 'wonderland-level wonderland-level-' + self.props.pos + ' level-' + self.props.pos
        ;
        if (self.state.isSignedIn) {
            // Signed In
            if (self.props.pos === 'left') {
                constructedNav.push(items.logo);
                constructedNav.push(items.videos);
            }
            if (self.props.pos === 'right') {
                constructedNav.push(items.username);
                constructedNav.push(userSettings);
                constructedNav.push(accountSettings);
                constructedNav.push(items.contactPageFancy);
            }
        }
        else {
            // Signed Out
            if (self.props.pos === 'left') {
                constructedNav.push(items.logo);
            }
            if (self.props.pos === 'right') {
                constructedNav.push(items.contactPageFancy);
                constructedNav.push(items.supportPageFancy);
                constructedNav.push(items.signIn);
                constructedNav.push(items.signUp);
            }
        }
        if (self.props.pos === 'bottom') {
            constructedNav.push(items.contactPagePlain);
            constructedNav.push(items.supportPagePlain);
            constructedNav.push(items.termsPagePlain);
        }
        if (self.props.pos === 'bottom') {
            itemClass = 'wonderland-level-bottom__item';
        }
        else {
            itemClass = 'wonderland-level__item level-item';
        }
        return (
            <div className={navClass}>
                {
                    constructedNav.map(function(levelItem, i) {
                        return (
                            <div key={i} className={itemClass}>{levelItem}</div>
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
