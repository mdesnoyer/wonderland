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
            items = {
                learnMore: <Link className="xxNav-anchor" to="">{T.get('nav.learnMore')}</Link>,
                contactPage: <Link className="xxNav-anchor" to="">{T.get('nav.contact')}</Link>,
                signUp: <Link className="xxNav-anchor" to={UTILS.DRY_NAV.SIGNUP.URL}>{T.get('nav.signUp')}</Link>,
                signIn: <Link className="xxNav-anchor" to={UTILS.DRY_NAV.SIGNIN.URL}>{T.get('nav.signIn')}</Link>,
                account: <Link className="xxNav-anchor" to="">{T.get('nav.account')}</Link>,
                supportPage: <Link className="xxNav-anchor" to={UTILS.DRY_NAV.SUPPORT.URL}>{T.get('nav.support')}</Link>,
                termsPage: <Link className="xxNav-anchor" to={UTILS.DRY_NAV.TERMS.URL}>{T.get('nav.terms')}</Link>
            },
            constructedNav = []
        ;
        if (self.state.isSignedIn) {
            // Signed In
            if (self.props.pos === 'right') {
                constructedNav.push(items.learnMore);
                constructedNav.push(items.contactPage);
                constructedNav.push(items.account);
                // possibly another if statement here for ppl w/ MONEY
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
            <ul>
                {
                    constructedNav.map(function(levelItem, i) {
                        return (
                            <li key={i} className="xxNav-item">{levelItem}</li>
                        );
                    })
                }
            </ul>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SiteNavigation;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
