// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import AJAXModule from '../modules/ajax';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var AjaxMixin = {
    apiCalls: [],
    GET: function (url, options) {
        var ret = AJAXModule.doGet(url, options);
        this.apiCalls.push(ret);
        return ret;
    },
    POST: function (url, options) {
        var ret = AJAXModule.doPost(url, options);
        this.apiCalls.push(ret);
        return ret;
    },
    PUT: function (url, options) {
        var ret = AJAXModule.doPut(url, options);
        this.apiCalls.push(ret);
        return ret;
    },
    API: function (url, options) {
        var ret = AJAXModule.doApiCall(url, options);
        this.apiCalls.push(ret);
        return ret;
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
