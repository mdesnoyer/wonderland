// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import Account from '../../mixins/Account';
import AjaxMixin from '../../mixins/Ajax';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var AccountSettingsTab2 = React.createClass({
    mixins: [Account, AjaxMixin],
    getInitialState: function () {
        return {
            isLoading: true,
            isError: false,
            trackerAccountId: '',
            defaultThumbnailId: '',
            stagingTrackerAccountId: ''
        };
    },
    componentDidMount: function() {
        var self = this;
        self.getAccount()
            .then(function (account) {
                self.setState({
                    isLoading: false,
                    isError: false,
                    trackerAccountId: account.trackerAccountId,
                    stagingTrackerAccountId: account.stagingTrackerAccountId
                });
            })
            .catch(function (err) {
                E.raiseError(err);
                self.setState({
                    isLoading: false,
                    isError: true
                });
            });
    },
    render: function() {
        var self = this;
        return (
            <fieldset>
                <div className="xxFormField">
                    <label className="xxLabel">{T.get('label.trackerAccountId')}</label>
                    <input className={'xxInputText'} type="text" value={self.state.trackerAccountId} disabled />
                </div>
                <div className="xxFormField">
                    <label className="xxLabel">{T.get('label.stagingTrackerAccountId')}</label>
                    <input className={'xxInputText'} type="text" value={self.state.stagingTrackerAccountId} disabled />
                </div>
                {/*<div className="xxFormField">
                    <label className="is-hidden label">{T.get('label.defaultThumbnailId')}</label>
                    <input
                        className={'is-hidden xxInputText'}
                        type="text"
                        minLength="1"
                        maxLength="2048"
                        value={self.state.defaultThumbnailId}
                        disabled
                    />
                </div>*/}
            </fieldset>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default AccountSettingsTab2;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
