// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import UTILS from './utils';
import T from './translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

let E = {
	errorMessageArray: [],
	handleError: function(errorMessage, check) {
		var msgIndex = this.errorMessageArray.indexOf(errorMessage);
        if (check === false && msgIndex === -1) {
            this.errorMessageArray.push(errorMessage);
        } else if (check === true && msgIndex > -1) {
            this.errorMessageArray.splice(msgIndex, 1);
        }
        return check;
	},
	handleAllErrorCheck: function(errorList) {
        var count = 0 
        for (var i = 0; i < errorList.length; i++) {
            if (this.handleError(errorList[i].message, errorList[i].check)){
                count +=1
            } 
        }
        if (count === errorList.length) {
            return true;
        }
        else {
            return false; 
        }
	},
    getErrors: function() {
        return this.errorMessageArray;
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default E

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
