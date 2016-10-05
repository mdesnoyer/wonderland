import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

import SiteHeader from '../wonderland/SiteHeader';
import Tooltips from '../knave/Tooltips';
import SiteFooter from '../wonderland/SiteFooter';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';

class Page extends React.Component {

    static displayName = 'Page';

    static getChildContext() {
        return {
            isMobile: UTILS.isMobile(),
        };
    }

    static propTypes = {
        // Window title.
        title: PropTypes.string,
        meta: PropTypes.arrayOf(PropTypes.object),
        sidebarContent: PropTypes.string,
        onSetSidebarContent: PropTypes.func,
        onboardingState: PropTypes.string,
        // For dynamic tooltips
        tooltipText: PropTypes.string,
        children: PropTypes.node.isRequired,
        onSearchBarChange: PropTypes.func,
        onSearchBarSubmit: PropTypes.func,
        searchQuery: PropTypes.string,
    }

    static defaultProps = {
        title: UTILS.buildPageTitle(T.get('neonScore')),
        meta: [],
        sidebarContent: null,
    }

    static childContextTypes = {
        isMobile: PropTypes.bool,
    }

    constructor(props) {
        super(props);
        this.state = { windowWidth: window.outerWidth };
        this.onWindowResize = this.onWindowResize.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.onWindowResize);
        this.onWindowResize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
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

    getPageStyle() {
        if (this.props.onboardingState === 'processing') {
            return 'xxPage is-processing';
        } else if (this.props.onboardingState === 'initial') {
            return 'xxPage is-onboarding';
        }
        return 'xxPage';
    }

    render() {
        return (
            <main className={this.getPageStyle()}>
                <Helmet
                    meta={this.getMeta()}
                    title={this.getTitle()}
                />
                <SiteHeader
                    sidebarContent={this.props.sidebarContent}
                    onSetSidebarContent={this.props.onSetSidebarContent}
                    query={this.props.searchQuery}
                    onSearchBarChange={this.props.onSearchBarChange}
                    onSearchBarSubmit={this.props.onSearchBarSubmit}
                />
                <Tooltips tooltipText={this.props.tooltipText} />
                {this.props.children}
                {this.getFooter()}
            </main>
        );
    }
}

export default Page;
