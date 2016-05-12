// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
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
            username: ''
        };
    },
    componentWillMount: function() {
        var self = this,
            displayName
        ;
        self.getAccount()
            .then(function(account) {
                self.setState({
                    isServingEnabled: account.isServingEnabled
                }); 
            })
            .catch(function(err){
                E.raiseError(JSON.parse(err.responseText).error.message);
            });
        if (SESSION.active()) {
            SESSION.user()
                .then(function(userData) {
                    if (userData) {
                        if (userData.first_name) {
                            displayName = userData.first_name;
                        }
                        else {
                            displayName = userData.username
                        }
                        self.setState({
                            username: displayName
                        });
                    }
                })
                .catch(function(err) {
                    console.log(err);
                })
            ;
        }
        else {
            // Do nothing
        }
    },
    render: function() {
        var self = this,
            heading = T.get('copy.videosPage.heading'),
            body = T.get('copy.videosPage.body', {
                '@username': self.state.username
            })
        ;
        return (
            <div>
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.videosPage.title'))}
                />
                <SiteHeader />
                <section className="section">
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
