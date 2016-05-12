// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import UTILS from '../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function normalizeAccount(res) {
    return {
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
        isServingEnabled: res.serving_enabled ? !!res.serving_enabled : UTILS.DEFAULT_SERVING_STATE
    };
}

var Account = {
    getAccount: function() {
        return this.GET('', {
            successHandler: normalizeAccount
        });
    },
    updateAccount: function (account) {
        var options = {
            successHandler: normalizeAccount,
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
        return this.PUT('', options);
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Account;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
