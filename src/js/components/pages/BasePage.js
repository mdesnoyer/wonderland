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
        this.onWindowResize = this.onWindowResize.bind(this);
    }

    getChildContext() {
        return {
            isMobile: UTILS.isMobile(),
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.onWindowResize);
        this.onWindowResize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
    }

    getMeta() {
        return this.props.meta.concat([{
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0',
        }]);
    }

    getTitle() {
        return UTILS.buildPageTitle(this.props.title);
    }

    getFooter() {
        if (this.props.onboardingState) {
            return null;
        }
        return <SiteFooter />;
    }

    onWindowResize() {
        const windowWidth = window.outerWidth;

        if (this.state.windowWidth !== windowWidth) {
            this.setState({ windowWidth });
        }

        if (windowWidth < UTILS.DETECT_MOBILE_WIDTH_PX) {
            document.documentElement.classList.add('is-mobile');
        } else {
            document.documentElement.classList.remove('is-mobile');
        }
    }

    render() {
        let pageStyle 
        switch(this.props.onboardingState){
            case 'processing' :
                pageStyle = 'xxPage is-processing' 
                break; 
            case  'initial': 
                pageStyle = 'xxPage is-onboarding'
                break;
            default: 
                pageStyle = 'xxPage';
        }
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
                />
                <Tooltips tooltipText={this.props.tooltipText} />
                {this.props.children}
                {this.getFooter()}
            </main>
        );
    }
}

BasePage.propTypes = propTypes;
BasePage.defaultProps = defaultProps;
BasePage.childContextTypes = childContextTypes;

export default BasePage;
