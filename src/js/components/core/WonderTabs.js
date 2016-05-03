// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var WonderTabs = React.createClass({
	// mixins: [ReactDebugMixin],
    propTypes: {
        tabs: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {
            selectedTab: '',
        }
    },
    handleTabSwitch: function(e) {
        e.preventDefault();
        var self = this;
        self.setState({
            selectedTab: e.target.attributes.href.value.substr(1) // remove the #
        });
    },
    render: function() {
        var self = this;
        return (
            <div>
                <nav className="tabs is-boxed">
                    <ul>
                        {
                            Object.keys(self.props.tabs).map(function(key, i) {
                                var sluggedTab = UTILS.slugify(key);
                                return (
                                    <li key={sluggedTab} className={((self.state.selectedTab === sluggedTab) || (self.state.selectedTab === '' && i ===0)) ? 'is-active' : ''}>
                                        <a href={'#' + sluggedTab} onClick={self.handleTabSwitch}>
                                            {key}
                                        </a>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </nav>
                <div>
                    {
                        Object.keys(self.props.tabs).map(function(key, i) {
                            var sluggedTab = UTILS.slugify(key);
                            return (
                                <section key={sluggedTab} id={sluggedTab} className={((self.state.selectedTab === sluggedTab) || (self.state.selectedTab === '' && i ===0)) ? 'container' : 'container is-hidden'}>
                                    <div className="container">
                                        {self.props.tabs[key]}
                                    </div>
                                </section>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default WonderTabs;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
