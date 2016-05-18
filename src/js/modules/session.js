// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import cookie from 'react-cookie';
import AjaxModule from './ajax';
import UTILS from './utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const accessTokenKey = 'at',
    refreshTokenKey = 'rt',
    accountIdKey ='actId',
    rememberMeKey = 'rme',
    rememberedEmailKey = 'ru',
    userKey = 'user_info',
    COOKIE_MAX_AGE = 5 * 365 * 24 * 60 * 60 // 5 years approx.
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
        cookie.save(accessTokenKey, accessToken, { path: UTILS.COOKIE_DEFAULT_PATH });
        cookie.save(refreshTokenKey, refreshToken, { path: UTILS.COOKIE_DEFAULT_PATH });
        cookie.save(accountIdKey, accountId, { path: UTILS.COOKIE_DEFAULT_PATH });
        if (user) {
            localStorage.setItem(userKey, JSON.stringify(user));
        }
    },
    end: function() {
        var ret;
        if (this.state.accessToken) {
            ret = AjaxModule.doPost('logout', {
                host: CONFIG.AUTH_HOST,
                data: {
                    token: this.state.accessToken
                }
            }).promise;
        }
        else {
            ret = new Promise(function (resolve, reject) {
                resolve();
            });
        }
        cookie.remove(accessTokenKey, { path: UTILS.COOKIE_DEFAULT_PATH });
        cookie.remove(refreshTokenKey, { path: UTILS.COOKIE_DEFAULT_PATH });
        cookie.remove(accountIdKey, { path: UTILS.COOKIE_DEFAULT_PATH });
        localStorage.removeItem(userKey);
        this.state = {
            accessToken: undefined,
            refreshToken: undefined,
            accountId: undefined,
            user: undefined
        };
        return ret;
    },
    // Returns current state of the session
    active: function() {
        return !!this.state.accessToken;
    },
    // Getter/Setter for user data for the session (NOT for updating the user object in the DB)
    user: function(userData) {
        var self = this;
        return new Promise(function (resolve, reject) {
            if (userData) {
                self.state.user = userData;
                localStorage.setItem(userKey, JSON.stringify(userData));
            }
            else if (self.state.user) {
                userData = self.state.user;
            }
            else {
                try {
                    userData = JSON.parse(localStorage.getItem(userKey));
                }
                catch (e) {
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
                cookie.save(rememberMeKey, (!!bool ? 1 : 0), {
                    path: UTILS.COOKIE_DEFAULT_PATH,
                    maxAge: COOKIE_MAX_AGE
                });
            }
            else {
                cookie.remove(rememberMeKey, {path: UTILS.COOKIE_DEFAULT_PATH});
                cookie.remove(rememberedEmailKey, {path: UTILS.COOKIE_DEFAULT_PATH});
            }
        }
        else {
            bool = cookie.load(rememberMeKey) ? true : false;
        }
        return !!bool;
    },
    // Getter/setter for email stored during login
    rememberedEmail: function(email) {
        if (email) {
            cookie.save(rememberedEmailKey, email, {
                path: UTILS.COOKIE_DEFAULT_PATH,
                maxAge: COOKIE_MAX_AGE
            });
        }
        else {
            email = cookie.load(rememberedEmailKey);
        }
        return email;
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Session;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
