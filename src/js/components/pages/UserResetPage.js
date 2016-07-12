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
            <main className="xxPage">
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.userReset.title'))}
                />
                <SiteHeader />
                <section className="xxFormPage">
                    <h1 className="xxTitle">{T.get('copy.userReset.heading')}</h1>
                    <div className="xxText">
                        <p>{T.get('copy.userReset.body')} {T.get('error.passwordFormatInvalid')}</p>
                    </div>
                    <UserResetForm
                        {...self.props}
                    />
                </section>
                <SiteFooter />
            </main>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default UserResetPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
