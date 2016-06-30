// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import T from '../../modules/translation';
import SESSION from '../../modules/session';
import ChangePasswordForm from '../forms/ChangePasswordForm';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Account = React.createClass({
    getInitialState: function() {
        return {
            displayName: ''
        }
    },
    componentWillMount: function() {
        var self = this;
        SESSION.user()
            .then(function(userData) {
                self.setState({
                    displayName: userData.displayName
                });
            })
            .catch(function(err) {
                console.error(err);
            })
        ;
    },
    render: function() {
        var self = this;
        // need to put a check in here for type of account
        return (
            <article className="xxPageOverlay-content">
                <h1 className="xxSubtitle">{T.get('nav.account')}</h1>
                <h2 className="xxTitle">{T.get('copy.account.heading', {'@displayName': self.state.displayName})}</h2>
                <div className="xxText">
                    <p>TODO: Text. Get More!</p>
                </div>
                <div className="xxFormButtons">
                    <button className="xxButton" type="button">Log Out</button>
                </div>
                <section className="xxSection">
                    <ChangePasswordForm />
                </section>
            </article>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Account;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -