// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import AJAXModule from '../modules/ajax';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var AjaxMixin = {
    apiCalls: [],
    GET: function (url, options) {
        var ret = AJAXModule.doGet(url, options);
        this.apiCalls.push(ret);
        return ret.promise;
    },
    POST: function (url, options) {
        var ret = AJAXModule.doPost(url, options);
        this.apiCalls.push(ret);
        return ret.promise;
    },
    PUT: function (url, options) {
        var ret = AJAXModule.doPut(url, options);
        this.apiCalls.push(ret);
        return ret.promise;
    },
    API: function (url, options) {
        var ret = AJAXModule.doApiCall(url, options);
        this.apiCalls.push(ret);
        return ret.promise;
    },
    cancelApiCall: function (target) {
        this.apiCalls.map(function (apiCall) {
            if (target === apiCall.promise) {
                apiCall.cancel();
            }
        });
    },
    componentWillUnmount: function () {
        this.apiCalls.map(function (apiCall) {
            apiCall.cancel();
        });
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default AjaxMixin;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
