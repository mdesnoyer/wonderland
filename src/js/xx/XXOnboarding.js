// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

import XXUpload from './components/Upload';
import XXPageOverlay from './components/PageOverlay';
import XXLogin from './components/Login';
import XXForgotPassword from './components/ForgotPassword';
import XXChangePassword from './components/ChangePassword';

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

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class XXOnboarding extends React.Component {
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
        const { updateStage } = this;
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

                <div className="xxFeatureContent">
                    <h2 className="xxSubtitle">NeonScore for Video (beta 1.0)</h2>
                    <h1 className="xxTitle xxFeatureContent-title">How Engaging Are Your Images?</h1>
                    <p>The prettiest images don’t always drive the most clicks. Neon knows which images and video thumbnails evoke emotion and drive engagement for specific audiences, devices, and platforms. Try it out to see NeonScores for your video thumbnails. </p>
                    <div className="xxFormButtons xxFeatureContent-buttons">
                        <a href="#" className="xxButton xxButton--transparent">Sign Up</a>
                        <a href="#" className="xxButton xxButton--highlight">Try it Out</a>
                    </div>
                </div>

                <div className="xxHomeLogIn">
                    Already Signed Up?
                    <a
                        href="#"
                        className="xxHomeLogIn-anchor"
                        onClick={e => {e.preventDefault(); updateStage('login');}}
                    >Log In</a>
                </div>
            </main>
        );
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
