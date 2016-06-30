// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

import XXUpload from './components/Upload';

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

export default class XXBlankCanvas extends React.Component {
    render() {
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

                    <XXUpload onSubmit={() => {}} />
                </header>

                <div className="xxFeatureContent">
                    <h1 className="xxTitle">Oh no! You don’t have any collections.</h1>
                    <div className="xxFormButtons xxFeatureContent-buttons">
                        <a href="#" className="xxButton xxButton--transparent">Sign Up</a>
                        <a href="#" className="xxButton xxButton--highlight">Try it Out</a>
                    </div>
                </div>
            </main>
        );
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
