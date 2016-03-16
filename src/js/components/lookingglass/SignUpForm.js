// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
import React from 'react';
import TRACKING from '../../tracking';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var SignUpForm = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	render: function() {
		return (
			<section className="section columns">
				<div className="column is-half is-offset-quarter">
					<form onSubmit={ this.handleSubmit }>
						<fieldset>	
						    <legend className="title is-2">Sign Up</legend>
						    <p className="control">
								<input className="input" type="text" ref="name" placeholder="Name" />
							</p>
							<p className="control">
								<input className="input" type="email" ref="email" placeholder="Email" />
							</p>
							<p className="control">
								<input className="input" type="password" ref="password" placeholder="Password" />
							</p>
							<p className="control">
								<input className="input" type="text" ref="title" placeholder="Title" />
							</p>
							<p className="control">
								<input className="input" type="text" ref="company" placeholder="Company" />
							</p>
							<p className="is-text-centered">
								<button className="button is-primary" type="submit">Sign Up</button>
							</p>
						</fieldset>
					</form>
				</div>
			</section>
		);
	},
	handleSubmit: function (e) {	
		var self = this;
		e.preventDefault();
		var userDataObject = {
			name: this.refs.name.value.trim(),
			email: this.refs.email.value.trim(),
			password: this.refs.password.value.trim(),
			title: this.refs.title.value.trim(),
			company: this.refs.company.value.trim()
		}
		TRACKING.sendEvent(this, arguments, userDataObject.email)
		self.context.router.push('/upload/video/');
		// TODO submit data to create user account 
	}
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default SignUpForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
