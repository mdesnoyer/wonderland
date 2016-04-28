// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import ReactDebugMixin from 'react-debug-mixin';
import SiteNavigation from '../wonderland/SiteNavigation';
import SESSION from '../../modules/session';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SiteBanner = React.createClass({
	mixins: [ReactDebugMixin],
    getInitialState: function() {
        return {
            displayName: ''
        }
    },
    componentWillMount: function() {
        var self = this;
        if (SESSION.active()) {
            SESSION.user()
                .then(function(userData) {
                    if (userData) {
                        if (userData.first_name) {
                            if (self._isMounted) {
                                self.setState({
                                    displayName: userData.first_name
                                });
                            }
                        }
                        else {
                            if (self._isMounted) {
                                self.setState({
                                    displayName: userData.username
                                });
                            }
                        }
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
    componentDidMount: function() {
        var self = this;
        self._isMounted = true;
    },
    componentWillUnmount: function() {
        var self = this;
        self._isMounted = false;
    },
    render: function() {
        var self = this;
        return (
            <header className="wonderland-banner wonderland-banner--header">
                <div className="container">
                    <nav className="navbar wonderland-navbar is-fullwidth">
                        <SiteNavigation side="left" isSignedIn={SESSION.active()} />
                        <SiteNavigation displayName={self.state.displayName} side="right" isSignedIn={SESSION.active()} />
                    </nav>
                </div>
            </header>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SiteBanner;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
