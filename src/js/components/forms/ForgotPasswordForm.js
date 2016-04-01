// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import Message from '../wonderland/message';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
var ForgotPasswordForm = React.createClass({
	render: function() {
		return (
			<div>
			<Message body="We Appologize but that email is not in our System" />
			<legend className="title is-2">Password Reset</legend>
			<p className="control is-grouped">
			    <input className="input" type="text" ref="email" placeholder="email" />			    
			</p>
			<button className="button is-primary">Send Reset Instrcutions</button>
			</div>
		)
	}
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default ForgotPasswordForm 
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 