// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import UserForgotForm from '../forms/UserForgotForm';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var UserForgotPage = React.createClass({
    // mixins: [ReactDebugMixin],
    render: function() {
        return (
            <main className="xxPage">
                <Helmet title={UTILS.buildPageTitle(T.get('copy.userForgot.title'))}/>
                <SiteHeader />
                <UserForgotForm showLegend={false}/>
                <SiteFooter />
            </main>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default UserForgotPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
