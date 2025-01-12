// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import IntegrationsForm from '../forms/IntegrationsForm';
import Secured from '../../mixins/Secured';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';
import PlayerList from '../wonderland/PlayerList';
import RadioInputForm from '../forms/RadioInputForm';
import AjaxMixin from '../../mixins/Ajax';
import Account from '../../mixins/Account';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var IntegrationsBrightcovePage = React.createClass({
    mixins: [Secured, AjaxMixin, Account],
    getInitialState: function() {
        var self = this,
            params = self.props.routeParams,
            usesGallery
        ;
        if (params.usesGallery) {
            usesGallery = (params.usesGallery === 'gallery');
            return {
                formMode: 'add',
                accountId: params.accountId,
                integrationType: 'brightcove',
                integrationId: '',
                dataToProps:'',
                playerArray:'',
                usesGallery: usesGallery,
                usesPlaylist: false
            };
        }
        else {
            return {
                formMode: 'update',
                integrationType: 'brightcove',
                accountId: params.accountId,
                integrationId: params.integrationId,
                dataToProps:'',
                playerArray:'',
                usesGallery: false,
                usesPlaylist: ''
            }
        }
    },
    componentWillMount: function() {
        var self = this;
        switch(self.state.formMode) {
            case 'add':
                self.refreshNeonAccountInfo();
            break;
            case 'update':
                self.refreshBrightCoveInfo();
            break;
        }
    },
    shouldComponentUpdate: function(nextState, nextProps) {
        return nextState !== nextProps;
    },
    render: function() {
        var self = this,
            hidePlayList
        ;
        hidePlayList = self.state.usesPlaylist ? '' : 'is-hidden';
        return (
            <div>
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.plugins.types.brightcove.title'))}
                />
                <SiteHeader />
                <section className="wonderland-section section">
                    <div className="columns is-desktop">
                        <div className="column is-half is-offset-one-quarter">
                            <h1>
                                <img src={T.get('copy.plugins.types.brightcove.img')} />
                            </h1>
                            <section className="container">
                                <IntegrationsForm
                                    provider="brightcove"
                                    integrationId={self.state.integrationId}
                                    formMode={self.state.formMode}
                                    clientId={self.state.clientId}
                                    publisherId= {self.state.publisherId}
                                    clientSecret={self.state.clientSecret}
                                    refreshFormMode={self.refreshFormMode}
                                    usesGallery={self.state.usesGallery}
                                />
                                <RadioInputForm
                                    usesGallery={self.state.usesGallery}
                                    radioType="uses_bc_smart_player"
                                    isActive={self.state.dataToProps.uses_bc_smart_player}
                                    accountId={self.state.accountId}
                                    formMode={self.state.formMode}
                                    integrationId={self.state.integrationId}
                                />
                                <RadioInputForm
                                    usesGallery={self.state.usesGallery}
                                    radioType="uses_bc_thumbnail_api"
                                    isActive={self.state.dataToProps.uses_bc_thumbnail_api}
                                    accountId={self.state.accountId}
                                    formMode={self.state.formMode}
                                    integrationId={self.state.integrationId}
                                />
                                <RadioInputForm
                                    radioType="uses_bc_videojs_player"
                                    isActive={self.state.dataToProps.uses_bc_videojs_player}
                                    accountId={self.state.accountId}
                                    formMode={self.state.formMode}
                                    integrationId={self.state.integrationId}
                                    refreshFormMode={self.refreshFormMode}
                                />
                                <div className={hidePlayList}>
                                    <PlayerList
                                        isActive={self.state.dataToProps.uses_bc_videojs_player}
                                        playerArray={self.state.playerArray}
                                        accountId={self.state.publisherId}
                                        integrationId={self.state.integrationId}
                                    />
                                </div>
                            </section>
                        </div>
                    </div>
                </section>
                <SiteFooter />
            </div>
        );
    },
    handleChange: function(type, value) {
        var self = this;
        self.setState({
            [type]:value
        });
    },
    refreshFormMode: function(integrationId) {
        var self = this;
            self.setState({
                formMode: 'update',
                integrationId: integrationId
            },
                function() {
                    self.refreshBrightCoveInfo();
                }
            );
    },
    refreshBrightCoveInfo: function() {
        var self = this;
        self.GET('integrations/' + self.state.integrationType, {
            data: {
                integration_id: self.state.integrationId,
                account_id: self.state.accountId
            }
        })
        .then(function(res) {
            self.setState({
                usesGallery: res.uses_bc_gallery,
                usesPlaylist: res.uses_bc_videojs_player,
                publisherId: res.publisher_id,
                clientId: res.application_client_id,
                clientSecret: res.application_client_secret,
                accountId: res.account_id,
                dataToProps: res
            },
                function() {
                    self.refreshBrightCovePlayers();
                }
            )
        })
        .catch(function(err) {
        });
    },
    refreshBrightCovePlayers: function() {
        var self = this;
        self.GET('integrations/brightcove/players', {
            data: {
                integration_id: self.state.integrationId,
                account_id: self.state.publisherId
            }
        }).then(function(res) {
              self.setState({
                playerArray: res.players
            })
        })
        .catch(function(err) {
        });
    },
    refreshNeonAccountInfo: function() {
        var self = this;
        self.getAccount()
            .then(function (account) {
                self.setState({
                    accountId: account.accountId
                })
            })
            .catch(function (err) {
            });
    }
});
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default IntegrationsBrightcovePage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
