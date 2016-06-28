// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

import XXCollection from './components/Collection';
import XXUpload from './components/Upload';
import XXCollectionProcessing from './components/Collection/Processing';
import XXPageOverlay from './components/PageOverlay';
import XXLearnMore from './components/LearnMore';
import XXContactUs from './components/ContactUs';
import XXSignUp from './components/SignUp';
import XXAccount from './components/Account';
import XXImageZoom from './components/ImageZoom';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const BREAKPOINT_MOBILE = 768; // ideally synced with _variables.scss via JSON

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const navItems = [
    {
        id: 'learn-more',
        name: 'Learn More',
    },
    {
        id: 'contact-us',
        name: 'Contact Us',
    },
    {
        id: 'sign-up',
        name: 'Sign Up',
    },
];

const navItemsLoggedIn = [
    {
        id: 'learn-more',
        name: 'Learn More',
    },
    {
        id: 'contact-us',
        name: 'Contact Us',
    },
    {
        id: 'account',
        name: 'Account',
    },
];

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class XXPage extends React.Component {
    constructor(props) {
        super(props);

        this.handleWindowResize = this.handleWindowResize.bind(this);
        this.updateStage = this.updateStage.bind(this);
        this.handleNavClick = this.handleNavClick.bind(this);

        this.state = {
            stage: '',
            windowWidth: window.outerWidth,
        };

        this.handleWindowResize();
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    }

    handleWindowResize() {
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
    }

    updateStage(stage) {
        this.setState({
            stage,
        });
    }

    handleNavClick(id, e) {
        e.preventDefault();

        this.updateStage(id);
    }

    render() {
        const { updateStage } = this;
        const { stage, windowWidth } = this.state;

        const currentNavItems = ['has-account', 'account'].indexOf(stage) >= 0 ? navItemsLoggedIn : navItems;

        const isMobile = windowWidth < BREAKPOINT_MOBILE;

        return (
            <main className="xxPage">
                <header className="xxHeader">
                    <img className="xxLogo" src="/img/xx/logo.svg" />

                    <nav className="xxNav">
                        <ul>
                            {
                                currentNavItems.map(navItem => {
                                    const navItemClassName = ['xxNav-item'];
                                    if (navItem.id === stage) {
                                        navItemClassName.push('is-active');
                                    }

                                    return (
                                        <li
                                            className={navItemClassName.join(' ')}
                                            key={navItem.id}
                                        >
                                            <a
                                                href=""
                                                className="xxNav-anchor"
                                                onClick={e => this.handleNavClick(navItem.id, e)}
                                            >
                                                {navItem.name}
                                            </a>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </nav>

                    <XXUpload onSubmit={() => updateStage('processing')} />
                </header>

                <XXCollection
                    isMobile={isMobile}
                    title="Santa Cruz man wins Mavericks
                        big wave surf competition"
                    updateStage={updateStage}
                />
        </main>
        );
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
