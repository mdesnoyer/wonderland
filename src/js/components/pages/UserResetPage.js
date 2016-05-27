// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import UserResetForm from '../forms/UserResetForm';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var UserResetPage = React.createClass({
    // mixins: [ReactDebugMixin],
    render: function() {
        var self = this;
        return (
            <div>
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.userReset.title'))}
                />
                <SiteHeader />
                <section className="wonderland-section section">
                    <div className="columns is-desktop">
                        <div className="column is-half is-offset-one-quarter">
                            <h1 className="title is-2">{T.get('copy.userReset.heading')}</h1>
                            <div className="content">
                                <p>
                                    {T.get('copy.userReset.body')} {T.get('error.passwordFormatInvalid')}
                                </p>
                            </div>
                            <UserResetForm
                                showLegend={false}
                                {...self.props}
                            />
                        </div>
                    </div>
                </section>
                <SiteFooter />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default UserResetPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
