// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

let E = {
    _errorMessageArray: [],
    raiseError: function(errorMessage) {
        var self = this;
        self._errorMessageArray.push(errorMessage);
    },
    checkForError: function(errorMessage, check) {
        var messageIndex = (this._errorMessageArray.indexOf(errorMessage)),
            isFound = (messageIndex > -1),
            isError = !check
        ;
        if (isError && !isFound) {
            this._errorMessageArray.push(errorMessage);
        }
        if (!isError && isFound) {
            this._errorMessageArray.splice(messageIndex, 1);
        }
        return check;
    },
    checkForErrors: function(errorList) {
        var count = 0 
        for (var i = 0; i < errorList.length; i++) {
            if (this.checkForError(errorList[i].message, errorList[i].check)){
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
        return this._errorMessageArray;
    },
    getErrorsCount: function() {
        var self = this;
        return self._errorMessageArray.length;
    },
    clearErrors: function() {
        this._errorMessageArray.length = 0;
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default E

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
