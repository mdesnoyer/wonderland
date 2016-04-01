// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import Message from '../wonderland/message';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
var ForgotPasswordForm = React.createClass({
    getInitialState: function() {
    	return {
    		isEmailMessageSent: false
    	}
    },
    handleSubmit: function(e) { 
    	e.preventDefault();
    	this.setState({isEmailMessageSent: true})
    	console.log(this.state.isEmailMessageSent)
    },
	render: function() {
		var resetConfirm = <Message body="Please Check your Email for Reset Instrcutions" />
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
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default ForgotPasswordForm 

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
