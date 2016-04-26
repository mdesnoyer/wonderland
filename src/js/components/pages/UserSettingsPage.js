// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import T from '../../modules/translation';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';
import Secured from '../../mixins/Secured';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var UserSettingsPage = React.createClass({
    mixins: [Secured],
    render: function() {
        return (
            <div>
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.userSettings.title'))}
                />
                <SiteHeader />
                <section className="section">
                    <div className="container">
                        <h1 className="title is-2">{T.get('copy.userSettings.heading')}</h1>
                        <div className="content">
                            <p><span dangerouslySetInnerHTML={{__html: T.get('copy.userSettings.body')}} /></p>
                        </div>
                    </div>
                </section>
                <SiteFooter />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default UserSettingsPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

