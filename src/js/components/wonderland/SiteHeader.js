import React, { PropTypes } from 'react';
import SiteBanner from './SiteBanner';
import AccountMasqueradeBar from './AccountMasqueradeBar';
import Sidebar from './Sidebar';

class SiteHeader extends React.Component {

    static displayName = 'SiteHeader';

    static propTypes = {
        sidebarContent: PropTypes.oneOf([
            'learnMore', 'contact', 'signUp', 'account', 'primaryNavigation']),
        onSetSidebarContent: PropTypes.func,
        query: PropTypes.string,
        onSearchBarChange: PropTypes.func,
        onSearchBarSubmit: PropTypes.func,
        killNav: React.PropTypes.bool,
    }

    constructor(props) {
        super(props);
        this.onSetSidebarContent = this.onSetSidebarContent.bind(this);
        this.state = { sidebarContent: null };
    }

    getSidebarContent() {
        // Prefer the parent's sidebarContent.
        if (this.props.sidebarContent) {
            return this.props.sidebarContent;
        }
        return this.state.sidebarContent;
    }

    onSetSidebarContent(sidebarContent) {
        if (this.props.onSetSidebarContent) {
            this.props.onSetSidebarContent(sidebarContent);
        }
        this.setState({ sidebarContent });
    }

    renderSidebar() {
        if (this.getSidebarContent()) {
            return (
                <Sidebar
                    content={this.getSidebarContent()}
                    onSetContent={this.onSetSidebarContent}
                />
            );
        }
        return null;
    }

    render() {
        return (
            <div>
                <AccountMasqueradeBar />
                <SiteBanner
                    setSidebarContent={this.onSetSidebarContent}
                    sidebarContent={this.getSidebarContent()}
                    query={this.props.query}
                    onSearchBarChange={this.props.onSearchBarChange}
                    onSearchBarSubmit={this.props.onSearchBarSubmit}
                    killNav={this.props.killNav}
                />
                {this.renderSidebar()}
            </div>
        );
    }
}

export default SiteHeader;
