import AJAXModule from '../modules/ajax';

const AjaxMixin = {
    apiCalls: [],
    batches: [],
    GET(url = '', options = {}) {
        const ret = AJAXModule.doGet(url, options);
        this.apiCalls.push(ret);
        return ret.promise;
    },
    POST(url = '', options = {}) {
        const ret = AJAXModule.doPost(url, options);
        this.apiCalls.push(ret);
        return ret.promise;
    },
    PUT(url = '', options = {}) {
        const ret = AJAXModule.doPut(url, options);
        this.apiCalls.push(ret);
        return ret.promise;
    },
    API(url = '', options = {}) {
        const ret = AJAXModule.doApiCall(url, options);
        this.apiCalls.push(ret);
        return ret.promise;
    },
    cancelApiCall(target) {
        this.apiCalls.map(function(apiCall) {
            if (target === apiCall.promise) {
                apiCall.cancel();
                return true;
            }
        });
        return false;
    },
    cancelAll() {
        this.apiCalls.map(apiCall => apiCall.cancel());
        this.batches = [];
    },

    componentWillUnmount() {
        this.cancelAll();
    },

    sendBatch(options) {
        options = options || {};
        const ret = AJAXModule.sendBatch(this.batches, options);
        // Clear the queue.
        this.batches = [];
        // Make cancel possible on unmount.
        this.apiCalls.push(ret);
        return ret.promise;
    },
    batch: function(method, path, data) {
        data = data || {};
        this.batches.push({method, path, data});
        return this.batches.length;
    },
    get(url = '', options = {}) {
        return this.GET(url, options);
    },
    put(url = '', options = {}) {
        return this.PUT(url, options);
    },
    post(url = '', options = {}) {
        return this.POST(url, options);
    },
};

export default AjaxMixin;
