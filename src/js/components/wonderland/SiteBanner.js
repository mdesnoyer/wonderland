// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import SiteNavigation from '../wonderland/SiteNavigation';
import SESSION from '../../modules/session';
import gravatar from 'gravatar';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SiteBanner = React.createClass({
	// mixins: [ReactDebugMixin],
    getInitialState: function() {
        return {
            displayName: ''
        }
    },
    componentWillMount: function() {
        var self = this,
            displayName = '',
            avatar = ''
        ;
        if (SESSION.active()) {
            SESSION.user()
                .then(function(userData) {
                    if (userData) {
                        // https://en.gravatar.com/site/implement/images/
                        avatar = gravatar.url(userData.username, {s: '60', d: 'identicon'});
                        if (userData.first_name) {
                            displayName = userData.first_name;
                        }
                        else {
                            displayName = userData.username
                        }
                        self.setState({
                            displayName: displayName,
                            avatar: avatar
                        });
                    }
                })
                .catch(function(err) {
                    console.log(err);
                })
            ;
        }
        else {
            // Do nothing
        }
    },
    render: function() {
        var self = this;
        return (
            <header className="wonderland-banner wonderland-banner--header">
                <div className="container">
                    <nav className="navbar wonderland-navbar is-fullwidth">
                        <SiteNavigation side="left" isSignedIn={SESSION.active()} />
                        <SiteNavigation avatar={self.state.avatar} displayName={self.state.displayName} side="right" isSignedIn={SESSION.active()} />
                    </nav>
                </div>
            </header>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SiteBanner;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
