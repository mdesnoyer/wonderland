// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

let tracking = {
    sendEvent: function(component, eventArguments, eventLabel){
		var eventArguments = eventArguments
		var eventActionString = this.sliceArgumentArray(eventArguments)
			ga('send','event', {
				eventCategory: component.constructor.displayName,
				eventAction: eventActionString,
				eventLabel: eventLabel,
				transport: 'beacon'
			});
	},
	findSynthEventIndex: function(eventArray, eventArguments){
		var index = eventArray.findIndex(x => x.hasOwnProperty('_dispatchListeners'))
		console.log(index)
		if (index === -1){
			var returnUnknown = "Unknown"		
			return returnUnknown
		}else{
			return this.returnFunctionName(index,eventArguments)
		}
	},
	sliceArgumentArray: function(eventArguments){
		var eventArray = Array.prototype.slice.call(eventArguments);
		return this.findSynthEventIndex(eventArray,eventArguments)
	},
	returnFunctionName: function(index, eventArgument){
		var functionName = eventArgument[index]._dispatchListeners.name.replace(/bound/i,'').trim()
		return functionName
	}
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default tracking; 

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

