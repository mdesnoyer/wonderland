// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import IntegrationsForm from '../forms/IntegrationsForm';
import Secured from '../../mixins/Secured';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';
import AjaxMixin from '../../mixins/Ajax';
import Account from '../../mixins/Account';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var PlayerListInput = React.createClass({
    mixins: [Secured, AjaxMixin, Account],
    propTypes: {
        id: React.PropTypes.string,
        accountId: React.PropTypes.string,
        checked: React.PropTypes.bool,
        integrationId: React.PropTypes.string
    },
    getInitialState: function() {
        var self = this;
        return {
            accountId: self.props.accountId,
            id: self.props.id,
            checked: self.props.checked,
            integrationId: self.props.integrationId
         };
    },
    render: function() {
        var self = this;
        return (
            <tr>
                <td>{self.props.name}</td>
                <td>
                    <input
                    type="checkbox"
                         checked={self.state.checked}
                         onClick={self.handleClick}
                    />
                </td>
            </tr>
        );
    },
    componentWillReceiveProps: function(nextProps) {
        var self = this;
        self.setState({
            checked: self.nextProps.checked,
            accountId: self.nextProps.accountId,
            id: self.nextProps.id,
            integrationId: self.nextProps.integrationId
        });
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        var self = this;
        return nextState !== self.props;
    },
    handleClick: function(e) {
        var self = this;
      self.setState({
        checked: e.target.checked
      },
        function() {
            self.ajaxSend();
        }
      );
    },
    ajaxSend: function() {
        var self = this;
        self.PUT('integrations/brightcove/players', {
            data: {
                player_ref: self.state.id,
                account_id: self.state.accountId,
                is_tracked: self.state.checked,
                integration_id: self.state.integrationId
            }
        }).then(function(res) {

        })
        .catch(function(err) {
        });
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default PlayerListInput;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
