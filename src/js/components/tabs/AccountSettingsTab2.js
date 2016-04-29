// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var AccountSettingsTab2 = React.createClass({
	// mixins: [ReactDebugMixin],
    propTypes: {
        isLoading: React.PropTypes.bool.isRequired,
        trackerAccountId: React.PropTypes.string.isRequired,
        stagingTrackerAccountId: React.PropTypes.string.isRequired
    },
    render: function() {
        var self = this;
        return (
            <fieldset>
                <label className="label">Tracker Account ID</label>
                <p className={'control' + (self.props.isLoading ? ' is-disabled is-loading' : '')}>
                    <input className={'input'} type="text" value={self.props.trackerAccountId} disabled />
                </p>
                <label className="label">Staging Tracker Account ID</label>
                <p className={'control' + (self.props.isLoading ? ' is-disabled is-loading' : '')}>
                    <input className={'input'} type="text" value={self.props.stagingTrackerAccountId} disabled />
                </p>
            </fieldset>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default AccountSettingsTab2;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
