// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

import XXCollection from './components/Collection';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class XXPage extends React.Component {
    render() {
        return (
            <div className="xxPage">
                <div className="xxHeader">
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
                </div>

                <XXCollection
                    title="Santa Cruz man wins Mavericks
                        big wave surf competition"
                />

                <XXCollection
                    title="Thursday evening at Daniel’s"
                />
            </div>
        );
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
