// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import AJAXCore from '../modules/ajax';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var AJAX = {
    apiCalls: [],
    GET: function (url, options) {
        var ret = AJAXCore.doGet(url, options);
        this.apiCalls.push(ret);
        return ret;
    },
    POST: function (url, options) {
        var ret = AJAXCore.doPost(url, options);
        this.apiCalls.push(ret);
        return ret;
    },
    PUT: function (url, options) {
        var ret = AJAXCore.doPut(url, options);
        this.apiCalls.push(ret);
        return ret;
    },
    API: function (url, options) {
        var ret = AJAXCore.doApiCall(url, options);
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

export default AJAX;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
