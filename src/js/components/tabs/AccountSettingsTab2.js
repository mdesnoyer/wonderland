// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import Account from '../../mixins/Account';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var AccountSettingsTab2 = React.createClass({
    mixins: [Account], // ReactDebugMixin
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
        self._isMounted = true;
        self.getAccount()
            .then(function (account) {
                if (self._isMounted) {
                    self.setState({
                        isLoading: false,
                        isError: false,
                        trackerAccountId: account.trackerAccountId,
                        defaultThumbnailId: account.defaultThumbnailId,
                        stagingTrackerAccountId: account.stagingTrackerAccountId
                    });
                }
            })
            .catch(function (err) {
                E.raiseError(JSON.parse(err.responseText).error.message);
                if (self._isMounted) {
                    self.setState({
                        isLoading: false,
                        isError: true
                    });
                }
            });
    },
    componentWillUnmount: function() {
        var self = this;
        self._isMounted = false;
    },
    render: function() {
        var self = this;
        return (
            <fieldset>
                <label className="label">{T.get('label.trackerAccountId')}</label>
                <p className={'control' + (self.state.isLoading ? ' is-disabled is-loading' : '')}>
                    <input className={'input'} type="text" value={self.state.trackerAccountId} disabled />
                </p>
                <label className="label">{T.get('label.stagingTrackerAccountId')}</label>
                <p className={'control' + (self.state.isLoading ? ' is-disabled is-loading' : '')}>
                    <input className={'input'} type="text" value={self.state.stagingTrackerAccountId} disabled />
                </p>
                <label className="label">{T.get('label.defaultThumbnailId')}</label>
                <p className={'control' + (self.state.isLoading ? ' is-loading is-disabled' : '')}>
                    <input
                        className={'input'}
                        type="text"
                        minLength="1"
                        maxLength="2048"
                        value={self.state.defaultThumbnailId}
                        disabled
                    />
                </p>
            </fieldset>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default AccountSettingsTab2;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
