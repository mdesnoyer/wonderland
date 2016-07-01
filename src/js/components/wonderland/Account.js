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
                console.log(err);
                self.setState({
                    isPaidUser: false
                });
            })
        ;
    },
    handleLogOut: function(e) {
        var self = this;
        e.preventDefault();
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
                    ) : (
                        <div>cash money</div>
                    )
                }
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