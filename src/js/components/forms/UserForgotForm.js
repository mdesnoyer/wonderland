// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import Message from '../wonderland/Message';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import E from '../../modules/errors';
import AjaxMixin from '../../mixins/Ajax';
import Icon from '../core/Icon';
import SESSION from '../../modules/session';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var UserForgotForm = React.createClass({
    mixins: [AjaxMixin], // ReactDebugMixin
    propTypes: {
        showLegend: React.PropTypes.bool.isRequired
    },
    getDefaultProps: function() {
        return {
            showLegend: true
        }
    },
    getInitialState: function() {
        return {
            mode: 'quiet' // quiet|error|loading|success
        }
    },
    componentWillUnmount: function(e) {
        E.clearErrors();
    },
    handleSubmit: function(e) {
        var self = this;
        e.preventDefault();
        self.setState({
            mode: 'loading'
        }, function() {
            self.POST('users/forgot_password', {
                host: CONFIG.AUTH_HOST,
                data: {
                    username: self.refs.email.value.trim()
                }
            })
            .then(function(json) {
                self.setState({
                    mode: 'success'
                });
            })
            .catch(function(err) {
                switch (err.code) {
                    case 400:
                    case 404:
                        // We ignore the 404, we don't want to alert that the
                        // account doesn't exist
                        console.log(err);
                        self.setState({
                            mode: 'success'
                        });
                        break;
                    default:
                        console.log(err);
                        E.raiseError(err);
                        self.setState({
                            mode: 'error'
                        });
                        break;
                }
            });
        });
    },
    render: function() {
        var self = this,
            legendElement = self.props.showLegend ? <legend className="title is-4">{T.get('copy.userForgot.heading')}</legend> : false,
            messageNeededComponent = false
        ;
        switch(self.state.mode) {
            case 'quiet':
                break;
            case 'error':
                messageNeededComponent = <Message header={T.get('copy.userForgot.heading')} body={E.getErrors()} flavour="danger" />;
                break;
            case 'loading':
                break;
            case 'success':
                messageNeededComponent = <Message header={T.get('copy.userForgot.heading')} body={T.get('copy.userForgot.success')} flavour="success" />;
                break;
        }
        return (
            <div>
                {messageNeededComponent}
                <form onSubmit={self.handleSubmit} className={self.state.mode === 'success' ? 'is-hidden' : ''}>
                    <fieldset>
                        {legendElement}
                        <p className={'control is-' + self.state.mode}>
                            <input
                                className={'input is-medium' + (self.state.mode === 'loading' ? ' is-loading' : '')}
                                type="email"
                                ref="email"
                                required
                                minLength="6"
                                maxLength="1024"
                                placeholder={T.get('email')}
                                defaultValue={SESSION.rememberedEmail()}
                            />
                        </p>
                        <p className="has-text-centered">
                            <button
                                className={'button is-medium is-primary' + (self.state.mode === 'loading' ? ' is-loading' : '')}
                                type="submit"
                            >
                                <Icon type="envelope" />
                                {T.get('action.resetPassword')}
                            </button>
                        </p>
                    </fieldset>
                </form>
            </div>
        );
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default UserForgotForm

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
