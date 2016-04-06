// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import UTILS from './utils';
import T from './translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

let E = {
	errorMessageArray: [],
    // If an error is thrown then check will be false  
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
            && this.handleError(T.get('error.passwordMatchInvalid'), state.password === state.confirm);
	}
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default E

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
