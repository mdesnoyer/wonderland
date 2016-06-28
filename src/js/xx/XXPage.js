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

                {
                    stage === 'learn-more' ? (
                        <XXPageOverlay onClose={() => updateStage('')}>
                            <XXLearnMore />
                        </XXPageOverlay>
                    ) : null
                }

                {
                    stage === 'contact-us' ? (
                        <XXPageOverlay onClose={() => updateStage('')}>
                            <XXContactUs onClose={() => updateStage('')} />
                        </XXPageOverlay>
                    ) : null
                }

                {
                    stage === 'sign-up' ? (
                        <XXPageOverlay onClose={() => updateStage('')}>
                            <XXSignUp onClose={stage => updateStage(stage)} />
                        </XXPageOverlay>
                    ) : null
                }

                {
                    stage === 'account' ? (
                        <XXPageOverlay onClose={() => updateStage('')}>
                            <XXAccount onClose={stage => updateStage(stage)} />
                        </XXPageOverlay>
                    ) : null
                }

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
                    hasFilters
                    title="Santa Cruz man wins Mavericks
                        big wave surf competition"
                    updateStage={updateStage}
                />

                <XXCollection
                    title="Santa Cruz man wins Mavericks
                        big wave surf competition"
                    updateStage={updateStage}
                />

                <XXCollection
                    title="Thursday evening at Daniel’s"
                    updateStage={updateStage}
                />
        </main>
        );
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
