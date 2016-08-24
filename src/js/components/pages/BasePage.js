'use strict';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

import SiteHeader from '../wonderland/SiteHeader';
import Helmet from 'react-helmet';
import Tooltips from '../Tooltips';
import SiteFooter from '../wonderland/SiteFooter';

import T from '../../modules/translation';
import UTILS from '../../modules/utils';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const BasePage = React.createClass({

    propTypes: {
        // Window title.
        title: PropTypes.string,
        meta: PropTypes.array,
        sidebarContent: PropTypes.string,
        setSidebarContent: PropTypes.func,
        onboardingState: PropTypes.string
        // For dynamic tooltips
        tooltipText: PropTypes.string
    },

    getDefaultProps: () => {
        return {
            title: UTILS.buildPageTitle(T.get('neonScore')),
            meta: [],
            sidebarContent: null
        };
    },

    getTitle: function() {
        return UTILS.buildPageTitle(this.props.title);
    },

    render: function() {
        let pageStyle = this.props.onboardingState === 'processing' ? "xxPage is-processing" : "xxPage";
        return (
            <main className={pageStyle}>
                <Helmet
                    meta={this.props.meta}
                    title={this.getTitle()}
                />
                <SiteHeader
                    sidebarContent={this.props.sidebarContent}
                    setSidebarContent={this.props.setSidebarContent}
                />
                <Tooltips tooltipText={this.props.tooltipText}/>
                {this.props.children}
                {!this.props.onboardingState ? <SiteFooter /> : null}
            </main>
        );
    }
});

export default BasePage;
