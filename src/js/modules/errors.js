// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

function getType(val) {
    if (val !== undefined) {
        if (val == null) {
            return '[object Null]';
        }
        var type = Object.prototype.toString.call(val);
        if (type == Object.prototype.toString.call(0) && isNaN(val)) {
            return '[object NaN]';
        }
        return type;
    } else {
        return '[object Undefined]';
    }
};

const TYPES = {
    er: getType(new Error()),
    ob: getType({})
};

let E = {
    _errorMessageArray: [],
    raiseError: function(err) {
        var self = this;
        switch (getType(err)) {
            case TYPES.er:
            case TYPES.ob:
                self.checkForError(err.message);
                break;
            default:
                self.checkForError(errorMessage);
        }
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
