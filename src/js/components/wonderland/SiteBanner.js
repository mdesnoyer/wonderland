// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import SiteNavigation from '../wonderland/SiteNavigation';
import SESSION from '../../modules/session';
import gravatar from 'gravatar';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SiteBanner = React.createClass({
    // mixins: [ReactDebugMixin],
    getInitialState: function() {
        return {
            displayName: ''
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
                        if (self._isMounted) {
                            self.setState({
                                displayName: userData.displayName,
                                avatar: avatar
                            });
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
    render: function() {
        var self = this;
        return (
            <header className="xxHeader">
                <a href="/" title={T.get('title.home')}>
                    <img 
                        className="xxLogo"
                        src="/img/xx/logo.svg"
                        alt={T.get('app.companyShortName')}
                        title={T.get('app.companyShortName')}
                    />
                </a>
                <nav className="xxNav">
                    <SiteNavigation 
                        displayName={self.state.displayName} 
                        isSignedIn={SESSION.active()}
                        sidebarContent={self.props.sidebarContent}
                        setSidebarContent={self.props.setSidebarContent}
                    />
                </nav>
            </header>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SiteBanner;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
