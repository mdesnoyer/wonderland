// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import AJAXModule from '../modules/ajax';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var AjaxMixin = {
    apiCalls: [],
    __batch: [],
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
    cancelApiCall: function(target) {
        this.apiCalls.map(function(apiCall) {
            if (target === apiCall.promise) {
                apiCall.cancel();
            }
        });
    },
    cancelAll: function() {
        this.apiCalls.map(function(apiCall) {
            apiCall.cancel();
        });
        this.__batch = [];
    },

    componentWillUnmount: function() {
        this.cancelAll();
    },

    sendBatch: function(options) {
        options = options || {};
        const ret = AJAXModule.sendBatch(this.__batch, options);
        // Clear the queue.
        this.__batch = [];
        // Make cancel possible on unmount.
        this.apiCalls.push(ret);
        return ret.promise;
    },
    batch: function(method, path, data) {
        data = data || {};
        this.__batch.push({method, path, data});
        return this.__batch.length;
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default AjaxMixin;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
