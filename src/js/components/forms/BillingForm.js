import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import AjaxMixin from '../../mixins/Ajax';
import SESSION from '../../modules/session';
import Message from '../wonderland/Message';
import T from '../../modules/translation';
import E from '../../modules/errors';
import RadioGroup from 'react-radio-group';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var BillingForm = React.createClass({
    mixins: [AjaxMixin], // ReactDebugMixin
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        var now = new Date(),
            years = [],
            month = now.getMonth() + 1
        ;
        // Show this and next 10 years (note: show this year even in Dec just in case)
        while (years.length < 10) {
            years.push(now.getFullYear() + years.length);
        }
        return {
            isError: false,
            isLoading: true,
            stripeId: false,
            addNewCard: false,
            possibleYears: years,
            planType: 'demo',
            address_line1: '',
            address_line2: '',
            address_city: '',
            address_state: '',
            address_zip: '',
            name: '',
            number: '',
            exp_month: ('0' + (month === 12 ? 1 : month)).slice(-2), // next month; zero-padded
            exp_year: now.getFullYear() + (month === 12 ? 1 : 0), // this year; or next if Dec
            cvc: ''
        };
    },
    componentWillUnmount: function() {
        E.clearErrors();
    },
    componentWillMount: function () {
        var self = this;
        self.GET('billing/account')
            .then(function (res) {
                var currentCard = false,
                    currentSubscription = false
                ;
                if (res.sources && res.sources.data) {
                    res.sources.data.some(function (card) {
                        if (card.id === res.default_source) {
                            currentCard = card;
                            return true;
                        }
                    });
                }
                if (currentCard) {
                    self.setState({
                        isLoading: false,
                        stripeId: res.id,
                        planType: currentSubscription ? 'TODO' : 'demo',
                        address_line1: currentCard.address_line1,
                        address_line2: currentCard.address_line2,
                        address_city: currentCard.address_city,
                        address_state: currentCard.address_state,
                        address_zip: currentCard.address_zip,
                        name: currentCard.name,
                        current_number: (currentCard.brand === 'AMEX' ? '***********' : '************') + currentCard.last4,
                        current_exp_month: ('0' + currentCard.exp_month).slice(-2),
                        current_exp_year: currentCard.exp_year
                    });
                } else {
                    // Throw an error to push into the `catch` block below
                    throw new Error('No card on file');
                }
            })
            .catch(function (err) {
                // On error (no account), default the nameOnCard to the current user's name
                return SESSION.user()
                    .then(function (user) {
                        self.setState({
                            isLoading: false,
                            name: user.first_name + ' ' + user.last_name,
                            addNewCard: true
                        });
                    })
                    .catch(function (err) {
                        E.raiseError(err);
                        self.setState({
                            isLoading: false,
                            isError: true
                        });
                    });
            });
    },
    componentDidMount: function() {
        var s;
        if (!document.getElementById('stripeJs')) {
            s = document.createElement('script');
            this._isSubmitted = false;
            s.id = 'stripeJs';
            s.setAttribute('src', 'https://js.stripe.com/v2/');
            document.body.appendChild(s);
        }
    },
    handleFieldChange: function(e) {
        var data = {};
        data[e.target.id] = e.target.value;
        this.setState(data);
    },
    handlePlanTypeChange: function(val) {
        this.setState({
            planType: val
        });
    },
    handleAddNewCardChange: function(e) {
        this.setState({
            addNewCard: e.target.value === '1'
        });
    },
    handleNumberFocus: function(e) {
        e.target.select();
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
            selectClassName = 'select is-disabled is-loading';
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
                    <RadioGroup
                        name="planType"
                        id="planType"
                        selectedValue={self.state.planType}
                        onChange={self.handlePlanTypeChange}
                    >
                        {Radio => (
                            <div>
                                <p className="control">
                                    <label className="radio">
                                        <Radio value="demo" />
                                        Demo
                                    </label>
                                </p>
                                <p className="control">
                                    <label className="radio">
                                        <Radio value="pro_monthly" />
                                        Pro - Monthly
                                    </label>
                                </p>
                                <p className="control">
                                    <label className="radio">
                                        <Radio value="pro_yearly" />
                                        Pro - Yearly
                                    </label>
                                </p>
                            </div>
                        )}
                    </RadioGroup>
                    {(() => {
                        if (self.state.planType !== 'demo' && self.state.stripeId) {
                            return (
                                <div className="control">
                                    <hr />
                                    <label className="radio">
                                        <input
                                            type="radio"
                                            name="addNewCard"
                                            value="0"
                                            onChange={self.handleAddNewCardChange}
                                            defaultChecked
                                        />
                                        {T.get('copy.billing.form.useCardOnFile')}
                                    </label>
                                    <p>
                                        {self.state.name}
                                    </p>
                                    <p>
                                        {self.state.address_line1}
                                        {self.state.address_line2 ? '<br />' + self.state.address_line2 : ''}
                                        <br />{self.state.address_city},&nbsp;{self.state.address_state}&nbsp;{self.state.address_zip}
                                    </p>
                                    <p>
                                        {self.state.current_number}
                                        <br />{self.state.current_exp_month}/{self.state.current_exp_year}
                                    </p>
                                </div>
                            );
                        }
                    })()}
                    {(() => {
                        if (self.state.planType !== 'demo' && self.state.stripeId) {
                            return (
                                <p>
                                    <label className="radio">
                                        <input
                                            type="radio"
                                            name="addNewCard"
                                            value="1"
                                            onChange={self.handleAddNewCardChange}
                                        />
                                        {T.get('copy.billing.form.useNewCard')}
                                    </label>
                                </p>
                            );
                        } else {
                            return (
                                <hr />
                            );
                        }
                    })()}
                    {(() => {
                        if (self.state.planType !== 'demo' && self.state.addNewCard) {
                            return (
                                <div className="control">
                                    <label htmlFor="address_line1">{T.get('copy.billing.form.billingAddress')}</label>
                                    <p className="control is-grouped">
                                        <input
                                            className={inputClassName}
                                            type="text"
                                            required
                                            ref="address_line1"
                                            id="address_line1"
                                            data-stripe="address_line1"
                                            placeholder={T.get('copy.billing.form.address')}
                                            defaultValue={self.state.address_line1}
                                            onChange={self.handleFieldChange}
                                        />
                                    </p>
                                    <p className="control is-grouped">
                                        <input
                                            className={inputClassName}
                                            type="text"
                                            ref="address_line2"
                                            id="address_line2"
                                            data-stripe="address_line2"
                                            placeholder={T.get('copy.billing.form.address')}
                                            defaultValue={self.state.address_line2}
                                            onChange={self.handleFieldChange}
                                        />
                                    </p>
                                    <p className="control is-grouped">
                                        <input
                                            className={inputClassName}
                                            type="text"
                                            required
                                            ref="address_city"
                                            id="address_city"
                                            data-stripe="address_city"
                                            placeholder={T.get('copy.billing.form.city')}
                                            defaultValue={self.state.address_city}
                                            onChange={self.handleFieldChange}
                                        />
                                        <input
                                            className={inputClassName}
                                            type="text"
                                            required
                                            ref="address_state"
                                            id="address_state"
                                            data-stripe="address_state"
                                            placeholder={T.get('copy.billing.form.state')}
                                            defaultValue={self.state.address_state}
                                            onChange={self.handleFieldChange}
                                        />
                                        <input
                                            className={inputClassName}
                                            type="text"
                                            required
                                            ref="address_zip"
                                            id="address_zip"
                                            data-stripe="address_zip"
                                            placeholder={T.get('copy.billing.form.zip')}
                                            defaultValue={self.state.address_zip}
                                            onChange={self.handleFieldChange}
                                        />
                                    </p>

                                    <hr />

                                    <label htmlFor="nameOnCard">{T.get('copy.billing.form.nameOnCard')}</label>
                                    <p className="control is-grouped">
                                        <input
                                            className={inputClassName}
                                            type="text"
                                            required
                                            ref="name"
                                            id="name"
                                            data-stripe="name"
                                            placeholder={T.get('copy.billing.form.nameOnCard')}
                                            defaultValue={self.state.name}
                                            onChange={self.handleFieldChange}
                                        />
                                    </p>

                                    <label htmlFor="cc_number">{T.get('copy.billing.form.ccNumber')}</label>
                                    <p className="control is-grouped">
                                        <input
                                            className={inputClassName}
                                            type="text"
                                            required
                                            ref="number"
                                            id="number"
                                            data-stripe="number"
                                            placeholder={T.get('copy.billing.form.ccNumber')}
                                            defaultValue={self.state.number}
                                            onFocus={self.handleNumberFocus}
                                            onChange={self.handleFieldChange}
                                        />
                                    </p>

                                    <label htmlFor="cc_exp_month">{T.get('copy.billing.form.ccExpiration')}</label>
                                    <p className="control is-grouped">
                                        <span className={selectClassName}>
                                            <select
                                                ref="exp_month"
                                                id="exp_month"
                                                data-stripe="exp_month"
                                                defaultValue={self.state.exp_month}
                                                onChange={self.handleFieldChange}
                                            >
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
                                            <select
                                                className={selectClassName}
                                                ref="exp_year"
                                                id="exp_year"
                                                data-stripe="exp_year"
                                                defaultValue={self.state.exp_year}
                                                onChange={self.handleFieldChange}
                                            >
                                                {(() => {
                                                    return self.state.possibleYears.map(function (year) {
                                                        return (
                                                            <option value={year} key={year}>{(''+year).slice(-2)}</option>
                                                        );
                                                    });
                                                })()}
                                            </select>
                                        </span>
                                    </p>

                                    <label htmlFor="cc_cvc">{T.get('copy.billing.form.ccCVC')}</label>
                                    <p className="control is-grouped">
                                        <input
                                            className={inputClassName}
                                            type="password"
                                            ref="cvc"
                                            id="cvc"
                                            data-stripe="cvc"
                                            placeholder={T.get('copy.billing.form.ccCVC')}
                                            onChange={self.handleFieldChange}
                                        />
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
                } else if (self.state.stripeId) {
                    self.handleStripeResponse(200, {
                        id: self.state.stripeId
                    });
                } else {
                    try {
                        window.Stripe.setPublishableKey(CONFIG.STRIPE_KEY);
                        window.Stripe.card.createToken(
                            document.getElementById('billingForm'),
                            self.handleStripeResponse
                        );
                    } catch (e) {
                        // Error in Stripe config/read of form - log to console for debug
                        console.error(e);
                        // Return "unknown" error to user
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
            // Handle stripe API error
            E.checkForError(data.error.message, false);
            self.setState({
                isLoading: false,
                isError: true
            }, function () {
                self._isSubmitted = false;
            });
        } else {
            if (self.state.planType === 'demo') {
                // Only need to change subscription when a plan exists
                if (self.state.account) {
                    apiCall = self.POST('billing/subscription', {
                        data: {
                            plan_type: self.state.planType
                        }
                    });
                } else {
                    // no-op; no current plan to remove
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
                        isError: false,
                        stripeId: data && data.id ? data.id : false
                    }, function () {
                        self._isSubmitted = false;
                    }); 
                })
                .catch(function (err) {
                    E.raiseError(err);
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
