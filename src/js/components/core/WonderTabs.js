// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import UTILS from '../../modules/utils';
// import ReactDebugMixin from 'react-debug-mixin';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var WonderTabs = React.createClass({
	// mixins: [ReactDebugMixin],
    propTypes: {
        tabs: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        selectedTab: function(props) {
            React.PropTypes.number.apply(React.PropTypes.number, arguments);
            if (props.selectedTab >= props.tabs.length || props.selectedTab < 0) {
                return new Error('Invalid `selectedTab` supplied to `WonderTabs`: selectedTab value of `' + props.selectedTab + '` does not exist');
            }
        }
    },
    getDefaultProps: function() {
        return {
            selectedTab: 0
        };
    },
    getInitialState: function() {
        var self = this;
        return {
            uuid: self.props.id || +(new Date()),
            tabs: self.props.tabs,
            selectedTab: self.props.selectedTab
        };
    },
    componentWillMount: function() {
        var self = this;
        self.handleNewHash();
        window.addEventListener('hashchange', self.handleNewHash, false);
    },
    handleNewHash: function() {
        var self = this,
            selectedTab = self.state.selectedTab,
            hash = window.location.hash.split('#')[1]
        ;
        self.state.tabs.map(function(tab, i) {
            var tabSlug = UTILS.slugify(tab.label);
            if (tabSlug === hash) {
                selectedTab = i;
            }
        });
        self.setState({
            selectedTab: selectedTab
        }, function() {
            window.scroll(0, 0);
        });
    },
    render: function() {
        var self = this;
        return (
            <div>
                <nav className="wonderland-tabs tabs is-boxed">
                    <ul>
                        {
                            self.state.tabs.map(function(tab, i) {
                                var tabClass = self.state.selectedTab === i ? ['is-active'] : [],
                                    tabSlug = UTILS.slugify(tab.label)
                                ;

                                function handleClick(e) {
                                    if (i !== self.state.selectedTab && tab.disabled !== true) {
                                        self.setState({
                                            selectedTab: i
                                        });
                                    }
                                }

                                if (tab.disabled === true) {
                                    tabClass.push('is-disabled');
                                }
                                return (
                                    <li key={self.state.uuid + '_tab' + i} className={tabClass.join(' ')} onClick={handleClick}>
                                        <a href={'#' + tabSlug}>
                                            {tab.label}
                                        </a>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </nav>
                <div className="wonderland-tabs-body">
                    {self.state.tabs[self.state.selectedTab].body}
                </div>
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default WonderTabs;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
