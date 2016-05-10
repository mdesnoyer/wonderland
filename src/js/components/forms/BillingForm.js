import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import AjaxMixin from '../../mixins/ajax';
import SESSION from '../../modules/session';
import Message from '../wonderland/Message';
import T from '../../modules/translation';
import E from '../../modules/errors';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var BillingForm = React.createClass({
    mixins: [AjaxMixin], // ReactDebugMixin
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {
            isError: false,
            isLoading: true,
            nameOnCard: '',
            planType: 'demo',
            account: false
        }
    },
    componentWillUnmount: function() {
        E.clearErrors();
    },
    componentWillMount: function () {
        var self = this;
        self.GET('billing/account')
            .then(function (res) {
                if (res.status >= 200 && res.status < 300) {
                    self.setState({
                        isLoading: false,
                        account: account,
                        planType: 'demo',
                        nameOnCard: ''
                    });
                } else {
                    // On error (no account), default the nameOnCard to the current user's name
                    SESSION.user()
                        .then(function (user) {
                            self.setState({
                                isLoading: false,
                                nameOnCard: user.first_name + ' ' + user.last_name
                            });
                        })
                        .catch(function (err) {
                            // no-op
                        });
                }
            })
            .catch(function (err) {
                E.checkForError(err, false);
                self.setState({
                    isLoading: false,
                    isError: true
                });
            });
    },
    componentDidMount: function() {
        var self = this,
            s = document.createElement('script');
        ;
        self._isSubmitted = false;

        s.setAttribute('src', 'https://js.stripe.com/v2/');
        document.body.appendChild(s);
    },
    handleChangePlanType(e) {
        var self = this;
        self.setState({
            planType: e.target.value
        });
    },
    render: function() {
        var self = this,
            buttonClassName,
            inputClassName,
            selectClassName,
            ccClassName = '',
            messageNeeded = self.state.isError === true ? <Message header={T.get('copy.billing.title') + ' ' + T.get('error')} body={E.getErrors()} flavour="danger" /> : ''
        ;
        if (self.state.isLoading) {
            buttonClassName = 'button is-primary is-medium is-disabled is-loading';
            inputClassName = 'input is-medium is-disabled';
            selectClassName = 'select is-disabled';
        }
        else {
            buttonClassName = 'button is-medium is-primary';
            inputClassName = 'input is-medium';
            selectClassName = 'select';
        }
        if (self.state.planType === 'demo') {
            ccClassName = 'is-hidden';
        }
        return (
            <form id="billingForm" onSubmit={self.handleSubmit}>
                {messageNeeded}
                <fieldset>
                    <legend className="title is-4">{T.get('copy.billing.heading')}</legend>
                    
                    <label htmlFor="planType">{T.get('copy.billing.form.planType')}</label>
                    <p className="control is-grouped">
                        <span className={selectClassName + ' is-fullwidth'}>
                            <select
                                ref="planType"
                                id="planType"
                                defaultValue={self.state.planType}
                                onChange={self.handleChangePlanType}
                            >
                                <option value="demo">Demo</option>
                                <option value="pro_monthly">Pro - Monthly</option>
                                <option value="pro_yearly">Pro - Yearly</option>
                            </select>
                        </span>
                    </p>
                    {(() => {
                        if (self.state.planType !== 'demo') {
                            return (
                                <div className="control">
                                    <hr />

                                    <label htmlFor="address_line1">{T.get('copy.billing.form.billingAddress')}</label>
                                    <p className="control is-grouped">
                                        <input className={inputClassName} type="text" required ref="address_line1" data-stripe="address_line1" placeholder={T.get('copy.billing.form.address')} />
                                    </p>
                                    <p className="control is-grouped">
                                        <input className={inputClassName} type="text" ref="address_line2" data-stripe="address_line2" placeholder={T.get('copy.billing.form.address')} />
                                    </p>
                                    <p className="control is-grouped">
                                        <input className={inputClassName} type="text" required ref="address_city" data-stripe="address_city" placeholder={T.get('copy.billing.form.city')} />
                                        <input className={inputClassName} type="text" required ref="address_state" data-stripe="address_state" placeholder={T.get('copy.billing.form.state')} />
                                        <input className={inputClassName} type="text" required ref="address_zip" data-stripe="address_zip" placeholder={T.get('copy.billing.form.zip')} />
                                    </p>

                                    <hr />

                                    <label htmlFor="nameOnCard">{T.get('copy.billing.form.nameOnCard')}</label>
                                    <p className="control is-grouped">
                                        <input className={inputClassName} type="text" required ref="name" data-stripe="name" defaultValue={self.state.nameOnCard} placeholder={T.get('copy.billing.form.nameOnCard')} />
                                    </p>

                                    <label htmlFor="cc_number">{T.get('copy.billing.form.ccNumber')}</label>
                                    <p className="control is-grouped">
                                        <input className={inputClassName} type="text" required ref="number" data-stripe="number" placeholder={T.get('copy.billing.form.ccNumber')} />
                                    </p>

                                    <label htmlFor="cc_exp_month">{T.get('copy.billing.form.ccExpiration')}</label>
                                    <p className="control is-grouped">
                                        <span className={selectClassName}>
                                            <select ref="exp_month" data-stripe="exp_month">
                                                <option value="01">01</option>
                                                <option value="02">02</option>
                                                <option value="03">03</option>
                                                <option value="04">04</option>
                                                <option value="05">05</option>
                                                <option value="06">06</option>
                                                <option value="07">07</option>
                                                <option value="08">08</option>
                                                <option value="09">09</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                            </select>
                                        </span>
                                        <span className={selectClassName}>
                                            <select className={selectClassName} ref="exp_year" data-stripe="exp_year">
                                                <option value="2016">16</option>
                                                <option value="2018">18</option>
                                                <option value="2019">19</option>
                                                <option value="2020">20</option>
                                                <option value="2021">21</option>
                                                <option value="2022">22</option>
                                                <option value="2023">23</option>
                                                <option value="2024">24</option>
                                                <option value="2025">25</option>
                                                <option value="2026">26</option>
                                            </select>
                                        </span>
                                    </p>

                                    <label htmlFor="cc_cvc">{T.get('copy.billing.form.ccCVC')}</label>
                                    <p className="control is-grouped">
                                        <input className={inputClassName} type="text" ref="cvc" data-stripe="cvc" placeholder={T.get('copy.billing.form.ccCVC')} />
                                    </p>
                                </div>
                            );
                        }
                    })()}
                    <p className="has-text-centered">
                        <button className={buttonClassName} type="submit">{T.get('save')}</button>
                    </p>
                </fieldset>
            </form>
        );
    },
    handleSubmit: function (e) {
        var self = this
        ;
        e.preventDefault();
        if (!self._isSubmitted) {
            self._isSubmitted = true;
            E.clearErrors();
            self.setState({
                isLoading: true
            }, function () {
                if (self.state.planType === 'demo') {
                    self.handleStripeResponse();
                } else {
                    try {
                        window.Stripe.setPublishableKey(CONFIG.STRIPE_KEY);
                        window.Stripe.card.createToken(
                            document.getElementById('billingForm'),
                            self.handleStripeResponse
                        );
                    } catch (e) {
                        E.checkForError(T.get('error.unknown'), false);
                        self._isSubmitted = false;
                        self.setState({
                            isError: true
                        });
                    }
                }
            });
        }
    },
    handleStripeResponse: function (status, data) {
        var self = this,
            apiCall
        ;
        if (data && data.error) {
            E.checkForError(data.error.message, false);
            self.setState({
                isError: true
            });
        } else {
            if (self.state.planType === 'demo') {
                if (self.state.account) {
                    apiCall = self.POST('billing/subscription', {
                        data: {
                            plan_type: self.state.planType
                        }
                    });
                } else {
                    // no-op
                    apiCall = new Promise(function (resolve) {
                        resolve();
                    });
                }
            } else {
                // API calls have to be chainedv when planType != "demo"
                apiCall = self.POST('billing/account', {
                    data: {
                        billing_token_ref: data.id
                    }
                })
                    .then(function () {
                        return self.POST('billing/subscription', {
                            data: {
                                plan_type: self.state.planType
                            }
                        });
                    });
            }
            apiCall
                .then(function () {
                    self.setState({
                        isLoading: false,
                        isError: false
                    }, function () {
                        self._isSubmitted = false;
                    }); 
                })
                .catch(function (err) {
                    E.checkForError(err, false);
                    self.setState({
                        isLoading: false,
                        isError: true
                    }, function () {
                        self._isSubmitted = false;
                    });
                });
        }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default BillingForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
