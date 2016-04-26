// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import AJAX from '../modules/ajax';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var Account = {
    getInitialState: function() {
        return {
            isLoading: false,
            isError: false,
            defaultThumbnailId: '',
            trackerAccountId: '',
            stagingTrackerAccountId: '',
            accountId: '',
            created: '',
            updated: '',
            defaultWidth: '',
            defaultHeight: '',
            accountEmail: '',
            accountName: '',
            isServingEnabled: false
        }
    },
    componentWillMount: function() {
        var self = this;
        self.setState({
            isLoading: true
        }, self.getAccount());
    },
    getAccount: function() {
        var self = this,
            options = {}
        ;
        AJAX.doGet('', options)
            .then(function(res) {
                self.setState({
                    isLoading: false,
                    isError: false,
                    // integration_ids
                    // users
                    defaultThumbnailId: res.default_thumbnail_id,
                    trackerAccountId: res.tracker_account_id,
                    accountId: res.account_id,
                    created: res.created,
                    updated: res.updated,
                    defaultWidth: res.default_size[0],
                    defaultHeight: res.default_size[1],
                    stagingTrackerAccountId: res.staging_tracker_account_id,
                    accountEmail: res.email,
                    accountName: res.customer_name,
                    isServingEnabled: res.serving_enabled ? !!res.serving_enabled : false
                })
            })
            .catch(function(err) {
                var self = this;
                console.log(JSON.parse(err.responseText).error.data, false);
                self.setState({
                    isLoading: false,
                    isError: true
                });
            })
        ;
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default Account;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
