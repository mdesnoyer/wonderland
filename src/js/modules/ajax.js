// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import _ from 'lodash';
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

    // Let doApiCall options be merged onto these baseOptions.
    baseOptions: {},

    doApiCall: function(url, options) {
        var self = this,
            promise,
            ret
        ;
        function fin(resolve, reject) {
            var _url = url,
                _options = options ? JSON.parse(JSON.stringify(options)) : {};
            _options.data = _options.data ? JSON.parse(JSON.stringify(_options.data)) : {};
            if(url !== 'batch') {
                _options = _.merge({}, self.baseOptions, _options);
            }
            if (!_options.no_authorization_header) {
                if (_options.host !== CONFIG.AUTH_HOST && self.Session.state.accessToken) {
                    _options.headers = _options.headers || {};
                    _options.headers.Authorization = 'Bearer ' + self.Session.state.accessToken;
                }
            }
            if (_options.method === 'GET') {
                _url = url + (url.indexOf('?') > -1 ? '&' : '?' ) + self.getQueryParam(_options.data);
                delete _options.data;
            }
            else {
                _options.data = _options.contentType ? options.data : JSON.stringify(_options.data);
                _options.type = 'json';
                _options.contentType =  _options.contentType ? _options.contentType : 'application/json';
            }

            var accountIdToUse = (_options.overrideAccountId ? _options.overrideAccountId : self.Session.state.accountId);
            _options.url = _options.host + (!_options.noAccountId && _options.host === CONFIG.API_HOST ? accountIdToUse + '/' : '') + _url;
            _options.shouldRetry = (_options.shouldRetry !== false);  // default to true
            reqwest(_options)
                .then(function (res) {
                    if (ret.isCanceled !== true) {
                        //console.log(url, res);
                        options.successHandler ? resolve(options.successHandler(res)) : resolve(res);
                    }
                })
                .catch(function (err) {
                    var retryUrl = '';
                    if (_options.shouldRetry === true && _options.host !== CONFIG.AUTH_HOST && err.status === 401 && self.Session.state.refreshToken) {
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
                                self.Session.forceSet(res.access_token, res.refresh_token, res.account_ids[0]);
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
            fin.call(self, resolve, reject);
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
    },
    // Given a list of {method, path, data} build the batch request and return
    // a promise for sending it.
    sendBatch: function(batch, options) {
        return this.doPost('batch', AJAXModule._buildBatchOptions(batch, options));
    },
    // Translates a nested batch of requests to the format expected by doApiCall.
    _buildBatchOptions: function(batch, options) {

        const self = this;

        // Get the relative url string with query params for a given request.
        // Example, given a GET on /tags/ with param tag_id=a1b2 on account_id=c3d4:
        //   returns: /api/v2/c3d4/tags/?tag_id=a1b2
        // Example, given a POST on /thumbnails/ with params tag_id=a1b2,
        // url=https://dl.dropboxusercontent.com/1/view/2y1xbcf42urgy3r/neon.jpg
        // on account_id=c3d4:
        //   returns: /api/v2/c3d4/thumbnails/
        const _getRelativeUrl = function(request) {

            const accountId = self.baseOptions.overrideAccountId?
                self.baseOptions.overrideAccountId:
                SESSION.state.accountId;

            // The fixed base of every account-based request url.
            const base = '/api/v2/' + accountId + '/' + request.path;

            if(request.method === 'GET') {
                return base + '?' + self.getQueryParam(_.merge(request.data, self.baseOptions.data));
            }
            return base;
        };

        // Get the body object for a given request.
        const _getBody = function(request) {
            if(request.method === 'GET') {
                return {};
            }
            return _.merge(request.data, self.baseOptions.data);
        };

        return _.merge(
            {
                // Batch itself is not routed to an account id url.
                noAccountId: true,

                // Reduce the batch response to one response.
                successHandler: batches => {
                    return batches.results.reduce((ret, item) => {
                        for (let key in item.response) {
                            let resp = item.response;
                            if (resp[key].constructor === Array) {
                                ret[key] = ret[key]?
                                           ret[key].concat(resp[key]):
                                           resp[key];
                            } else if (typeof(resp[key]) == 'number') {
                                ret[key] = ret[key]?
                                           ret[key] + resp[key]:
                                           resp[key];
                            } else {
                                console.warn('Batch: value for key dropped: ', key);
                            }
                        }
                        return ret;
                    }, {});
                },

                data: {
                    // Each element of call_info's list has
                    // method, relative_url and body.
                    call_info: {
                        access_token: SESSION.state.accessToken,
                        refresh_token: SESSION.state.refreshToken,
                        requests: batch.map(function (item) {
                            return {
                                method: item.method,
                                relative_url: _getRelativeUrl(item),
                                body: _getBody(item)
                            };
                        })
                    }
                }
            },
            options
        );
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default AJAXModule;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
