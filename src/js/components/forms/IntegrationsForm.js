// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import ReactDebugMixin from 'react-debug-mixin';
import AJAX from '../../modules/ajax';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';
import Message from '../wonderland/Message';
import E from '../../modules/errors';
import ModalParent from '../core/ModalParent';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var IntegrationsForm = React.createClass({
	mixins: [ReactDebugMixin],
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        var self = this;
        return {
            id: self.props.id,
            provider: self.props.provider || 'brightcove',
            isError: false,
            mode: self.props.id ? 'loading' : 'adding', // loading/adding/updating
            activeModal: false
        };
    },
    componentWillMount: function() {
        var self = this;
        if (self.state.id) {
            AJAX.doGet('integrations/' + self.state.provider, {
                data: {
                    integration_id: self.state.id
                }
            })
                .then(function(res) {
                    switch (self.state.provider) {
                    case 'brightcove':
                        self.setState({
                            mode: 'updating',
                            publisherId: res.publisher_id,
                            readToken: res.read_token,
                            writeToken: res.write_token
                        });
                        break;
                    case 'ooyala':
                        // TODO: Handle Ooyala response
                        self.setState({
                            mode: 'updating'
                        });
                        break;
                    }
                }).catch(function(err) {
                    E.checkForError(err.statusText, false);
                    self.setState({
                        isError: true,
                        mode: 'adding'
                    });
                });
        }
    },
    render: function() {
        var self = this,
            buttonClassName,
            inputClassName,
            messageNeeded = self.state.isError ? <Message header={T.get('copy.integrations.types.' + self.state.provider + '.title') + ' ' + T.get('error')} body={E.getErrors()} flavour="danger" /> : '';
        ;
        if (self.state.mode === 'loading') {
            buttonClassName = 'button is-primary is-medium is-disabled is-loading';
            inputClassName = 'input is-medium is-disabled';
        }
        else {
            buttonClassName = 'button is-medium is-primary';
            inputClassName = 'input is-medium';
        }
        switch (self.state.provider) {
        case 'brightcove':
            return (
                <div>
                    <form onSubmit={self.handleSubmit}>
                        {messageNeeded}
                        <fieldset>
                            <legend className="subtitle is-5">{T.get('copy.integrations.types.brightcove.form.heading')}</legend>
                            
                            <label htmlFor="publisherId">{T.get('copy.integrations.types.brightcove.form.publisherId')}</label>
                            <p className="control is-grouped">
                                <input required className={inputClassName} type="text" ref="publisherId" id="publisherId" value={self.state.publisherId} placeholder={T.get('copy.integrations.types.brightcove.form.publisherId')} />
                                <a className="button is-medium" data-target="brightcove-publisherId" onClick={self.openModal}>?</a>
                            </p>
                            
                            <label htmlFor="readToken">{T.get('copy.integrations.types.brightcove.form.readToken')}</label>
                            <p className="control is-grouped">
                                <input required className={inputClassName} type="text" ref="readToken" id="readToken" value={self.state.readToken} placeholder={T.get('copy.integrations.types.brightcove.form.readToken')} />
                                <a className="button is-medium" data-target="brightcove-readToken" onClick={self.openModal}>?</a>
                            </p>
                            
                            <label htmlFor="writeToken">{T.get('copy.integrations.types.brightcove.form.writeToken')}</label>
                            <p className="control is-grouped">
                                <input required className={inputClassName} type="text" ref="writeToken" id="writeToken" value={self.state.writeToken} placeholder={T.get('copy.integrations.types.brightcove.form.writeToken')} />
                                <a className="button is-medium" data-target="brightcove-writeToken" onClick={self.openModal}>?</a>
                            </p>
                            
                            <div className="is-pulled-left">
                                <button className={buttonClassName} type="cancel" onClick={self.handleCancel}>{T.get('cancel')}</button>
                            </div>
                            <div className="is-pulled-right">
                                <button className={buttonClassName} type="submit">{T.get(self.state.mode === 'adding' ? 'save' : 'update')}</button>
                            </div>
                        </fieldset>
                    </form>
                    <ModalParent isModalActive={(self.state.activeModal === 'brightcove-publisherId')} handleToggleModal={self.closeModal}>
                        <section className="box is-desktop">
                            <h1 className="title is-4">
                                How to locate your Publisher ID
                            </h1>
                            <div className="content">
                                This allows us to find the videos in your Brightcove account.
                                <ol>
                                    <li>Log into your Brightcove account</li>
                                    <li>Your Publisher ID is below where it says “Welcome, _name_”
                                        <br/>
                                        <img src="/img/brightcove_publisher_id.png"/>
                                    </li>
                                </ol>
                            </div>
                        </section>
                    </ModalParent>
                    <ModalParent isModalActive={(self.state.activeModal === 'brightcove-readToken')} handleToggleModal={self.closeModal}>
                        <section className="box is-desktop">
                            <h1 className="title is-4">
                                How to locate your Read Token with URL access
                            </h1>
                            <div className="content">
                                The Brightcove Read Token with URL Access lets Neon find the videos in your video library.
                                <ol>
                                    <li>Log into your Brightcove account</li>
                                    <li>Click on “Account Settings” in the top right corner of the page</li>
                                    <li>Select "API Management" in the left sidebar
                                        <br/>
                                        <img src="/img/brightcove_account_settings.png"/>
                                    </li>
                                    <li>In the list of tokens, you should see at least one Read Token with "URL Access" listed in the options. You can copy this token by clicking the middle "Copy" button in the "Manage" column.
                                        <br/>
                                        <img src="/img/brightcove_read_token.png"/>
                                    </li>
                                </ol>
                                Note: You may have multiple Read Tokens with URL Access if you or someone on your team has engaged in API management tasks in the past. You can use any Read Token as long as the one you pick has URL Access.
                            </div>
                        </section>
                    </ModalParent>
                    <ModalParent isModalActive={(self.state.activeModal === 'brightcove-writeToken')} handleToggleModal={self.closeModal}>
                        <section className="box is-desktop">
                            <h1 className="title is-4">
                                How to locate your Write Token
                            </h1>
                            <div className="content">
                                The write token allows Neon to change the thumbnails for videos in your Brightcove account. Thumbnails will never be changed without you choosing a Neon thumbnail for a video after it finishes processing in your Neon account. You can easily change the thumbnail back to what you were previously using at any time.
                                <ol>
                                    <li>Log into your Brightcove account</li>
                                    <li>Click on “Account Settings” in the top right corner of the page</li>
                                    <li>Select "API Management" in the left sidebar
                                        <br/>
                                        <img src="/img/brightcove_account_settings.png"/>
                                    </li>
                                    <li>In the bottom right of the tokens panel, click the dropdown menu and select “Write Token” to create a new token.
                                        <br/>
                                        <img src="/img/brightcove_write_token.png"/>
                                    </li>
                                    <li>The new Write Token should appear at the bottom of the list. You can copy this token by clicking the middle "Copy" button under the "Manage" column.</li>
                                </ol>
                            </div>
                        </section>
                    </ModalParent>
                </div>
            );
        case 'ooyala':
            // TODO: Ooyala form
            return false;
        default:
            messageNeeded = 'Unknown Provider: ' + self.state.provider;
            return (
                <Message body={messageNeeded} flavour="danger" />
            );
        }

    },
    openModal: function (e) {
        this.setState({
            activeModal: e.target.dataset.target
        });
    },
    closeModal: function () {
        this.setState({
            activeModal: false
        });
    },
    handleCancel: function (e) {
        e.preventDefault();
        this.context.router.push(UTILS.DRY_NAV.INTEGRATIONS.URL);
    },
    handleSubmit: function (e) {
        var self = this,
            options = {},
            apiCall
        ;
        e.preventDefault();
        switch (self.state.provider) {
        case 'brightcove':
            options.data = {
                publisher_id: self.refs.publisherId.value.trim(),
                read_token: self.refs.readToken.value.trim(),
                write_token: self.refs.writeToken.value.trim()
            };
            break;
        case 'ooyala':
            // TODO: Read Ooyala form
            break;
        }
        if (self.state.mode === 'adding') {
            apiCall = AJAX.doPost('integrations/' + self.state.provider, options);
        } else {
            options.data.integration_id = self.state.id;
            apiCall = AJAX.doPut('integrations/' + self.state.provider, options);
        }
        apiCall
            .then(function(res) {
                self.context.router.push(UTILS.DRY_NAV.INTEGRATIONS.URL);
            }).catch(function(err) {
                E.checkForError(err.statusText, false);
                self.setState({
                    isError: true
                });
            });
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default IntegrationsForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
