import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Helmet from 'react-helmet';

import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import SESSION from '../../modules/session';

import SiteHeader from '../wonderland/SiteHeader';
import HomeImages from '../wonderland/HomeImages';

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = { sidebarContent: null };
        this.openSignUp = this.openSignUp.bind(this);
    }

    static contextTypes = {
        router: PropTypes.object
    };

    componentWillMount() {
        var self = this;
        SESSION.user()
            .then(function(userData) {
                self.context.router.push(UTILS.DRY_NAV.VIDEO_LIBRARY.URL);
            })
            .catch(function(err) {
                // Do nothing, user not signed in
            })
        ;
    }

    openSignUp(e) {
        e.preventDefault();

        this.setState({
            sidebarContent: 'signUp',
        });
    }

    render() {
        const { sidebarContent } = this.state;

        return (
            <div>
                <Helmet
                    title={UTILS.buildPageTitle(T.get('nav.home'))}
                />
                <SiteHeader sidebarContent={sidebarContent} />
                <ReactCSSTransitionGroup transitionName="xxFadeInOut" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
                    <div>
                        <article className="xxFeatureContent" key="home-featureContent">
                            <h2 className="xxSubtitle">{T.get('copy.homePage.neonBeta')}</h2>
                            <h1 className="xxTitle xxFeatureContent-title">{T.get('copy.homePage.title')}</h1>
                            <p>{T.get('copy.homePage.description')}</p>
                            <div className="xxFormButtons xxFeatureContent-buttons">
                                <a
                                    className="xxButton xxButton--transparent"
                                    href="#"
                                    onClick={this.openSignUp}
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
};
