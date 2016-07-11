// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import XXUpload from '../../xx/components/Upload';
import XXPageOverlay from '../../xx/components/PageOverlay';
import XXLogin from '../../xx/components/Login';
import XXForgotPassword from '../../xx/components/ForgotPassword';
import XXChangePassword from '../../xx/components/ChangePassword';

import HomeImages from '../wonderland/HomeImages';

import XXOnboardingCountdown from '../../xx/components/OnboardingCountdown';
import XXOnboardingEmail from '../../xx/components/OnboardingEmail';
import XXOnboardingSlides from '../../xx/components/OnboardingSlides';

import XXOnboardingTutorial from '../../xx/components/OnboardingTutorial';
import XXCollection from '../../xx/components/Collection';

import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const navItems = [
    {
        id: 'learn-more',
        name: T.get('nav.learnMore'),
    },
    {
        id: 'contact-us',
        name: T.get('nav.contact'),
    },
    {
        id: 'sign-up',
        name: T.get('nav.signUp'),
    },
];

const ONBOARDING_STAGES = [
    'onboarding-upload',
    'onboarding-processing',
    'onboarding-tutorial',
    'onboarding-final',
];

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.updateStage = this.updateStage.bind(this);

        this.state = {
            stage: '',
            processingCountdown: 15,
        };
    }

    componentWillUnmount() {
        if (this.__processingTimer) {
            clearTimeout(this.__processingTimer);
        }
    }

    setProcessingTimer() {
        this.__processingTimer = setTimeout(() => {
            const { processingCountdown } = this.state;

            if (processingCountdown > 1) {
                this.setProcessingTimer();
            } else {
                this.updateStage('onboarding-tutorial');
            }

            this.setState({
                processingCountdown: processingCountdown - 1,
            });
        }, 1000);
    }

    updateStage(stage) {
        if (stage === 'onboarding-processing') {
            this.setProcessingTimer();
        }

        this.setState({
            stage,
        });
    }

    render() {
        const { updateStage } = this;
        const { stage, processingCountdown } = this.state;

        const className = ['xxPage'];
        if (stage === 'onboarding-upload') {
            className.push('is-onboarding');
        }
        if (stage === 'onboarding-processing') {
            className.push('is-processing');
        }

        return (
            <main className={className.join(' ')}>
                <header className="xxHeader">
                    <img className="xxLogo" src="/img/xx/logo.svg" />

                    <nav className="xxNav">
                        <ul>
                            {
                                navItems.map(navItem => {
                                    const navItemClassName = ['xxNav-item'];

                                    return (
                                        <li
                                            className={navItemClassName.join(' ')}
                                            key={navItem.id}
                                        >
                                            <a
                                                href=""
                                                className="xxNav-anchor"
                                                onClick={e => e.preventDefault()}
                                            >
                                                {navItem.name}
                                            </a>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </nav>

                    <ReactCSSTransitionGroup transitionName="xxFadeInOut" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
                        {
                          stage === 'onboarding-upload' ? (
                            <XXUpload
                                isOnboarding
                                onClose={() => updateStage('')}
                                onSubmit={() => updateStage('onboarding-processing')}
                            />
                          ) : null
                        }

                        {
                            stage === 'onboarding-tutorial' || stage === 'onboarding-final' ? (
                                <XXUpload
                                    onClose={() => updateStage('')}
                                    onSubmit={() => updateStage('')}
                                />
                            ) : null
                        }
                    </ReactCSSTransitionGroup>
                </header>

                {
                    stage === 'login' ? (
                        <XXPageOverlay onClose={() => updateStage('')}>
                            <XXLogin onClose={stage => updateStage(stage)} />
                        </XXPageOverlay>
                    ) : null
                }

                {
                    stage === 'forgotpassword' ? (
                        <XXPageOverlay onClose={() => updateStage('')}>
                            <XXForgotPassword onClose={stage => updateStage(stage)} />
                        </XXPageOverlay>
                    ) : null
                }

                {
                    stage === 'changepassword' ? (
                        <XXPageOverlay onClose={() => updateStage('')}>
                            <XXChangePassword onClose={stage => updateStage(stage)} />
                        </XXPageOverlay>
                    ) : null
                }

                <ReactCSSTransitionGroup transitionName="xxFadeInOut" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
                    {
                        ONBOARDING_STAGES.indexOf(stage) < 0 ? (
                            <div>
                                <article className="xxFeatureContent" key="home-featureContent">
                                    <h2 className="xxSubtitle">{T.get('copy.homePage.neonBeta')}</h2>
                                    <h1 className="xxTitle xxFeatureContent-title">{T.get('copy.homePage.title')}</h1>
                                    <p>{T.get('copy.homePage.description')}</p>
                                    <div className="xxFormButtons xxFeatureContent-buttons">
                                        <a href="#" className="xxButton xxButton--transparent">{T.get('signUp')}</a>
                                        <a
                                            href=""
                                            className="xxButton xxButton--highlight"
                                            onClick={e => {e.preventDefault(); updateStage('onboarding-upload');}}
                                        >{T.get('tryItOut')}</a>
                                    </div>
                                </article>

                                <div className="xxHomeLogIn" key="home-logIn">
                                    {T.get('copy.homePage.signedUp')}
                                    <a
                                        href="#"
                                        className="xxHomeLogIn-anchor"
                                        onClick={e => {e.preventDefault(); updateStage('login');}}
                                    >{T.get('logIn')}</a>
                                </div>

                                <HomeImages key="home-images" />
                            </div>
                        ) : null
                    }

                    {
                        stage === 'onboarding-processing' ? (
                            <XXOnboardingCountdown
                                key="onboarding-countdown"
                                seconds={processingCountdown}
                            />
                        ) : null
                    }

                    {
                        stage === 'onboarding-processing' ? (
                            <XXOnboardingEmail key="onboarding-email" />
                        ) : null
                    }

                    {
                        stage === 'onboarding-processing' ? (
                            <XXOnboardingSlides key="onboarding-slides" />
                        ) : null
                    }
                    {
                        stage === 'onboarding-tutorial' ? (
                            <XXOnboardingTutorial
                                key="onboarding-tutorial"
                                onClose={e => {e.preventDefault(); updateStage('onboarding-final');}}
                            />
                        ) : null
                    }
                </ReactCSSTransitionGroup>

                <ReactCSSTransitionGroup transitionName="xxFadeInOut" transitionEnterTimeout={400} transitionLeave={false}>
                    {
                        stage === 'onboarding-tutorial' || stage === 'onboarding-final' ? (
                            <XXCollection
                                key="first-collection"
                                title="Santa Cruz man wins Mavericks
                                    big wave surf competition"
                                updateStage={updateStage}
                            />
                        ) : null
                    }
                </ReactCSSTransitionGroup>
            </main>
        );
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
