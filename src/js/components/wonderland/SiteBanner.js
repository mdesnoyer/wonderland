import React, {PropTypes} from 'react';

import SiteNavigation from '../wonderland/SiteNavigation';
import SearchBar from '../core/SearchBar';
import T from '../../modules/translation';

const propTypes = {
    query: PropTypes.string,
    onSearchBarChange: PropTypes.func,
    onSearchBarSubmit: PropTypes.func,
    killNav: React.PropTypes.bool,
};

export default function SiteBanner(props) {
    const getSearchBar = () => {
        if (props.onSearchBarChange) {
            return (
                <SearchBar
                    query={props.query}
                    onChange={props.onSearchBarChange}
                    onSubmit={props.onSearchBarSubmit}
                />
            );
        }
        return null;
    };
    const siteNavigationElement = props.killNav ? null : <SiteNavigation sidebarContent={props.sidebarContent} setSidebarContent={props.setSidebarContent} />,
        logoImageElement = <img
                    className="xxLogo"
                    src="/img/xx/logo.svg"
                    alt={T.get('app.companyShortName')}
                    title={T.get('app.companyShortName')}
                />,
        logoElement = props.killNav ? logoImageElement : <a className="xxLogoLink" href="/" title={T.get('title.home')}>{logoImageElement}</a>
    ;

    return (
        <header className="xxHeader">
            {logoElement}
            {getSearchBar()}
            {siteNavigationElement}
        </header>
    );
}

SiteBanner.propTypes = propTypes;
