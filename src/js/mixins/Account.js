// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import UTILS from '../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function normalizeAccount(res) {
    debugger
    return {
        integrationIds: res.integration_ids,
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
        accountName: res.customer_name
    };
}

var Account = {
    getAccount: function(shouldRetry) {
        return this.GET('', {
            successHandler: normalizeAccount,
            shouldRetry: shouldRetry
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
                customer_name: account.accountName
            }
        };
        return this.PUT('', options);
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Account;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
