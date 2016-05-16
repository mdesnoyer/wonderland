// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import Message from './Message';
import AjaxMixin from '../../mixins/Ajax';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';
import E from '../../modules/errors';
import ModalParent from '../core/ModalParent';
import BrightcoveChoiceModal from '../modals/BrightcoveChoiceModal';
import Account from '../../mixins/Account';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Integrations = React.createClass({
mixins: [AjaxMixin, Account], // ReactDebugMixin
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    propTypes: {
        pop: React.PropTypes.bool.isRequired
    },
    getDefaultProps: function() {
        return {
            pop: false
        };
    },
    getInitialState: function() {
        var self = this;
        return {
            errorMessageArray: [],
            isError: false,
            integrations: [],
            activeModal: false || self.props.pop
        }
    },
    componentWillMount: function() {
        var self = this;
        self.getAccount()
            .then(function(account) {
                self.GET('integrations')
                    .then(function(json) {
                        self.setState({
                            integrations: json.integrations
                        })
                    })
                    .catch(function (err) {
                    })
                ;
            })
            .catch(function (err) {
                console.log(err);
            })
        ;
    },
    render: function() {
        var self = this,
            additionalClass = 'table is-striped' + (self.props.isLoading ? ' is-loading' : ''),
            messageNeeded = self.state.isError ? <Message header={T.get('copy.plugins.heading') + ' ' + T.get('error')} body={E.getErrors()} flavour="danger" /> : ''
        ;
        return (
        <div>
            <table className={additionalClass}>
                <caption>
                    {messageNeeded}
                </caption>
                <tbody>
                    {
                        self.state.integrations.map(function(integration, i) {
                            var configureClick = function() {
                                self.configure(integration);
                            };
                            return (
                                <tr key={integration.integration_id}>
                                    <td>
                                        <img src={T.get('copy.plugins.types.' + integration.type + '.img')} />
                                    </td>
                                    <td>
                                        {T.get('copy.plugins.types.' + integration.type + '.title')} - {integration.integration_id}
                                    </td>
                                    <td>
                                        <a className="button is-medium is-pulled-right" onClick={configureClick}>{T.get('configure')}</a>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan="3">
                            <a className="button is-primary is-medium is-pulled-right" onClick={self.openModal}>{T.get('add')}</a>
                        </th>
                    </tr>
                </tfoot>
            </table>
            <ModalParent isModalActive={self.state.activeModal} handleToggleModal={self.closeModal}>
                <BrightcoveChoiceModal />
            </ModalParent>
        </div>
        );
    },
    configure: function(integration) {
        this.context.router.push('/integration/' + integration.type + '/' + integration.integration_id + '/')
    },
    addNew: function() {
        // this.context.router.push(UTILS.DRY_NAV.PLUGINS_NEW.URL);
        // Temp until there are more types of integrations
        this.context.router.push(UTILS.DRY_NAV.PLUGINS_BRIGHTCOVE.URL);
    },
    openModal: function (e) {
        var self = this;
        self.setState({
            activeModal: true
        });
    },
    closeModal: function () {
        var self = this;
        self.setState({
            activeModal: false
        });
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Integrations;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
