const CONFIG = require('../../../env/config.json');

var ReactGA = require('react-ga');
ReactGA.initialize(CONFIG.GOOGLE_ANALYTICS_ID, {
    gaOptions: {
        cookieDomain: 'auto'
}});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

let TRACKING = {
    sendEvent: function(component, eventArguments, eventLabel) {
        var eventArguments = eventArguments,
            eventActionString = this.sliceArgumentArray(eventArguments)
        ;
        ReactGA.event({
            category: component.constructor.displayName,
            action: eventActionString,
            label: String(eventLabel),
            transport: 'beacon'});
    },
    findSynthEventIndex: function(eventArray, eventArguments) {
        var funcName;
        for (var i = 0; i < eventArray.length; i++) {
            if (eventArray[i].hasOwnProperty('_dispatchListeners')) {
                funcName = this.returnFunctionName(i, eventArguments);
                break;
            }
        }
        return funcName || 'Unknown';
    },
    sliceArgumentArray: function(eventArguments) {
        var eventArray = Array.prototype.slice.call(eventArguments);
        return this.findSynthEventIndex(eventArray, eventArguments);
    },
    returnFunctionName: function(index, eventArgument) {
        var functionName = eventArgument[index]._dispatchListeners.name.replace(/bound/i,'').trim();
        return functionName;
    },
    logPageView: function() {
        ReactGA.set({ page: window.location.pathname });
        ReactGA.pageview(window.location.pathname);
    },
    logException: function(e, fatal=false) {
        ReactGA.exception({
            description: e,
            fatal: fatal
        });
    },
    logModalOpen: function(modal_name) {
        ReactGA.modalview(modal_name);
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default TRACKING; 

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

