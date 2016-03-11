// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
import React from 'react';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var SignUpForm = React.createClass({
	render: function() {
		return (
			<section className="column is-half is-offset-quarter">
				<div className="container">
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
		e.preventDefault();
		var userDataObject = {
			name: this.refs.name.value.trim(),
			email: this.refs.email.value.trim(),
			password: this.refs.password.value.trim(),
			title: this.refs.title.value.trim(),
			company: this.refs.company.value.trim()
		}
		
		this.props.history.pushState(null, '/upload/');
	}
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default SignUpForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
