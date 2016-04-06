// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import UTILS from './utils';
import T from './translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

let E = {
	errorMessageArray: [],
    // The check variable is to ensure that errors are only added if they are true in the current state 
    // Likewise it removes the error from the array if the error is no longer
	handleError: function(errorMessage, check) {
		var msgIndex = this.errorMessageArray.indexOf(errorMessage);
        if (check === false && msgIndex === -1) {
            this.errorMessageArray.push(errorMessage);
        } else if (check === true && msgIndex > -1) {
            this.errorMessageArray.splice(msgIndex, 1);
        }
        return check;
	},
	handleAllErrorCheck: function(state) {
        return this.handleError(T.get('error.passwordFormatInvalid'), UTILS.isValidPassword(state.password))
            && this.handleError(T.get('error.passwordMatchInvalid'), this.isPasswordConfirm(state));
	},
    getErrors: function() {
        return this.errorMessageArray
    },
    isPasswordConfirm: function(state) {
        return state.password === state.confirm
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default E

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
