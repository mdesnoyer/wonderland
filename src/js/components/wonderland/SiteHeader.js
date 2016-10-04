import React, { PropTypes } from 'react';

import AccountMasqueradeBar from './AccountMasqueradeBar';
import Sidebar from './Sidebar';
import SiteBanner from './SiteBanner';
import UTILS from '../../modules/utils';

class SiteHeader extends React.Component {

    static displayName = 'SiteHeader';

    static propTypes = {
        sidebarContent: PropTypes.oneOf(UTILS.SIDEBAR_CONTENT_TYPES),
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

    onSetSidebarContent(sidebarContent) {
        if (this.props.onSetSidebarContent) {
            this.props.onSetSidebarContent(sidebarContent);
        }
        this.setState({ sidebarContent });
    }

    getSidebarContent() {
        // Prefer the parent's sidebarContent.
        if (this.props.sidebarContent) {
            return this.props.sidebarContent;
        }
        return this.state.sidebarContent;
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
