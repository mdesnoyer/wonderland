// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import E from '../../modules/errors';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import Videos from '../wonderland/Videos';
import Account from '../../mixins/Account';
import AjaxMixin from '../../mixins/Ajax';
import Secured from '../../mixins/Secured';
import T from '../../modules/translation';
import SESSION from '../../modules/session';
import OnboardingTutorial from '../wonderland/OnboardingTutorial';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const BREAKPOINT_MOBILE = 768;

var VideosPage = React.createClass({
    mixins: [Secured, Account, AjaxMixin],

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState: function () {
        return {
            displayName: '',
            showTutorial: false,
            windowWidth: window.outerWidth,
        };
    },

    componentDidMount: function() {
        window.addEventListener('resize', this.handleWindowResize);
        this.handleWindowResize();

        if (this.props.location.state.fromDemo) {
            this.setState({
                showTutorial: true,
            });
        }
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

        if (windowWidth < BREAKPOINT_MOBILE) {
            document.documentElement.classList.add('is-mobile');
        } else {
            document.documentElement.classList.remove('is-mobile');
        }
    },

    onTutorialClose: function(e) {
        e.preventDefault();

        this.setState({
            showTutorial: false,
        });
    },

    render: function() {
        const { showTutorial } = this.state;
        const isMobile = this.state.windowWidth < BREAKPOINT_MOBILE;

        return (
            <main className="xxPage">
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.videosPage.title'))}
                    meta={[
                        {"name": "viewport", "content": "width=device-width, initial-scale=1.0"},
                    ]}
                />
                <SiteHeader />
                <Videos isMobile={isMobile} />

                {
                    showTutorial ? (
                        <OnboardingTutorial onClose={this.onTutorialClose} />
                    ) : null
                }

                <SiteFooter />
            </main>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideosPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
