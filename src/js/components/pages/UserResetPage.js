// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import UserResetForm from '../forms/UserResetForm';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var UserResetPage = React.createClass({
    render: function() {
        var self = this;
        return (
            <main className="xxPage">
                <Helmet title={UTILS.buildPageTitle(T.get('copy.userReset.title'))} />
                <SiteHeader />
                <UserResetForm {...self.props} />
                <SiteFooter />
            </main>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default UserResetPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
