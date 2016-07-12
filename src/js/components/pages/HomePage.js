import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Helmet from 'react-helmet';

import T from '../../modules/translation';
import UTILS from '../../modules/utils';

import SiteHeader from '../wonderland/SiteHeader';
import HomeImages from '../wonderland/HomeImages';

export default class HomePage extends React.Component {
    render() {
        return (
            <div>
                <Helmet
                    title={UTILS.buildPageTitle(T.get('nav.home'))}
                />
                <SiteHeader />
                <ReactCSSTransitionGroup transitionName="xxFadeInOut" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
                    <div>
                        <article className="xxFeatureContent" key="home-featureContent">
                            <h2 className="xxSubtitle">{T.get('copy.homePage.neonBeta')}</h2>
                            <h1 className="xxTitle xxFeatureContent-title">{T.get('copy.homePage.title')}</h1>
                            <p>{T.get('copy.homePage.description')}</p>
                            <div className="xxFormButtons xxFeatureContent-buttons">
                                <a href="#" className="xxButton xxButton--transparent">{T.get('signUp')}</a>
                                <a
                                    href="#"
                                    className="xxButton xxButton--highlight"
                                >{T.get('tryItOut')}</a>
                            </div>
                        </article>

                        <div className="xxHomeLogIn" key="home-logIn">
                            {T.get('copy.homePage.signedUp')}
                            <a
                                href="#"
                                className="xxHomeLogIn-anchor"
                            >{T.get('logIn')}</a>
                        </div>

                        <HomeImages key="home-images" />
                    </div>
                </ReactCSSTransitionGroup>
            </div>
        );
    }
};
