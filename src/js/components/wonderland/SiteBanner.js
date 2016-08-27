import React, {PropTypes} from 'react';

import SiteNavigation from '../wonderland/SiteNavigation';
import SearchForm from '../core/SearchForm';
import T from '../../modules/translation';

const propTypes = {
    query: PropTypes.string,
    onSearchFormChange: PropTypes.func,
    onSearchFormSubmit: PropTypes.func,
    isLoading: PropTypes.bool
};

export default function SiteBanner(props) {

    const getSearchForm = () => {
        if (props.onSearchFormChange && props.onSearchFormSubmit) {
            return (
                <SearchForm
                    query={props.searchQuery}
                    onChange={props.onSearchFormChange}
                    onSubmit={props.onSearchFormSubmit}
                    isLoading={props.isLoading}
                />
            );
        }
        return null;
    };

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
            {getSearchForm()}
            <SiteNavigation
                sidebarContent={props.sidebarContent}
                setSidebarContent={props.setSidebarContent}
            />
        </header>
    );
}

SiteBanner.propTypes = propTypes;
