// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import UserForgotForm from '../forms/UserForgotForm';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var UserForgotPage = React.createClass({
    getInitialState: function() {
        return {
            sidebarContent: null // null or learnMore
        }
    },
    updateState: function() {
        var self = this;
        self.setState({
            sidebarContent: 'learnMore'
        });
    },
    render: function() {
        var self = this;
        return (
            <main className="xxPage">
                <Helmet title={UTILS.buildPageTitle(T.get('copy.userForgot.title'))} />
                <SiteHeader sidebarContent={self.state.sidebarContent} />
                <UserForgotForm showLegend={false} updateState={self.updateState} />
                <SiteFooter />
            </main>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default UserForgotPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
