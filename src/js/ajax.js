// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import cookie from 'react-cookie';
import 'babel-polyfill';
import reqwest from 'reqwest';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

const USERNAME ='wonderland_demo',
    PASSWORD ='ad9f8g4n3ibna9df',
    ACCOUNT_ID = 'uhet29evso83qb7ys70hvj3z',
    AUTH_HOST = 'https://auth.neon-lab.com/api/v2/',
    API_HOST = 'http://services.neon-lab.com/api/v2/';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

const accessTokenKey = 'at',
    refreshTokenKey = 'rt',
    accountIdKey ='actId';

var AJAX = {
    state: {
        accessToken: cookie.load(accessTokenKey),
        refreshToken: cookie.load(refreshTokenKey),
        accountId: cookie.load(accountIdKey)
    },
    setSession: function(accessToken, refreshToken, accountId) {
        this.state = {
            accessToken: accessToken,
            refreshToken: refreshToken,
            accountId: accountId
        };
        cookie.save(accessTokenKey, accessToken, { path: '/' });
        cookie.save(refreshTokenKey, refreshToken, { path: '/' });
        cookie.save(accountIdKey, accountId, { path: '/' });
    },
    clearSession: function() {
        cookie.remove(accessTokenKey, { path: '/' });
        cookie.remove(refreshTokenKey, { path: '/' });
        cookie.remove(accountIdKey, { path: '/' });
        this.state = {
            accessToken: undefined,
            refreshToken: undefined,
            accountId: undefined
        };
    },
    getQueryParam: function(json) {
        return Object.keys(json).map(function (key) {
            if (json[key] !== null && json[key] !== undefined) {
                if (Object.prototype.toString.call(json[key]) === '[object Array]') {
                return encodeURIComponent(key) + '=' + encodeURIComponent(json[key].join());
            } else if (Object.prototype.toString.call(json[key]) === '[object Object]') {
                return encodeURIComponent(key) + '=' + encodeURIComponent(JSON.stringify(json[key]));
            } else {
                return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
            }
        }
        }).join('&');
    },
    doApiCall: function(url, options) {
        var self = this;
        function fin(resolve, reject) {
            options.data = options.data || {};
            options.data.token = self.state.accessToken;
            if (options.method === 'GET') {
                url = url + (url.indexOf('?') > -1 ? '&' : '?' ) + self.getQueryParam(options.data);
                delete options.data;
            } else {
                options.data = JSON.stringify(options.data);
                options.type = 'json';
                options.contentType = 'application/json';
            }
            options.url = API_HOST + self.state.accountId + '/' + url;
            reqwest(options)
                .then(function (res) {
                    resolve(res);
                })
                .catch(function (err) {
                    var retryUrl = '';
                    if (err.status === 401 && self.state.refreshToken) {
                        retryUrl = AUTH_HOST + '?token=' + self.state.refreshToken;
                        reqwest({
                            url: retryUrl,
                            method: 'POST',
                            crossDomain: true,
                            type: 'json'
                        })
                            .then(function (res) {
                                self.setSession(res.access_token, res.refresh_token, ACCOUNT_ID || res.account_id);
                                fin(resolve, reject);
                            })
                            .catch(function (err) {
                                self.clearSession();
                                reject(err);
                            });
                    } else {
                        self.clearSession();
                        reject(err);
                    }
                });
        }

        return new Promise(function (resolve, reject) {
            var authUrl = '';
            if (self.state.accessToken) {
                fin(resolve, reject);
            } else {
                if (USERNAME && PASSWORD) {
                    authUrl = AUTH_HOST + 'authenticate?username=' + USERNAME + '&password=' + PASSWORD;
                    reqwest({
                        url: authUrl,
                        method: 'POST',
                        crossDomain: true,
                        type: 'json'
                    })
                        .then(function (res) {
                            self.setSession(res.access_token, res.refresh_token, ACCOUNT_ID || res.account_id);
                            fin(resolve, reject);
                        })
                        .catch(reject);
                } else {
                    reject(new Error('TODO: Trigger Sign In/Register'));
                }
            }
        });
    },
    doGet: function(url, options) {
        options = options || {};
        options.method = options.method || 'GET';
        return this.doApiCall(url, options);
    },
    doPost: function(url, options) {
        options = options || {};
        options.method = options.method || 'POST';
        return this.doApiCall(url, options);
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default AJAX;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 