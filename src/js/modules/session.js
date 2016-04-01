// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import cookie from 'react-cookie';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

const accessTokenKey = 'at',
    refreshTokenKey = 'rt',
    accountIdKey ='actId',
    rememberMeKey = 'rme',
    rememberedUsernameKey = 'ru',
    userKey = 'user'
;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

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
    },
    // Getter/setter on whether to store items during login or not
    rememberMe: function(bool) {
        if (bool !== undefined) {
            if (bool) {
                cookie.save(rememberMeKey, (!!bool ? 1 : 0), {path: '/', maxAge: 5*365*24*60*60}); // 5yr expiration
            } else {
                cookie.remove(rememberMeKey, {path: '/'});
                cookie.remove(rememberedUsernameKey, {path: '/'});
            }
        } else {
            bool = cookie.load(rememberMeKey) ? true : false;
        }
        return !!bool;
    },
    // Getter/setter for username stored during login
    rememberedUsername: function(username) {
        if (username) {
            cookie.save(rememberedUsernameKey, username, {path: '/', maxAge: 5*365*24*60*60}); // 5yr expiration
        }
        else {
            username = cookie.load(rememberedUsernameKey);
        }
        return username;
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default Session;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
