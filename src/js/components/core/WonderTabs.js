// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
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
            uuid: +(new Date()),
            tabs: self.props.tabs,
            selectedTab: self.props.selectedTab
        };
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({
            tabs: nextProps.tabs,
            selectedTab: nextProps.selectedTab
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
                                var className = self.state.selectedTab === i ? ['is-active'] : [];

                                function handleClick(e) {
                                    e.preventDefault();
                                    if (i !== self.state.selectedTab && tab.disabled !== true) {
                                        self.setState({
                                            selectedTab: i
                                        });
                                    }
                                }

                                if (tab.disabled === true) {
                                    className.push('is-disabled');
                                }
                                return (
                                    <li key={self.state.uuid + '_tab' + i} className={className.join(' ')} onClick={handleClick}>
                                        <a href="#">
                                            {tab.label}
                                        </a>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </nav>
                <div>
                    <section className="container">
                        <div className="container">
                            {self.state.tabs[self.state.selectedTab].body}
                        </div>
                    </section>
                </div>
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default WonderTabs;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
