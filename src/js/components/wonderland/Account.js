// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import T from '../../modules/translation';
import SESSION from '../../modules/session';
import UTILS from '../../modules/utils';
import ChangePasswordForm from '../forms/ChangePasswordForm';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Account = React.createClass({
    contextTypes: {     
        router: React.PropTypes.object.isRequired     
    },
    getInitialState: function() {
        return {
            displayName: '',
            username: ''
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
    },
    handleLogOut: function(e) {
        var self = this;
        e.preventDefault();
        if (SESSION.active()) {
            SESSION.user()
                .then(function(userData) {
                    SESSION.end();
                    self.context.router.push(UTILS.DRY_NAV.SIGNOUT.URL);
                })
                .catch(function(err) {
                    SESSION.end();
                    self.context.router.push(UTILS.DRY_NAV.SIGNOUT.URL);
                })
            ;
        }
    },
    render: function() {
        var self = this,
            accountBodyText = T.get('copy.account.body', {
                '@link': UTILS.PRICING_EXTERNAL_URL
            })
        ;
        return (
            <article className="xxPageOverlay-content">
                <h1 className="xxSubtitle">{T.get('nav.account')}</h1>
                <h2 className="xxTitle">{T.get('copy.account.heading', {'@displayName': self.state.displayName})}</h2>
                <div className="xxText">
                    <p dangerouslySetInnerHTML={{__html: accountBodyText}} />
                </div>
                <div className="xxFormButtons">
                    <button className="xxButton" type="button" onClick={self.handleLogOut}>{T.get('logOut')}</button>
                </div>
                <section className="xxSection">
                    <ChangePasswordForm username={self.state.username}/>
                </section>
            </article>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Account;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -