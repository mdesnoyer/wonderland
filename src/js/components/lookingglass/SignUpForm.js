
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
import React from 'react';
import TRACKING from '../../tracking';
import T from '../../translation';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var SignUpForm = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	render: function() {
		T.translatorCheck();
		return (
			<section className="section columns">
				<div className="column is-third is-offset-4">
					<form onSubmit={ this.handleSubmit }>
						<fieldset>	
						    <legend className="title is-2">Sign Up</legend>
						        <p className="control is-grouped">
						    		<input className="input" type="text" ref="firstName" placeholder={ T.form("First Name") } />
						    		<input className="input" type="text" ref="lastName" placeholder={T.form("Last Name")} />
						    	</p>
						    	<p className="control">
						    		<input className="input" type="email" ref="email" placeholder={T.form("Email")} />
						    	</p>
						    	<p className="control is-grouped">
						    		<input className="input" type="password" ref="passwordInitial" placeholder={T.form("Passowrd")} />
						    		<input className="input" type="password" ref="passwordConfirm" placeholder={T.form("confirm")} />
						    	</p>
						    	<p className="control">
						    		<input className="input" type="text" ref="company" placeholder={T.form("Company")} />
						    	</p>
						    	<p className="control">
						    		<input className="input" type="text" ref="title" placeholder={T.form("Title")}/>
						    	</p>
						    	<p className="is-text-centered">
						    		<button className="button is-primary" type="submit">{T.form("Sign Up")}</button>
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
			firstName: this.refs.firstName.value.trim(),
			lastName: this.refs.lastName.value.trim(),
			email: this.refs.email.value.trim(),
			passwordInitial: this.refs.passwordInitial.value.trim(),
			passwordConfirm: this.refs.passwordConfirm.value.trim(),
			company: this.refs.company.value.trim(),
			title: this.refs.title.value.trim()
		}
		TRACKING.sendEvent(this, arguments, userDataObject.email)
		self.context.router.push('/upload/video/');
		// TODO submit data to create user account 
	}
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default SignUpForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
						 //    <p className="control is-grouped">
							// 	<input className="input" type="text" ref="firstName" placeholder={TRANSLATOR.firstName[TRANSLATOR.lang]} />
							// 	<input className="input" type="text" ref="lastName" placeholder={TRANSLATOR.lastName[TRANSLATOR.lang]} />
							// </p>
							// <p className="control">
							// 	<input className="input" type="email" ref="email" placeholder={TRANSLATOR.email[TRANSLATOR.lang]} />
							// </p>
							// <p className="control is-grouped">
							// 	<input className="input" type="password" ref="passwordInitial" placeholder={TRANSLATOR.password[TRANSLATOR.lang]} />
							// 	<input className="input" type="password" ref="passwordConfirm" placeholder={TRANSLATOR.confirm[TRANSLATOR.lang]} />
							// </p>
							// <p className="control">
							// 	<input className="input" type="text" ref="company" placeholder={TRANSLATOR.company[TRANSLATOR.lang]} />
							// </p>
							// <p className="control">
							// 	<input className="input" type="text" ref="title" placeholder={TRANSLATOR.title[TRANSLATOR.lang]}/>
							// </p>
							// <p className="is-text-centered">
							// 	<button className="button is-primary" type="submit">{TRANSLATOR.signUp[TRANSLATOR.lang]}</button>
							// </p>