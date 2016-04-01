// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

let TRACKING = {
    sendEvent: function(component, eventArguments, eventLabel) {
        var eventArguments = eventArguments,
            eventActionString = this.sliceArgumentArray(eventArguments)
        ;
        ga('send','event', {
            eventCategory: component.constructor.displayName,
            eventAction: eventActionString,
            eventLabel: eventLabel,
            transport: 'beacon'
        });
    },
    findSynthEventIndex: function(eventArray, eventArguments) {
        for (var i = 0; i < eventArray.length; i++) {
            if (eventArray[i].hasOwnProperty('_dispatchListeners')) {
                return this.returnFunctionName(i, eventArguments);
            }
            else {
                return 'Unknown';
            }
        }
    },
    sliceArgumentArray: function(eventArguments) {
        var eventArray = Array.prototype.slice.call(eventArguments);
        return this.findSynthEventIndex(eventArray, eventArguments);
    },
    returnFunctionName: function(index, eventArgument) {
        var functionName = eventArgument[index]._dispatchListeners.name.replace(/bound/i,'').trim();
        return functionName;
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default TRACKING; 

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

