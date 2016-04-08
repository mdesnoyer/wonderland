// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import reqwest from 'reqwest';
import SESSION from './session';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var AJAX = {
    Session: null,
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
            if (options.host !== CONFIG.AUTH_HOST) {
                options.data.token = self.Session.state.accessToken;
            }
            if (options.method === 'GET') {
                url = url + (url.indexOf('?') > -1 ? '&' : '?' ) + self.getQueryParam(options.data);
                delete options.data;
            }
            else {
                options.data = JSON.stringify(options.data);
                options.type = 'json';
                options.contentType = 'application/json';
            }
            options.url = options.host + (options.host === CONFIG.API_HOST ? self.Session.state.accountId + '/' : '') + url;
            reqwest(options)
                .then(function (res) {
                    resolve(res);
                })
                .catch(function (err) {
                    var retryUrl = '';
                    if (options.host !== CONFIG.AUTH_HOST && err.status === 401 && self.Session.state.refreshToken) {
                        retryUrl = CONFIG.AUTH_HOST + 'refresh_token?token=' + self.Session.state.refreshToken;
                        reqwest({
                            url: retryUrl,
                            method: 'POST',
                            crossDomain: true,
                            type: 'json'
                        })
                            .then(function (res) {
                                self.Session.set(res.access_token, res.refresh_token, res.account_ids[0]);
                                fin(resolve, reject);
                            })
                            .catch(function (err) {
                                self.Session.end();
                                reject(err);
                            });
                    } else {
                        self.Session.end();
                        reject(err);
                    }
                });
        }

        self.Session = self.Session || SESSION;

        return new Promise(function (resolve, reject) {
            var authUrl = '',
                err;
            if (self.Session.active() === true || options.host === CONFIG.AUTH_HOST) {
                fin(resolve, reject);
            } else {
                err = new Error('Unauthorized');
                err.status = 401;
                reject(err);
            }
        });
    },
    doGet: function(url, options) {
        options = options || {};
        options.host = options.host || CONFIG.API_HOST;
        options.method = options.method || 'GET';
        return this.doApiCall(url, options);
    },
    doPost: function(url, options) {
        options = options || {};
        options.host = options.host || CONFIG.API_HOST;
        options.method = options.method || 'POST';
        return this.doApiCall(url, options);
    },
    doPut: function(url, options) {
        options = options || {};
        options.host = options.host || CONFIG.API_HOST;
        options.method = options.method || 'PUT';
        return this.doApiCall(url, options);
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default AJAX;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 