// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import {Link} from 'react-router';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import SignInForm from '../forms/SignInForm';
import T from '../../modules/translation';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';
import Message from '../wonderland/Message';
import SESSION from '../../modules/session';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var SignInPage = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    componentWillMount: function() {
        if (SESSION.active()) {
            // Play nice, transport the user to the internal home
            // page (dashboard)
            this.context.router.push(UTILS.DRY_NAV.DASHBOARD.URL);
        }
    },
    render: function() {
        return (
            <div>
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.signIn.title'))}
                />
                <SiteHeader />
                <section className="section">
                    <div className="columns is-desktop">
                        <div className="column is-half is-offset-quarter">
                            <h1 className="title is-2">{T.get('copy.signIn.heading')}</h1>
                            <div className="content">
                                {/*<p>{T.get('copy.signIn.body')}</p>*/}
                            </div>
                            <SignInForm showLegend={false} />
                            {/*<Link activeClassName="active" to="/forgot/">{T.get('reset.forgot')}</Link>*/}
                        </div>
                    </div>
                </section>
                <SiteFooter />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default SignInPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
