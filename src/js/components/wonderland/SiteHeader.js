import React, {PropTypes} from 'react';
import SiteBanner from './SiteBanner';
import AccountMasqueradeBar from './AccountMasqueradeBar';
import T from '../../modules/translation';
import Sidebar from './Sidebar';

var SiteHeader = React.createClass({

    propTypes: {
        sidebarContent: PropTypes.oneOf([
            'learnMore',
            'contact',
            'signUp',
            'account',
            'primaryNavigation'
        ]),
        setSidebarContent: PropTypes.func.isRequired
    },

    render: function() {
        return (
            <div>
                <AccountMasqueradeBar />
                <SiteBanner
                    setSidebarContent={this.props.setSidebarContent}
                    sidebarContent={this.props.sidebarContent}
                />
                <Sidebar
                    content={this.props.sidebarContent}
                    setContent={this.props.setSidebarContent}
                />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SiteHeader;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
