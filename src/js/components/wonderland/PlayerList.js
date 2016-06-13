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
import PlayerListInput from './PlayerListInput';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var PlayerList = React.createClass({
    propTypes: {
        accountId: React.PropTypes.string,
        integrationId: React.PropTypes.string,
        playerArray: React.PropTypes.oneOfType([
                React.PropTypes.string,
                React.PropTypes.array
        ])
    },
    getInitialState: function() {
        var self = this;
        return {
            playerArray: self.props.playerArray
        };
    },
    componentWillReceiveProps: function(nextProps) {
        var self = this;
        self.setState({
            playerArray: nextProps.playerArray
        })
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        var self = this;
        return nextState.playerArray !== self.props.playerArray;
    },
    render: function() {
        var self = this,
            players
        ;
            if (self.state.playerArray.constructor === Array) {
                players = (
                            self.props.playerArray.map(function(player, key) {
                                return  <PlayerListInput checked={player.is_tracked} id={player.player_ref} key={key} integrationId={self.props.integrationId} name={player.name} accountId={self.props.accountId} />
                            })
                        );
            }
            else {
                players = <tr><td>{T.get('copy.integration.bc.playerNotFound')}</td><td></td></tr>
            }
            return (
                    <div className="box wonderland-box">
                        <h1 className="subtitle is-6">Select which Brightcove HTML5 players to enable:</h1>
                        <table className={"table is-bordered is-striped is-narrow has-text-centered"}>
                            <thead>
                                <tr>
                                    <th>Player</th>
                                    <th>Enable</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                </tr>
                            </tfoot>
                            <tbody>
                                {players}
                            </tbody>
                        </table>
                    </div>
            );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default PlayerList;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
