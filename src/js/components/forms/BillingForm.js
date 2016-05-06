import React from 'react';
import AJAX from '../../modules/ajax';
import SESSION from '../../modules/session';
import Message from '../wonderland/Message';
import T from '../../modules/translation';
import E from '../../modules/errors';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var BillingForm = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {
            isError: false,
            isLoading: false,
            nameOnCard: ''
        }
    },
    componentWillUnmount: function() {
        E.clearErrors();
    },
    componentWillMount: function () {
        var self = this;
        SESSION.user()
            .then(function (user) {
                self.setState({
                    nameOnCard: user.first_name + ' ' + user.last_name
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
    render: function() {
        var self = this,
            buttonClassName,
            inputClassName,
            selectClassName,
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
        return (
            <form id="billingForm" onSubmit={self.handleSubmit}>
                {messageNeeded}
                <fieldset>
                    <legend className="title is-4">{T.get('copy.billing.heading')}</legend>
                    
                    <label htmlFor="planType">{T.get('copy.billing.form.planType')}</label>
                    <p className="control is-grouped">
                        <span className={selectClassName + ' is-fullwidth'}>
                            <select ref="planType" id="planType">
                                <option value="demo">Demo</option>
                                <option value="pro">Pro</option>
                                <option value="enterprise">Enterprise</option>
                            </select>
                        </span>
                    </p>

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
                        <input className={inputClassName} type="text" required ref="name" data-stripe="name" value={self.state.nameOnCard} placeholder={T.get('copy.billing.form.nameOnCard')} />
                    </p>

                    <label htmlFor="cc_number">{T.get('copy.billing.form.ccNumber')}</label>
                    <p className="control is-grouped">
                        <input className={inputClassName} type="text" required ref="number" data-stripe="number" placeholder={T.get('copy.billing.form.ccNumber')} />
                    </p>

                    <label htmlFor="cc_exp_month">{T.get('copy.billing.form.ccExpiration')}</label>
                    <p className="control is-grouped">
                        <span className={selectClassName}>
                            <select required ref="exp_month" data-stripe="exp_month">
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
                            <select className={selectClassName} required ref="exp_year" data-stripe="exp_year">
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
                        <input className={inputClassName} type="text" required ref="cvc" data-stripe="cvc" placeholder={T.get('copy.billing.form.ccCVC')} />
                    </p>

                    <p className="has-text-centered">
                        <button className={buttonClassName} type="submit">{T.get('save')}</button>
                    </p>
                </fieldset>
            </form>
        );
    },
    handleSubmit: function (e) {
        var self = this;
        e.preventDefault();
        if (!self._isSubmitted) {
            self._isSubmitted = true;
            E.clearErrors();
            try {
                window.Stripe.setPublishableKey(CONFIG.STRIPE_KEY);
                window.Stripe.card.createToken(
                    document.getElementById('billingForm'),
                    self.handleStipeResponse
                );
            } catch (e) {
                E.checkForError(T.get('error.unknown'), false);
                self.setState({
                    isError: true
                });
            }
        }
    },
    handleStipeResponse: function (data) {
        if (data.error) {
            E.checkForError(data.error.message, false);
            self.setState({
                isError: true
            });
        } else {
            self.setState({
                isError: false
            });
            console.log({
                planType: self.refs.planType.value.trim(),
                stripeData: data
            });
        }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default BillingForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
