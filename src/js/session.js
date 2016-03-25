// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import cookie from 'react-cookie';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

const accessTokenKey = 'at',
    refreshTokenKey = 'rt',
    accountIdKey ='actId',
    userKey = 'user';

var Session = {
    state: {
        accessToken: cookie.load(accessTokenKey),
        refreshToken: cookie.load(refreshTokenKey),
        accountId: cookie.load(accountIdKey),
        user: undefined
    },
    set: function(accessToken, refreshToken, accountId, user) {
        this.state = {
            accessToken: accessToken,
            refreshToken: refreshToken,
            accountId: accountId,
            user: user || this.state.user
        };
        cookie.save(accessTokenKey, accessToken, { path: '/' });
        cookie.save(refreshTokenKey, refreshToken, { path: '/' });
        cookie.save(accountIdKey, accountId, { path: '/' });
        if (user) {
            localStorage.setItem(userKey, JSON.stringify(user));
        }
    },
    end: function() {
        cookie.remove(accessTokenKey, { path: '/' });
        cookie.remove(refreshTokenKey, { path: '/' });
        cookie.remove(accountIdKey, { path: '/' });
        this.state = {
            accessToken: undefined,
            refreshToken: undefined,
            accountId: undefined,
            user: undefined
        };
    },
    // Returns current state of the session
    active: function() {
        return !!this.state.accessToken;
    },
    // Getter/Setter for user data for the session (NOT for updating the user object in the DB)
    user: function (userData) {
        return new Promise(function (resolve, reject) {
            if (userData) {
                this.state.user = userData;
                localStorage.setItem(userKey, JSON.stringify(userData));
            } else if (this.state.user) {
                userData = this.state.user;
            } else {
                try {
                    userData = JSON.parse(localStorage.getItem(userKey));
                } catch (e) {
                    // TODO: Get user from API based on session
                    return reject(e);
                }
            }
            resolve(userData);
        });
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default Session;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 