// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import Message from './Message';
import AJAX from '../../modules/ajax';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';
import E from '../../modules/errors';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Integrations = React.createClass({
	// mixins: [ReactDebugMixin],
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {
            errorMessageArray: [],
            isError: false,
            integrations: []
        }  
    },
    componentWillMount: function() {
        var self = this,
            options = {
                fields: ['integrations']
            }
        ;
        AJAX.doGet('', options)
            .then(function(res) {
                self.setState({
                    isError: false,
                    integrations: res.integrations || res.integration_ids || []
                });
            }).catch(function(err) {
                E.checkForError(err.statusText, false);
                self.setState({
                    isError: true
                });
            });
    },
    render: function() {
        var self = this,
            additionalClass = 'table is-striped' + (self.props.isBusy ? ' is-busy' : ''),
            messageNeeded = self.state.isError ? <Message header={T.get('copy.integrations.heading') + ' ' + T.get('error')} body={E.getErrors()} flavour="danger" /> : ''
        ;
        return (
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
                            // TEMP UNTIL API IS READY
                            integration = {
                                integration_id: integration,
                                type: 'brightcove'
                            };
                            return (
                                <tr key={integration.integration_id}>
                                    <td>
                                        <img src={T.get('copy.integrations.types.' + integration.type + '.img')} />
                                    </td>
                                    <td>
                                        {T.get('copy.integrations.types.' + integration.type + '.title')} - {integration.integration_id}
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
                            <a className="button is-primary is-medium is-pulled-right" onClick={self.addNew}>{T.get('add')}</a>
                        </th>
                    </tr>
                </tfoot>
            </table>
        );
    },
    configure: function(integration) {
        this.context.router.push('/integrations/' + integration.type + '/?id=' + integration.integration_id);
    },
    addNew: function() {
        // this.context.router.push(UTILS.DRY_NAV.INTEGRATIONS_NEW.URL);
        // Temp until there are more types of integrations
        this.context.router.push(UTILS.DRY_NAV.INTEGRATIONS_BRIGHTCOVE.URL);
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Integrations;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
