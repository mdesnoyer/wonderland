// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import cookie from 'react-cookie';
import AjaxModule from './ajax';
import UTILS from './utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const COOKIE_MAX_AGE = 5 * 365 * 24 * 60 * 60; // 5 years approx.

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Session = {
    state: {
        accessToken: cookie.load(UTILS.COOKIES_KEY.accessTokenKey),
        refreshToken: cookie.load(UTILS.COOKIES_KEY.refreshTokenKey),
        accountId: cookie.load(UTILS.COOKIES_KEY.accountIdKey),
        masqueradeAccountIdKey: undefined,
        user: undefined
    },
    set: function(accessToken, refreshToken, accountId, user) {
        var self = this,
            cookiePath = {
                path: UTILS.COOKIE_DEFAULT_PATH
            }
        ;
        if (self.state.accountId) {
            var ret = AjaxModule.doGet('', {
                headers: {
                    Authorization: 'Bearer ' + self.state.accessToken
                }
            }).promise;
            console.log(ret);
        }
        else {
             self.state = {
                accessToken: accessToken,
                refreshToken: refreshToken,
                accountId: accountId,
                user: user || self.state.user
            };
            cookie.save(UTILS.COOKIES_KEY.accessTokenKey, accessToken, cookiePath);
            cookie.save(UTILS.COOKIES_KEY.refreshTokenKey, refreshToken, cookiePath);
            UTILS.saveAccountIdCookie(self.state.accountId);
            if (user) {
                cookie.save(UTILS.COOKIES_KEY.userKey, user, cookiePath);
            }
        }
    },
    setAccountId: function(accountId) {
        var self = this,
            cookiePath = {
                path: UTILS.COOKIE_DEFAULT_PATH
            }
        ;
        self.state.accountId = accountId;
        UTILS.saveAccountIdCookie(accountId);
    },
    setMasqueradeAccountId: function(masqueradeAccountId) {
        var self = this,
            cookiePath = {
                path: UTILS.COOKIE_DEFAULT_PATH
            }
        ;
        self.state.masqueradeAccountId = masqueradeAccountId;
        cookie.save(UTILS.COOKIES_KEY.masqueradeAccountIdKey, masqueradeAccountId, {
            path: UTILS.COOKIE_DEFAULT_PATH
        });
    },
    getMasqueradeAccountId: function() {
        var self = this;
        return self.state.masqueradeAccountId;
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
        cookie.remove(UTILS.COOKIES_KEY.accessTokenKey, {path: UTILS.COOKIE_DEFAULT_PATH});
        cookie.remove(UTILS.COOKIES_KEY.refreshTokenKey, {path: UTILS.COOKIE_DEFAULT_PATH});
        cookie.remove(UTILS.COOKIES_KEY.accountIdKey, {path: UTILS.COOKIE_DEFAULT_PATH});
        cookie.remove(UTILS.COOKIES_KEY.devAccountIdKey, {path: UTILS.COOKIE_DEFAULT_PATH});
        cookie.remove(UTILS.COOKIES_KEY.stageAccountIdKey, {path: UTILS.COOKIE_DEFAULT_PATH});
        cookie.remove(UTILS.COOKIES_KEY.prodAccountIdKey, {path: UTILS.COOKIE_DEFAULT_PATH});
        cookie.remove(UTILS.COOKIES_KEY.masqueradeAccountIdKey, {path: UTILS.COOKIE_DEFAULT_PATH});
        cookie.remove(UTILS.COOKIES_KEY.userKey, {path: UTILS.COOKIE_DEFAULT_PATH});
        this.state = {
            accessToken: undefined,
            refreshToken: undefined,
            accountId: undefined,
            masqueradeAccountId: undefined,
            user: undefined
        };
        return ret;
    },
    // Returns current state of the session
    active: function() {
        // NOTE: SESSION.active will determine whether there is an ACCOUNT active; not a USER active.
        // A "demo" account, for example, will have an account, but no user.
        // Use the SESSION.user() Promise to check for a signed-in user
        return !!this.state.accessToken;
    },
    // Returns if there is an active session with a user (has an email account)
    isUser: function() {
        return (cookie.load(UTILS.COOKIES_KEY.userKey) ? true : false);
    },
    // Getter/Setter for user data for the session (NOT for updating the user object in the DB)
    user: function(userData) {
        var self = this;
        return new Promise(function (resolve, reject) {
            if (userData) {
                self.state.user = userData;
                cookie.save(UTILS.COOKIES_KEY.userKey, userData, UTILS.COOKIE_DEFAULT_PATH);
            }
            else if (self.state.user) {
                userData = self.state.user;
            }
            else {
                try {
                    userData = cookie.load(UTILS.COOKIES_KEY.userKey);
                }
                catch (e) {
                    // TODO: Get user from API based on session
                    return reject(e);
                }
            }
            if (userData && (userData.first_name || userData.username)) {
                userData.displayName = userData.first_name || userData.username;
            } else if (!userData) {
                reject();
            }
            resolve(userData);
        });
    },
    // Getter/setter on whether to store items during login or not
    rememberMe: function(bool) {
        if (bool !== undefined) {
            if (bool) {
                cookie.save(UTILS.COOKIES_KEY.rememberMeKey, (!!bool ? 1 : 0), {
                    path: UTILS.COOKIE_DEFAULT_PATH,
                    maxAge: COOKIE_MAX_AGE
                });
            }
            else {
                cookie.remove(UTILS.COOKIES_KEY.rememberMeKey, {path: UTILS.COOKIE_DEFAULT_PATH});
                cookie.remove(UTILS.COOKIES_KEY.rememberedEmailKey, {path: UTILS.COOKIE_DEFAULT_PATH});
            }
        }
        else {
            bool = cookie.load(UTILS.COOKIES_KEY.rememberMeKey) ? true : false;
        }
        return !!bool;
    },
    // Getter/setter for email stored during login
    rememberedEmail: function(email) {
        if (email) {
            cookie.save(UTILS.COOKIES_KEY.rememberedEmailKey, email, {
                path: UTILS.COOKIE_DEFAULT_PATH,
                maxAge: COOKIE_MAX_AGE
            });
        }
        else {
            email = cookie.load(UTILS.COOKIES_KEY.rememberedEmailKey);
        }
        return email;
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Session;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
