// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

let TRACKING = {
    sendEvent: function(eventCategory, eventAction, eventLabel) {
        ga('send','event', {
            eventCategory: eventCategory,
            eventAction: eventAction,
            eventLabel: eventLabel,
            transport: 'beacon'
        });
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default TRACKING; 

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

