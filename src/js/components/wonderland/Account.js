// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import AjaxMixin from '../../mixins/Ajax';
import T from '../../modules/translation';
import SESSION from '../../modules/session';
import UTILS from '../../modules/utils';
import ChangePasswordForm from '../forms/ChangePasswordForm';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Account = React.createClass({
    mixins: [AjaxMixin],
    contextTypes: {     
        router: React.PropTypes.object.isRequired     
    },
    getInitialState: function() {
        return {
            displayName: '',
            username: '',
            isPaidUser: false
        }
    },
    componentWillMount: function() {
        var self = this;
        SESSION.user()
            .then(function(userData) {
                self.setState({
                    displayName: userData.displayName || userData.username,
                    username: userData.username
                });
            })
            .catch(function(err) {
                console.error(err);
            })
        ;
        self.GET('billing/account')
            .then(function (res) {
                self.setState({
                    isPaidUser: true
                });
            })
            .catch(function (err) {
                self.setState({
                    isPaidUser: false
                });
            })
        ;
    },
    handleSignOut: function(e) {
        var self = this;
        e.preventDefault();
        SESSION.end();
        self.context.router.push(UTILS.DRY_NAV.SIGNOUT.URL);
    },
    render: function() {
        var self = this;
        return (
            <article className="xxPageOverlay-content">
                <h1 className="xxSubtitle">{T.get('nav.account')}</h1>
                <h2 className="xxTitle">{T.get('copy.account.heading', {'@displayName': self.state.displayName})}</h2>
                {
                    (!self.state.isPaidUser) ? (
                        <div className="xxText">
                            <p dangerouslySetInnerHTML={{__html: T.get('copy.account.body', {
                                '@link': UTILS.PRICING_EXTERNAL_URL
                            })}} />
                        </div>
                    ) : ''
                }
                <div className="xxFormButtons">
                    <button className="xxButton" type="button" onClick={self.handleSignOut}>{T.get('action.signOut')}</button>
                </div>
                {
                    // (!self.state.isPaidUser) ? '' : (
                        <section className="xxSection">
                            <h2 className="xxTitle">{T.get('nav.settings')}</h2>
                            <a href="/settings/user/">{T.get('nav.userSettings')}</a><br></br>
                            {/*
                            <a href="/billing/">{T.get('nav.billing')}</a><br></br>
                            <a href="/plugins/">{T.get('nav.plugins')}</a><br></br>
                            <a href="/telemetry/">{T.get('nav.telemetry')}</a><br></br>
                            */}
                            <a href="/support/">{T.get('nav.support')}</a><br></br>
                            <a href="http://api.docs.neon-lab.com/">{T.get('nav.api')}</a>
                        </section>
                    // )
                }
                <section className="xxSection">
                    <h2 className="xxTitle">{T.get('copy.heading.changePassword')}</h2>
                    <ChangePasswordForm username={self.state.username} />
                </section>
            </article>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Account;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -