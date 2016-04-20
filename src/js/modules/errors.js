// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import TRACKING from './tracking';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

let E = {
    errorMessageArray: [],
    checkForError: function(errorMessage, check, errorsLocation) {
        var messageIndex = (this.errorMessageArray.indexOf(errorMessage)),
            isFound = (messageIndex > -1 ),
            isError = !check
        ;
        if (isError && !isFound) {
            TRACKING.sendEvent(errorsLocation, 'Error', errorMessage);
            this.errorMessageArray.push(errorMessage);
        }
        if (!isError && isFound) {
            this.errorMessageArray.splice(messageIndex, 1);
        }
        return check;
    },
    checkForErrors: function(errorList, errorsLocation) {
        debugger 
        var count = 0 
        for (var i = 0; i < errorList.length; i++) {
            if (this.checkForError(errorList[i].message, errorList[i].check, errorsLocation)){
                count += 1;
            }
        }
        if (count === errorList.length) {
            this.clearErrors();
            return true;
        }
        else {
            return false;
        }
    },
    getErrors: function() {
        return this.errorMessageArray;
    },
    clearErrors: function() {
        this.errorMessageArray.length = 0;
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default E

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
