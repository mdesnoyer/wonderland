// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import Message from '../wonderland/Message';
import SESSION from '../../modules/session';
import moment from 'moment';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var UserSettingsInfo = React.createClass({
    // mixins: [ReactDebugMixin],
    getInitialState: function() {
        var self = this;
        return {
            isLoading: true,
            username: '',
            created: '',
            updated: '',
            avatar: ''
        }  
    },
    componentWillMount: function() {
        var self = this;
        SESSION.user()
            .then(function(userData) {
                self.setState({
                    isLoading: false,
                    username: userData.username,
                    created: userData.created,
                    updated: userData.updated,
                })
            })
            .catch(function(err) {
                self.setState({
                    isLoading: false
                })
            })
        ;
    },
    render: function() {
        var self = this,
            created = self.state.created ? moment(self.state.created).format('D MMM YYYY') : '',
            updated = self.state.updated ? moment(self.state.updated).format('D MMM YYYY') : ''
        ;
        return (
            <fieldset>
                <div className="xxFormField">
                    <label className="xxLabel">{T.get('label.username')}</label>
                    <input
                        className="xxInputText"
                        type="text"
                        value={self.state.username}
                        disabled
                    />
                </div>
                <div className="xxFormField">
                    <label className="xxLabel">{T.get('label.created')}</label>
                    <input
                        className="xxInputText"
                        type="text"
                        value={created}
                        disabled
                    />
                </div>
                <div className="xxFormField">
                    <label className="xxLabel">{T.get('label.updated')}</label>
                    <input
                        className="xxInputText"
                        type="text"
                        value={updated}
                        disabled
                    />
                </div>
            </fieldset>
        )
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default UserSettingsInfo;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
