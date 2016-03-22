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
                            <p className="control is-grouped">
                                <input className="input" type="text" ref="firstName" placeholder="First Name" />
                                <input className="input" type="text" ref="lastName" placeholder="Last Name" />
                            </p>
                            <p className="control">
                                <input className="input" type="email" ref="email" placeholder="Email" />
                            </p>
                            <p className="control is-grouped">
                                <input className="input" type="password" ref="passwordInitial" placeholder="Password" />
                                <input className="input" type="password" ref="passwordConfirm" placeholder="Confirm" />
                            </p>
                            <p className="control">
                                <input className="input" type="text" ref="company" placeholder="Company" />
                            </p>
                            <p className="control">
                                <input className="input" type="text" ref="title" placeholder="Title" />
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
