// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import {Link} from 'react-router';
import Message from '../wonderland/Message';
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
    	this.setState({
            isEmailMessageSent: true
        });
    },
	render: function() {
		if (this.state.isEmailMessageSent) {
            return (
                    <Message header={T.get('reset.message')} body={<Link activeClassName="wonderland-active" to="/signin/">{T.get('returnSignIn')}</Link>} />
                );
        }
        else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend className="subtitle is-5">{T.get('copy.forgotPassword.heading')}</legend>
                        <p className="control">
                            <input className="input is-medium" type="email" ref="email" placeholder={T.get('email')} />
                        </p>
                        <p className="is-text-centered">
                            <button className="button is-medium is-primary" type="submit">{T.get('reset.sendReset')}</button>
                        </p>
                    </fieldset>
                </form>
            );
        }
	}
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default ForgotPasswordForm 

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
