// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Helmet from 'react-helmet';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import SESSION from '../../modules/session';
import SiteHeader from '../wonderland/SiteHeader';
import HomeImages from '../wonderland/HomeImages';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var HomePage = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {
            sidebarContent: null
        };
    },
    componentWillMount: function() {
        var self = this;
        if (SESSION.active()) {
            self.context.router.push(UTILS.DRY_NAV.VIDEO_LIBRARY.URL);
        }
    },
    openSignUp: function(e) {
        var self = this;
        e.persist()
        self.setState({
            sidebarContent: 'signUp'
        });
    },
    render() {
        var self = this;
        return (
            <div>
                <Helmet
                    title={UTILS.buildPageTitle(T.get('nav.home'))}
                />
                <SiteHeader sidebarContent={self.state.sidebarContent} />
                <ReactCSSTransitionGroup transitionName="xxFadeInOut" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
                    <div>
                        <article className="xxFeatureContent" key="home-featureContent">
                            <h1 className="xxTitle xxFeatureContent-title">{T.get('copy.homePage.title')}</h1>
                            <p dangerouslySetInnerHTML={{__html: T.get('copy.homePage.description')}}></p>
                            <div className="xxFormButtons xxFeatureContent-buttons">
                                <a
                                    className="xxButton xxButton--transparent"
                                    href="#"
                                    onClick={self.openSignUp}
                                >{T.get('action.signUp')}</a>
                                <Link
                                    to={UTILS.DRY_NAV.DEMO.URL}
                                    className="xxButton xxButton--highlight"
                                >{T.get('tryItOut')}</Link>
                            </div>
                        </article>
                        <div className="xxHomeLogIn" key="home-logIn">
                            {T.get('copy.homePage.signedUp')}
                            <a
                                href={UTILS.DRY_NAV.SIGNIN.URL}
                                className="xxHomeLogIn-anchor"
                            >{T.get('action.signIn')}</a>
                        </div>
                        <HomeImages key="home-images" />
                    </div>
                </ReactCSSTransitionGroup>
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default HomePage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
