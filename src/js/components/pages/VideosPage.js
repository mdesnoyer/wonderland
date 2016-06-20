// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import E from '../../modules/errors';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import Videos from '../wonderland/Videos';
import Account from '../../mixins/Account';
import AjaxMixin from '../../mixins/Ajax';
import Secured from '../../mixins/Secured';
import T from '../../modules/translation';
import SESSION from '../../modules/session';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideosPage = React.createClass({
    // mixins: [ReactDebugMixin],
    mixins: [Secured, Account, AjaxMixin],
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
        return {
            isServingEnabled: false,
            displayName: ''
        };
    },
    componentWillMount: function() {
        var self = this;
        self.getAccount()
            .then(function (account) {
                self.setState({
                    isServingEnabled: account.isServingEnabled
                });
            })
            .catch(function (err) {
                E.raiseError(err);
            })
        ;
        SESSION.user()
            .then(function(userData) {
                if (userData) {
                    self.setState({
                        displayName: userData.displayName
                    });
                }
            })
            .catch(function(err) {
                console.log(err);
            })
        ;
    },
    render: function() {
        var self = this,
            heading = T.get('copy.videosPage.heading'),
            body = T.get('copy.videosPage.body', {
                '@displayName' : self.state.displayName
            })
        ;
        return (
            <div>
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.videosPage.title'))}
                />
                <SiteHeader />
                <section className="wonderland-section section">
                    <div className="container">
                        <h1 className="title is-2">{heading}</h1>
                        {body}
                        <Videos
                            isServingEnabled={self.state.isServingEnabled}
                        />
                    </div>
                </section>
                <SiteFooter />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideosPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
