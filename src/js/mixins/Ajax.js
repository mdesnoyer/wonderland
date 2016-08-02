// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import AJAXModule from '../modules/ajax';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var AjaxMixin = {
    apiCalls: [],
    GET: (url, options) => {
        var ret = AJAXModule.doGet(url, options);
        this.apiCalls.push(ret);
        return ret.promise;
    },
    POST: (url, options) => {
        var ret = AJAXModule.doPost(url, options);
        this.apiCalls.push(ret);
        return ret.promise;
    },
    PUT: (url, options) => {
        var ret = AJAXModule.doPut(url, options);
        this.apiCalls.push(ret);
        return ret.promise;
    },
    API: (url, options) => {
        var ret = AJAXModule.doApiCall(url, options);
        this.apiCalls.push(ret);
        return ret.promise;
    },
    cancelApiCall: target => {
        this.apiCalls.map(apiCall => {
            if (target === apiCall.promise) {
                apiCall.cancel();
            }
        });
    },
    componentWillUnmount: () => {
        this.apiCalls.map(apiCall => {
            apiCall.cancel();
        });
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default AjaxMixin;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
