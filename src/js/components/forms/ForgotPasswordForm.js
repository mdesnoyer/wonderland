// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import {Link} from 'react-router';
import Message from '../wonderland/message';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
var ForgotPasswordForm = React.createClass({
    getInitialState: function() {
    	return {
    		isEmailMessageSent: false,
    		isError: false
    	}
    },
    handleSubmit: function(e) { 
    	e.preventDefault();
    	this.setState({isEmailMessageSent: true})
    },
	render: function() {
		var MessageNeeded = this.state.isEmailMessageSent === true ? <Message body="Please Check your Email for Reset Instrcutions" />  : '';
		if (this.state.isEmailMessageSent) {
            return (
                    <Message header="Please Check your Email for Reset Instrcutions" body={<Link activeClassName="active" to="/signin/">Return to Sign In</Link>} />
                )
        }
        else {
            return (
                <form onSubmit={ this.handleSubmit }>
                    <fieldset>  
                        <legend className="title is-2">Password Reset</legend>
                        <p className="control">
                            <input className="input" type="text" ref="email" placeholder="email" />
                        </p>
                        <p className="is-text-centered">
                            <button className="button is-primary" type="submit">Send Reset Instrcutions</button>
                        </p>
                    </fieldset>
                </form>
            )
        }
	}
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default ForgotPasswordForm 

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
