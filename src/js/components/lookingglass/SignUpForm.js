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
        return (
            <section className="section columns">
                <div className="column is-half is-offset-quarter">
                    <form onSubmit={ this.handleSubmit }>
                        <fieldset>
                            <legend className="title is-2">Sign Up</legend>
                                <p className="control is-grouped">
                                    <input className="input" type="text" ref="firstName" placeholder={T.get('firstName')} />
                                    <input className="input" type="text" ref="lastName" placeholder= {T.get('lastName')} />
                                </p>
                                <p className="control">
                                    <input className="input" type="email" ref="email" placeholder={T.get('email')} />
                                </p>
                                <p className="control is-grouped">
                                    <input className="input" type="password" ref="passwordInitial" placeholder={T.get('password')} />
                                    <input className="input" type="password" ref="passwordConfirm" placeholder={T.get('confirm')} />
                                </p>
                                <p className="control">
                                    <input className="input" type="text" ref="company" placeholder={T.get('company')} />
                                </p>
                                <p className="control">
                                    <input className="input" type="text" ref="title" placeholder={T.get('title')}/>
                                </p>
                                <p className="is-text-centered">
                                    <button className="button is-primary" type="submit"> {T.get('signUp')} </button>
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
                         