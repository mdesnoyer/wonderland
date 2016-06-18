// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

import XXCollection from './components/Collection';
import XXUpload from './components/Upload';
import XXCollectionProcessing from './components/Collection/Processing';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class XXPage extends React.Component {
    constructor(props) {
        super(props);

        this.updateStage = this.updateStage.bind(this);

        this.state = {
            stage: '',
        };
    }

    updateStage(stage) {
        this.setState({
            stage,
        });
    }

    render() {
        const { stage } = this.state;

        return (
            <main className="xxPage">
                <header className="xxHeader">
                    <img className="xxLogo" src="/img/xx/logo.svg" />

                    <nav className="xxNav">
                        <ul>
                            <li className="xxNav-item">
                                <a href="" className="xxNav-anchor">
                                    Learn More
                                </a>
                            </li>
                            <li className="xxNav-item">
                                <a href="" className="xxNav-anchor">
                                    Contact Us
                                </a>
                            </li>
                            <li className="xxNav-item">
                                <a href="" className="xxNav-anchor">
                                    Sign Up
                                </a>
                            </li>
                        </ul>
                    </nav>

                    <XXUpload onSubmit={() => this.updateStage('processing')} />
                </header>

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
