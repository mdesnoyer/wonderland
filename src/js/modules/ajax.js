// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import reqwest from 'reqwest';
import SESSION from './session';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var AJAXModule = {
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
    handleApiError: function(err) {
        var ret;
        try {
            ret = JSON.parse(err.responseText).error;
            if (!ret.code) {
                ret.code = err.status || 500;
            }
        } catch (e) {
            ret = {
                message: err.responseText,
                code: err.status
            };
        }
        return ret;
    },
    doApiCall: function(url, options) {
        var self = this,
            promise,
            ret
        ;
        function fin(resolve, reject) {
            var _url = url,
                _options = options ? JSON.parse(JSON.stringify(options)) : {};
            _options.data = _options.data ? JSON.parse(JSON.stringify(_options.data)) : {};
            if (_options.host !== CONFIG.AUTH_HOST && self.Session.state.accessToken) {
                _options.headers = _options.headers || {};
                _options.headers.Authorization = 'Bearer ' + self.Session.state.accessToken;
            }
            if (_options.method === 'GET') {
                _url = url + (url.indexOf('?') > -1 ? '&' : '?' ) + self.getQueryParam(_options.data);
                delete _options.data;
            }
            else {
                _options.data = JSON.stringify(_options.data);
                _options.type = 'json';
                _options.contentType = 'application/json';
            }
            _options.url = _options.host + (_options.host === CONFIG.API_HOST ? self.Session.state.accountId + '/' : '') + _url;
            reqwest(_options)
                .then(function (res) {
                    if (ret.isCanceled !== true) {
                        options.successHandler ? resolve(options.successHandler(res)) : resolve(res);
                    }
                })
                .catch(function (err) {
                    var retryUrl = '';
                    if (_options.host !== CONFIG.AUTH_HOST && err.status === 401 && self.Session.state.refreshToken) {
                        retryUrl = CONFIG.AUTH_HOST + 'refresh_token';
                        reqwest({
                            url: retryUrl,
                            data: JSON.stringify({
                                token : self.Session.state.refreshToken
                            }),
                            contentType: 'application/json',
                            method: 'POST',
                            crossDomain: true,
                            type: 'json'
                        })
                            .then(function (res) {
                                self.Session.set(res.access_token, res.refresh_token, res.account_ids[0]);
                                if (ret.isCanceled !== true) {
                                    fin(resolve, reject);
                                }
                            })
                            .catch(function (err) {
                                self.Session.end();
                                if (ret.isCanceled !== true) {
                                    options.errorHandler ? reject(options.errorHandler(err)) : reject(err);
                                }
                            });
                    } else if (ret.isCanceled !== true) {
                        options.errorHandler ? reject(options.errorHandler(err)) : reject(err);
                    }
                });
        }

        self.Session = self.Session || SESSION;

        // Default error handler
        options.errorHandler = options.errorHandler || self.handleApiError;

        promise = new Promise(function (resolve, reject) {
            var authUrl = '',
                err;
            if (self.Session.active() === true || options.host === CONFIG.AUTH_HOST) {
                fin.call(self, resolve, reject);
            } else {
                // We're missing an account id, so simulate an "unauthorized" response from the server
                err = {
                    error: 'Unauthorized',
                    code: 401
                };
                options.errorHandler ? reject(options.errorHandler(err)) : reject(err);
            }
        });
        ret = {
            isCanceled: false,
            cancel: function() {
                this.isCanceled = true;
            },
            promise: promise
        };
        return ret;
    },
    doGet: function(url, options) {
        options = options || {};
        options.host = options.host || CONFIG.API_HOST;
        options.method = options.method || 'GET';
        // Default error handler
        options.errorHandler = options.errorHandler || this.handleApiError;
        return this.doApiCall(url, options);
    },
    doPost: function(url, options) {
        options = options || {};
        options.host = options.host || CONFIG.API_HOST;
        options.method = options.method || 'POST';
        // Default error handler
        options.errorHandler = options.errorHandler || this.handleApiError;
        return this.doApiCall(url, options);
    },
    doPut: function(url, options) {
        options = options || {};
        options.host = options.host || CONFIG.API_HOST;
        options.method = options.method || 'PUT';
        // Default error handler
        options.errorHandler = options.errorHandler || this.handleApiError;
        return this.doApiCall(url, options);
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default AJAXModule;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
