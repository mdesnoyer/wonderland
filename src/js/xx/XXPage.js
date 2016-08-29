// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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

        this.updateStage = this.updateStage.bind(this);
        this.handleNavClick = this.handleNavClick.bind(this);

        this.state = {
            stage: '',
        };
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
        const { stage } = this.state;

        const currentNavItems = ['has-account', 'account'].indexOf(stage) >= 0 ? navItemsLoggedIn : navItems;

        const overlays = {
            'learn-more': (
                <XXLearnMore key="learn-more" />
            ),
            'contact-us': (
                <XXContactUs onClose={() => updateStage('')} key="contact-us" />
            ),
            'sign-up': (
                <XXSignUp onClose={stage => updateStage(stage)} key="sign-up" />
            ),
            'account': (
                <XXAccount onClose={stage => updateStage(stage)} key="account" />
            ),
        };

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

                {/*
                    One XXPageOverlay for all overlay pages, then all the content goes inside it.
                    That allows the overlay to slide in & out the first time & then just the
                    individual content blocks to transition within while it's open.
                */}
                <ReactCSSTransitionGroup transitionName="transitionPageOverlay" transitionEnterTimeout={600} transitionLeaveTimeout={600}>
                    {
                        ['learn-more', 'contact-us', 'sign-up', 'account'].indexOf(stage) >= 0  ? (
                            <XXPageOverlay onClose={() => updateStage('')}>
                                {overlays[stage]}
                            </XXPageOverlay>
                        ) : null
                    }
                </ReactCSSTransitionGroup>

                <ReactCSSTransitionGroup transitionName="xxFadeInOut" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
                    {
                        stage === 'image-zoom' ? (
                            <XXImageZoom onClose={() => updateStage('')} />
                        ) : null
                    }
                </ReactCSSTransitionGroup>

                {
                    stage === 'processing' ? (
                        <XXCollectionProcessing
                            onComplete={() => updateStage('processing-finished')}
                        />
                    ) : null
                }

                {
                    stage === 'processing-finished' ? (
                        <XXCollection
                            isProcessingReady
                            title="Michael Jackson: From Motown to Off the
                                Wall Documentary (2016)"
                            updateStage={updateStage}
                        />
                    ) : null
                }

                <XXCollection
                    type="photo"
                    title="Thursday evening at Daniel’s"
                    updateStage={updateStage}
                />

                <XXCollection
                    hasFilters
                    title="Santa Cruz man wins Mavericks
                        big wave surf competition"
                    stage={stage}
                    updateStage={updateStage}
                />

                <XXCollection
                    title="Santa Cruz man wins Mavericks
                        big wave surf competition"
                    stage={stage}
                    updateStage={updateStage}
                />

                <XXCollection
                    title="Thursday evening at Daniel’s"
                    stage={stage}
                    updateStage={updateStage}
                />
        </main>
        );
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
