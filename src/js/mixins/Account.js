// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import AJAX from '../modules/ajax';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var Account = {
    getAccount: function() {
        return new Promise(function (resolve, reject) {
            AJAX.doGet('', {})
                .then(function(res) {
                    resolve({
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
                    });
                })
                .catch(function (err) {
                    reject(err);
                });
        });
    },
    updateAccount: function (account) {
        return new Promise(function (resolve, reject) {
            var options = {
                data: {
                    default_thumbnail_id: account.defaultThumbnailId,
                    tracker_account_id: account.trackerAccountId,
                    account_id: account.accountId,
                    default_width: account.defaultWidth,
                    default_height: account.defaultHeight,
                    staging_tracker_account_id: account.stagingTrackerAccountId,
                    email: account.email,
                    customer_name: account.accountName,
                    serving_enabled: account.isServingEnabled
                }
            };
            AJAX.doPut('', options)
                .then(function(json) {
                    resolve(json);
                })
                .catch(function(err) {
                    reject(err);
                });
        });
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default Account;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
