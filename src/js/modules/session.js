// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import cookie from 'react-cookie';
import AJAX from './ajax';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

const accessTokenKey = 'at',
    refreshTokenKey = 'rt',
    accountIdKey ='actId',
    rememberMeKey = 'rme',
    rememberedEmailKey = 'ru',
    COOKIE_MAX_AGE = 5 * 365 * 24 * 60 * 60 // 5 years
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
        var self = this;
        self.state = {
            accessToken: accessToken,
            refreshToken: refreshToken,
            accountId: accountId,
            user: user || self.state.user
        };
        cookie.save(accessTokenKey, accessToken, { path: '/' });
        cookie.save(refreshTokenKey, refreshToken, { path: '/' });
        cookie.save(accountIdKey, accountId, { path: '/' });
        if (user) {
            localStorage.setItem(userKey, JSON.stringify(user));
        }
    },
    end: function() {
        var self = this,
            ret
        ;
        if (self.state.accessToken) {
            ret = AJAX.doPost('logout', {
                host: CONFIG.AUTH_HOST,
                data: {
                    token: self.state.accessToken
                }
            });
        }
        else {
            ret = new Promise(function (resolve, reject) {
                resolve();
            });
        }
        cookie.remove(accessTokenKey, {path: '/'});
        cookie.remove(refreshTokenKey, {path: '/'});
        cookie.remove(accountIdKey, {path: '/'});
        self.state = {
            accessToken: undefined,
            refreshToken: undefined,
            accountId: undefined,
            user: undefined
        };
        return ret;
    },
    // Returns current state of the session
    active: function() {
        var self = this;
        return !!self.state.accessToken;
    },
    // Getter/Setter for user data for the session (NOT for updating the user object in the DB)
    user: function (userData) {
        return new Promise(function (resolve, reject) {
            var self = this;
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
                    path: '/',
                    maxAge: COOKIE_MAX_AGE
                });
            }
            else {
                cookie.remove(rememberMeKey, {path: '/'});
                cookie.remove(rememberedEmailKey, {path: '/'});
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
                path: '/',
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
