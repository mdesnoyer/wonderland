// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import AjaxMixin from '../../mixins/Ajax';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';
import Message from '../wonderland/Message';
import SESSION from '../../modules/session';
import E from '../../modules/errors';
import ModalParent from '../core/ModalParent';
import BrightcoveAccountIdModal from '../modals/BrightcoveAccountIdModal';
import BrightcoveClientIdModal from '../modals/BrightcoveClientIdModal';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var IntegrationsForm = React.createClass({
    mixins: [AjaxMixin], // ReactDebugMixin
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    propTypes: {
        clientId: React.PropTypes.string,
        publisherId: React.PropTypes.string,
        clientSecret: React.PropTypes.string,
        formMode: React.PropTypes.string.isRequired,
        provider: React.PropTypes.string.isRequired,
        integrationId: React.PropTypes.string,
        refreshFormMode: React.PropTypes.func.isRequired
    },
    getInitialState: function() {
        var self = this;
        return {
            integrationId: self.props.integrationId || '',
            provider: self.props.provider || 'brightcove',
            isError: false,
            formMode: self.props.formMode, //add
            activeModal: false,
            clientId: self.props.clientId,
            publisherId: self.props.publisherId,
            clientSecret: self.props.clientSecret
        };
    },
    shouldComponentUpdate: function(nextState, nextProps){
        return nextState !== nextProps
    },
    componentWillReceiveProps: function(nextProps){
        var self = this;
        self.setState({
                clientId: self.props.clientId,
                publisherId: self.props.publisherId,
                clientSecret: self.props.clientSecret
        })
    },
    render: function() {
        var self = this,
            buttonClassName,
            inputClassName,
            messageNeededComponent = self.state.isError ? <Message header={T.get('copy.plugins.types.' + self.state.provider + '.title') + ' ' + T.get('error')} body={E.getErrors()} flavour="danger" /> : false;
        ;
        if (self.state.formMode === 'loading') {
            buttonClassName = 'button is-primary is-disabled is-loading';
            inputClassName = 'input is-disabled';
        }
        else {
            buttonClassName = 'button is-primary';
            inputClassName = 'input is-medium';
        }
        switch (self.state.provider) {
        case 'brightcove':
            return (
                <div className="box wonderland-box">
                    <form onSubmit={self.handleSubmit}>
                        {messageNeededComponent}
                        <fieldset>
                            <legend>{T.get('copy.plugins.types.brightcove.form.heading')}</legend>

                            <label htmlFor="publisherId">{T.get('copy.integration.bc.accountId')}</label>
                            <p className="control is-grouped">
                                <input
                                    required
                                    className={inputClassName}
                                    autoComplete="off"
                                    type="text"
                                    ref="publisherId"
                                    id="publisherId"
                                    minLength="1"
                                    maxLength="256"
                                    value={self.state.publisherId}
                                    onChange={self.handleChangePublisherId}
                                    placeholder={T.get('copy.integration.bc.accountId')}
                                />
                                <a className="button is-medium" data-target="brightcove-publisherId" onClick={self.openModal}>?</a>
                            </p>

                            <label htmlFor="clientId">{T.get('copy.integration.bc.clientId')}</label>
                            <p className="control is-grouped">
                                <input
                                    required
                                    className={inputClassName}
                                    autoComplete="off"
                                    type="text"
                                    ref="clientId"
                                    id="clientId"
                                    minLength="1"
                                    maxLength="512"
                                    value={self.state.clientId}
                                    onChange={self.handleChangeClientId}
                                    placeholder={T.get('copy.integration.bc.clientId')}
                                />
                                <a className="button is-medium" data-target="brightcove-client-id" onClick={self.openModal}>?</a>
                            </p>

                            <label htmlFor="clientSecret">{T.get('copy.integration.bc.clientSecret')}</label>
                            <p className="control is-grouped">
                                <input
                                    required
                                    className={inputClassName}
                                    autoComplete="off"
                                    type="password"
                                    ref="clientSecret"
                                    id="clientSecret"
                                    minLength="1"
                                    maxLength="512"
                                    onChange={self.handChangeClientSecret}
                                    value={self.state.clientSecret}
                                    placeholder={T.get('copy.integration.bc.clientSecret')}
                                 />
                                <a className="button is-medium" data-target="brightcove-clientSecret" onClick={self.openModal}>?</a>
                            </p>
                            <p className="is-pulled-left">
                                <button className={buttonClassName} type="button" onClick={self.handleCancel}>{T.get('cancel')}</button>
                            </p>
                            <p className="is-pulled-right">
                                <button className={buttonClassName} type="submit">{T.get(self.state.formMode === 'add' ? 'save' : 'update')}</button>
                            </p>
                        </fieldset>
                    </form>
                    <ModalParent isModalActive={(self.state.activeModal === 'brightcove-publisherId')} handleToggleModal={self.closeModal}>
                        <BrightcoveAccountIdModal />
                    </ModalParent>
                    <ModalParent isModalActive={(self.state.activeModal === 'brightcove-client-id')} handleToggleModal={self.closeModal}>
                        <BrightcoveClientIdModal />
                    </ModalParent>
                    <ModalParent isModalActive={(self.state.activeModal === 'brightcove-clientSecret')} handleToggleModal={self.closeModal}>
                        <BrightcoveClientIdModal />
                    </ModalParent>
                </div>
            );
        case 'ooyala':
            // TODO: Ooyala form
            return false;
        default:
            messageNeededComponent = 'Unknown Provider: ' + self.state.provider;
            return (
                <Message body={messageNeededComponent} flavour="danger" />
            );
        }
    },
    handleChangePublisherId: function (e){
        var self = this;
        self.setState({
            publisherId: e.target.value
        });
    },
    handleChangeClientId: function (e){
        var self = this;
        self.setState({
            clientId: e.target.value
        });
    },
    handChangeClientSecret: function(e) {
       var self = this;
       self.setState({
        clientSecret: e.target.value
    });
    },
    openModal: function (e) {
        var self = this;
        self.setState({
            activeModal: e.target.dataset.target
        });
    },
    closeModal: function () {
        var self = this;
        self.setState({
            activeModal: false
        });
    },
    handleCancel: function (e) {
        e.preventDefault();
        this.context.router.push(UTILS.DRY_NAV.PLUGINS.URL);
    },
    handleSubmit: function (e) {
        var self = this,
            formMode = self.state.formMode
        ;
        e.preventDefault();
        self.setState({
            formMode: 'loading'
        }, function() {
            self.sendIntegrationData(formMode);
        });
    },
    sendIntegrationData: function(formMode) {
        var self = this,
            options = {},
            apiCall
        ;
        switch (self.state.provider) {
        case 'brightcove':
            if(self.props.formMode === 'add'){
                options.data = {
                    publisher_id: self.refs.publisherId.value.trim(),
                    application_client_id: self.refs.clientId.value.trim(),
                    application_client_secret: self.refs.clientSecret.value.trim(),
                    uses_bc_gallery: self.props.usesGallery
                };
            }
            else{
                options.data = {
                    publisher_id: self.refs.publisherId.value.trim(),
                    application_client_id: self.refs.clientId.value.trim(),
                    application_client_secret: self.refs.clientSecret.value.trim()
                };
            }
            break;
        case 'ooyala':
            // TODO: Read Ooyala form
            break;
        }
        if (formMode === 'add') {
            options.uses_bc_gallery = self.props.usesGallery;
            apiCall = self.POST('integrations/' + self.state.provider, options);
        } else {
            options.data.integration_id = self.state.integrationId;
            apiCall = self.PUT('integrations/' + self.state.provider, options);
        }
        apiCall
            .then(function(res) {
                self.setState({
                    isError: false,
                    formMode: 'update',
                    integrationId: res.integration_id
                },
                    function() {
                        if(formMode === 'add'){
                          self.props.refreshFormMode(res.integration_id);
                        }
                    }
                );
            }).catch(function(err) {
                E.raiseError(err);
                self.setState({
                    isError: true,
                    formMode: formMode
                });
            });
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default IntegrationsForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
