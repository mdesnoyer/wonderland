// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import Message from './Message';
import AjaxMixin from '../../mixins/Ajax';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';
import E from '../../modules/errors';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Plugins = React.createClass({
	mixins: [AjaxMixin], // ReactDebugMixin
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {
            errorMessageArray: [],
            isError: false,
            plugins: []
        }  
    },
    componentWillMount: function() {
        var self = this,
            options = {
                fields: ['integrations']
            }
        ;
        self.GET('', options)
            .then(function(res) {
                self.setState({
                    isError: false,
                    plugins: res.integrations || res.integration_ids || []
                });
            }).catch(function(err) {
                E.raiseError(err);
                self.setState({
                    isError: true
                });
            });
    },
    render: function() {
        var self = this,
            additionalClass = 'table is-striped' + (self.props.isLoading ? ' is-loading' : ''),
            messageNeeded = self.state.isError ? <Message header={T.get('copy.plugins.heading') + ' ' + T.get('error')} body={E.getErrors()} flavour="danger" /> : ''
        ;
        return (
            <table className={additionalClass}>
                <caption>
                    {messageNeeded}
                </caption>
                <tbody>
                    {
                        self.state.plugins.map(function(plugin, i) {
                            var configureClick = function() {
                                    self.configure(plugin);
                                };
                            // TEMP UNTIL API IS READY
                            plugin = {
                                integration_id: plugin,
                                type: 'brightcove'
                            };
                            return (
                                <tr key={plugin.integration_id}>
                                    <td>
                                        <img src={T.get('copy.plugins.types.' + plugin.type + '.img')} />
                                    </td>
                                    <td>
                                        {T.get('copy.plugins.types.' + plugin.type + '.title')} - {plugin.integration_id}
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
    configure: function(plugin) {
        this.context.router.push('/plugins/' + plugin.type + '/?id=' + plugin.integration_id);
    },
    addNew: function() {
        // this.context.router.push(UTILS.DRY_NAV.PLUGINS_NEW.URL);
        // Temp until there are more types of plugins
        this.context.router.push(UTILS.DRY_NAV.PLUGINS_BRIGHTCOVE.URL);
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Plugins;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
