
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import TRACKING from '../../tracking';
import Message from './message';
import T from '../../translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var SignUpForm = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
      return {
        password: '',
        confirm: '', 
        errorMessageArray: [],
        isError: false
      }  
    },
    render: function() {
        var MessageNeeded = this.state.isError === true ? <Message header="Sign Up Error" body={this.state.errorMessageArray} flavour="danger" />  : ''; 
        return (
            <section className="section columns">
                <div className="column is-half is-offset-quarter">
                    {MessageNeeded}    
                    <form onSubmit={ this.handleSubmit }>
                        <fieldset>  
                            <legend className="title is-2">Sign Up</legend>
                            <p className="control is-grouped">
                                <input className="input" type="text" ref="firstName" placeholder={T.get('firstName')} />
                                <input className="input" type="text" ref="lastName" placeholder={T.get('lassssstName')} />
                            </p>
                            <p className="control is-grouped">
                                <input className="input" type="email" required ref="email" placeholder="Email" />
                            </p>
                            <p className="control is-grouped">
                                <input
                                    className="input" 
                                    type="password" 
                                    required
                                    ref="passwordInitial"
                                    placeholder="Password"
                                    onChange={this.handlePasswordInitialChange} 
                                />
                                <input 
                                    className="input" 
                                    type="password" 
                                    required
                                    ref="passwordConfirm" 
                                    placeholder="Confirm"
                                    onChange={this.handlePasswordConfirmChange}
                                />
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
    handlePasswordInitialChange: function (event) {
        this.setState({ password: event.target.value })    
    },
    handlePasswordConfirmChange: function (event) {
        this.setState({confirm: event.target.value})  
    },
    validatePassword: function () {
        // at least one number, one lowercase and one uppercase letter
        // at least six characters
        var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        return re.test(this.state.password);
    },
    validateConfirm: function () {
        return this.state.password === this.state.confirm
    },
    handleError: function (errorMessage, check) {
        if (this.state.errorMessageArray.indexOf(errorMessage) === -1 &&  check === false){
            this.state.errorMessageArray.push(errorMessage)
        } else if (check === true) { 
            for (var i = 0; i < this.state.errorMessageArray.length; i++) {
                if (this.state.errorMessageArray[i] === errorMessage){
                    this.state.errorMessageArray.splice(i, 1) 
                }
            }
        }
    },
    handleAllErrorCheck: function () {
        this.handleError("Passwords must be 6 Characters and include one number, one lowercase and one uppercase letter.", this.validatePassword())
        this.handleError("Password does not match the confirm password.", this.validateConfirm()) 
    },
    handleSubmit: function (e) {          
        var self = this;
        self.handleAllErrorCheck()
        self.setState({isSubmited: true})
        var canProcceed = self.validatePassword(self.state.password) && self.validateConfirm();
        if (canProcceed === false) {
            self.setState({isError: true})
            e.preventDefault();    
        }
        else {
        var userDataObject = {
            firstName: this.refs.firstName.value.trim(),
            lastName: this.refs.lastName.value.trim(),
            email: this.refs.email.value.trim(),
            passwordInitial: this.refs.passwordInitial.value.trim(),
            passwordConfirm: this.refs.passwordConfirm.value.trim(),
            company: this.refs.company.value.trim(),
            title: this.refs.title.value.trim()
            }
            TRACKING.sendEvent(this, arguments, userDataObject.email);
            // TODO submit data to create user account 
            self.context.router.push('/upload/video/');
        }        
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default SignUpForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
