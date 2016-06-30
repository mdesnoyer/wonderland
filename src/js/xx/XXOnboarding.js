// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import XXUpload from './components/Upload';
import XXPageOverlay from './components/PageOverlay';
import XXLogin from './components/Login';
import XXForgotPassword from './components/ForgotPassword';
import XXChangePassword from './components/ChangePassword';

import XXHomeImages from './components/HomeImages';

import XXOnboardingCountdown from './components/OnboardingCountdown';
import XXOnboardingEmail from './components/OnboardingEmail';
import XXOnboardingSlides from './components/OnboardingSlides';

import XXOnboardingTutorial from './components/OnboardingTutorial';
import XXCollection from './components/Collection';

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

const ONBOARDING_STAGES = [
    'onboarding-upload',
    'onboarding-processing',
    'onboarding-tutorial',
    'final',
];

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class XXOnboarding extends React.Component {
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

                    <ReactCSSTransitionGroup transitionName="fadeInOut" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
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
                            stage === 'onboarding-tutorial' || stage === 'final' ? (
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

                <ReactCSSTransitionGroup transitionName="fadeInOut" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
                    {
                        ONBOARDING_STAGES.indexOf(stage) < 0 ? (
                            <article className="xxFeatureContent" key="home-featureContent">
                                <h2 className="xxSubtitle">NeonScore for Video (beta 1.0)</h2>
                                <h1 className="xxTitle xxFeatureContent-title">How Engaging Are Your Images?</h1>
                                <p>The prettiest images don’t always drive the most clicks. Neon knows which images and video thumbnails evoke emotion and drive engagement for specific audiences, devices, and platforms. Try it out to see NeonScores for your video thumbnails. </p>
                                <div className="xxFormButtons xxFeatureContent-buttons">
                                    <a href="#" className="xxButton xxButton--transparent">Sign Up</a>
                                    <a
                                        href=""
                                        className="xxButton xxButton--highlight"
                                        onClick={e => {e.preventDefault(); updateStage('onboarding-upload');}}
                                    >Try it Out</a>
                                </div>
                            </article>
                        ) : null
                    }

                    {
                        ONBOARDING_STAGES.indexOf(stage) < 0 ? (
                            <div className="xxHomeLogIn" key="home-logIn">
                                Already Signed Up?
                                <a
                                    href="#"
                                    className="xxHomeLogIn-anchor"
                                    onClick={e => {e.preventDefault(); updateStage('login');}}
                                >Log In</a>
                            </div>
                        ) : null
                    }

                    {
                        ONBOARDING_STAGES.indexOf(stage) < 0 ? (
                            <XXHomeImages key="home-images" />
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
                                onClose={e => {e.preventDefault(); updateStage('final');}}
                            />
                        ) : null
                    }
                </ReactCSSTransitionGroup>

                <ReactCSSTransitionGroup transitionName="fadeInOut" transitionEnterTimeout={400} transitionLeave={false}>
                    {
                        stage === 'onboarding-tutorial' || stage === 'final' ? (
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
