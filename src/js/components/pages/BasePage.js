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
        onboardingState: PropTypes.string,
        // For dynamic tooltips
        tooltipText: PropTypes.string
    },

    childContextTypes: {
        isMobile: PropTypes.bool
    },

    getInitialState: function () {
        return {
            windowWidth: window.outerWidth,
        };
    },

    getDefaultProps: () => {
        return {
            title: UTILS.buildPageTitle(T.get('neonScore')),
            meta: [],
            sidebarContent: null
        };
    },

    getChildContext: () => {
        return {
            isMobile: UTILS.isMobile()
        };
    },

    componentDidMount: function() {
        window.addEventListener('resize', this.handleWindowResize);
        this.handleWindowResize();
    },

    componentWillUnmount: function() {
        window.removeEventListener('resize', this.handleWindowResize);
    },

    handleWindowResize: function() {
        const windowWidth = window.outerWidth;

        if (this.state.windowWidth !== windowWidth) {
            this.setState({
                windowWidth,
            });
        }

        if (windowWidth < UTILS.DETECT_MOBILE_WIDTH_PX) {
            document.documentElement.classList.add('is-mobile');
        } else {
            document.documentElement.classList.remove('is-mobile');
        }
    },

    getTitle: function() {
        return UTILS.buildPageTitle(this.props.title);
    },

    getMeta: function() {
        return this.props.meta.concat([{
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0'
        }]);
    },

    render: function() {
        let pageStyle = this.props.onboardingState === 'processing' ? "xxPage is-processing" : "xxPage";
        return (
            <main className={pageStyle}>
                <Helmet
                    meta={this.getMeta()}
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
