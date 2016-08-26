// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

import SiteNavigation from '../wonderland/SiteNavigation';
import SearchForm from '../core/SearchForm';

import SESSION from '../../modules/session';
import T from '../../modules/translation';


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SiteBanner = React.createClass({
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
                { 
                    this.props.onSearchFormChange && this.props.onSearchFormSubmit ? (
                        <SearchForm
                            query={this.props.searchQuery}
                            onChange={this.props.onSearchFormChange}
                            onSubmit={this.props.onSearchFormSubmit}
                            isLoading={this.props.isLoading}
                        />                    
                    ) : null
                }
                <SiteNavigation
                    sidebarContent={self.props.sidebarContent}
                    setSidebarContent={self.props.setSidebarContent}
                />
            </header>
        );
    },
    PropTypes: {
        query: React.PropTypes.string,
        onSearchFormChange: React.PropTypes.func,
        onSearchFormSubmit: React.PropTypes.func,
        isLoading: React.PropTypes.bool
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SiteBanner;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
