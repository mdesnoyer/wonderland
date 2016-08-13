import React from 'react';
import SiteBanner from './SiteBanner';
import AccountMasqueradeBar from './AccountMasqueradeBar';
import T from '../../modules/translation';
import Sidebar from './Sidebar';

var SiteHeader = React.createClass({
    getInitialState: function() {
        const { sidebarContent } = this.props;

        return {
            sidebarContent: sidebarContent || null // null, learnMore, contact, signUp, account
        }
    },
    setSidebarContent: function(content) {
        this.setState({
            sidebarContent: content
        });
    },
    componentWillReceiveProps(nextProps) {
        const { sidebarContent } = nextProps;

        if (sidebarContent) {
            this.setState({ sidebarContent });
        }
    },
    render: function() {
        const { sidebarContent } = this.state;

        return (
            <div>
                <AccountMasqueradeBar />
                <SiteBanner
                    setSidebarContent={this.setSidebarContent}
                    sidebarContent={sidebarContent}
                />
                <Sidebar
                    content={sidebarContent}
                    setContent={this.setSidebarContent}
                />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SiteHeader;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
