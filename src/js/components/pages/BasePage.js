// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import React, { PropTypes } from 'react';

import Helmet from 'react-helmet';

import SiteHeader from '../wonderland/SiteHeader';
import Tooltips from '../knave/Tooltips';
import SiteFooter from '../wonderland/SiteFooter';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


const propTypes = {
    // Window title.
    title: PropTypes.string,
    meta: PropTypes.array,
    sidebarContent: PropTypes.string,
    setSidebarContent: PropTypes.func,
    onboardingState: PropTypes.string,
    // For dynamic tooltips
    tooltipText: PropTypes.string,
    children: PropTypes.node.isRequired,
    query: PropTypes.string,
    onSearchFormChange: PropTypes.func,
    onSearchFormSubmit: PropTypes.func,
    isLoading: PropTypes.bool,
    searchQuery: PropTypes.string,
};

const childContextTypes = {
    isMobile: PropTypes.bool,
};

const defaultProps = {
    title: UTILS.buildPageTitle(T.get('neonScore')),
    meta: [],
    sidebarContent: null,
};

class BasePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { windowWidth: window.outerWidth };
        this.handleWindowResize = this.handleWindowResize.bind(this);
    }

    getChildContext() {
        return {
            isMobile: UTILS.isMobile(),
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowResize);
        this.handleWindowResize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    }

    getTitle() {
        return UTILS.buildPageTitle(this.props.title);
    }

    getMeta() {
        return this.props.meta.concat([{
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0',
        }]);
    }

    handleWindowResize() {
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
    }

    render() {
        let pageStyle = this.props.onboardingState === 'processing' ?
            'xxPage is-processing' :
            'xxPage';
        return (
            <main className={pageStyle}>
                <Helmet
                    meta={this.getMeta()}
                    title={this.getTitle()}
                />
                <SiteHeader
                    sidebarContent={this.props.sidebarContent}
                    setSidebarContent={this.props.setSidebarContent}
                    query={this.props.searchQuery}
                    onSearchFormChange={this.props.onSearchFormChange}
                    onSearchFormSubmit={this.props.onSearchFormSubmit}
                    isLoading={this.props.isLoading}
                />
                <Tooltips tooltipText={this.props.tooltipText} />
                {this.props.children}
                {!this.props.onboardingState ? <SiteFooter /> : null}
            </main>
        );
    }
}

BasePage.propTypes = propTypes;
BasePage.defaultProps = defaultProps;
BasePage.childContextTypes = childContextTypes;

export default BasePage;
