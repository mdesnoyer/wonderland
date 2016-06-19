// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

import XXCollection from './components/Collection';
import XXUpload from './components/Upload';
import XXCollectionProcessing from './components/Collection/Processing';
import XXPageOverlay from './components/PageOverlay';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const navItems = [
    {
        id: 'learn-more',
        name: 'Learn More',
        component: null,
    },
    {
        id: 'contact-us',
        name: 'Contact Us',
        component: null,
    },
    {
        id: 'sign-up',
        name: 'Sign Up',
        component: null,
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
        const { stage } = this.state;

        return (
            <main className="xxPage">
                <header className="xxHeader">
                    <img className="xxLogo" src="/img/xx/logo.svg" />

                    <nav className="xxNav">
                        <ul>
                            {
                                navItems.map(navItem => {
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

                    <XXUpload onSubmit={() => this.updateStage('processing')} />
                </header>

                {
                    stage === 'learn-more' ? (
                        <XXPageOverlay
                            onClose={() => this.updateStage('')}
                        />
                    ) : null
                }

                {
                    stage === 'contact-us' ? (
                        <XXPageOverlay
                            onClose={() => this.updateStage('')}
                        />
                    ) : null
                }

                {
                    stage === 'sign-up' ? (
                        <XXPageOverlay
                            onClose={() => this.updateStage('')}
                        />
                    ) : null
                }

                {
                    stage === 'processing' ? (
                        <XXCollectionProcessing
                            onComplete={() => this.updateStage('processing-finished')}
                        />
                    ) : null
                }

                {
                    stage === 'processing-finished' ? (
                        <XXCollection
                            isProcessingReady
                            title="Michael Jackson: From Motown to Off the
                                Wall Documentary (2016)"
                        />
                    ) : null
                }

                <XXCollection
                    hasFilters
                    title="Santa Cruz man wins Mavericks
                        big wave surf competition"
                />

                <XXCollection
                    title="Santa Cruz man wins Mavericks
                        big wave surf competition"
                />

                <XXCollection
                    title="Thursday evening at Daniel’s"
                />
        </main>
        );
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
