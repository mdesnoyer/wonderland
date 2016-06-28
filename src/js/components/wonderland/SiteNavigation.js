// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';

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
            isSignedIn: self.props.isSignedIn,
            sidebarContent: self.props.sidebarContent
        }
    },
    componentWillReceiveProps: function(nextProps) {
        var self = this;
        self.setState({
            sidebarContent: nextProps.sidebarContent
        });
    },
    handleClick: function(e) {
        var self = this,
            item = e.target.getAttribute('data-content')
        ;
        e.preventDefault();
        self.props.setSidebarContent(item);
    },
    render: function() {
        var self = this,
            items = {
                learnMore: <a className="xxNav-anchor" href="#" data-content="learnMore" onClick={self.handleClick}>{T.get('nav.learnMore')}</a>,
                contactPage: <a className="xxNav-anchor" href={UTILS.CONTACT_EXTERNAL_URL} data-content="contact">{T.get('nav.contact')}</a>,
                signUp: <a className="xxNav-anchor" href={UTILS.DRY_NAV.SIGNUP.URL} data-content="signUp">{T.get('nav.signUp')}</a>,
                signIn: <a className="xxNav-anchor" href={UTILS.DRY_NAV.SIGNIN.URL} data-content="signIn">{T.get('nav.signIn')}</a>,
                account: <a className="xxNav-anchor" href={UTILS.DRY_NAV.SETTINGS_ACCOUNT.URL} data-content="account">{T.get('nav.account')}</a>,
                supportPage: <a className="xxNav-anchor" href={UTILS.DRY_NAV.SUPPORT.URL}>{T.get('nav.support')}</a>,
                termsPage: <a className="xxNav-anchor" href={UTILS.DRY_NAV.TERMS.URL}>{T.get('nav.terms')}</a>
            },
            constructedNav = [],
            additionalClass = 'xxNav-item'
        ;
        if (self.state.isSignedIn) {
            // Signed In
            if (self.props.pos === 'right') {
                constructedNav.push(items.learnMore);
                constructedNav.push(items.contactPage);
                constructedNav.push(items.account);
            }
        }
        else {
            // Signed Out
            if (self.props.pos === 'right') {
                constructedNav.push(items.learnMore);
                constructedNav.push(items.contactPage);
                constructedNav.push(items.signIn);
                constructedNav.push(items.signUp);
            }
        }
        if (self.props.pos === 'bottom') {
            constructedNav.push(items.contactPage);
            constructedNav.push(items.supportPage);
            constructedNav.push(items.termsPage);
        }
        return (
            <div>
                <ul>
                    {
                        constructedNav.map(function(levelItem, i) {
                            if (levelItem.props['data-content'] === self.state.sidebarContent) {
                                return (
                                    <li key={i} className="xxNav-item is-active">{levelItem}</li>
                                );
                            }
                            return (
                                <li key={i} className="xxNav-item">{levelItem}</li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SiteNavigation;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
