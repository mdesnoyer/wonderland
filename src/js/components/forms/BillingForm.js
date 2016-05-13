import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import AjaxMixin from '../../mixins/Ajax';
import SESSION from '../../modules/session';
import Message from '../wonderland/Message';
import T from '../../modules/translation';
import E from '../../modules/errors';
import RadioGroup from 'react-radio-group';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var BillingForm = React.createClass({
    mixins: [AjaxMixin], // ReactDebugMixin
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    PLANTYPES: {
        demo: 'demo',
        pro_monthly: 'pro_monthly',
        pro_yearly: 'pro_yearly'
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
            isSuccess: false,
            isLoading: true,
            stripeId: false,
            addNewCard: false,
            possibleYears: years,
            planType: '',
            address_line1: '',
            address_line2: '',
            address_city: '',
            address_state: '',
            address_zip: '',
            name: '',
            number: '',
            exp_month: UTILS.leadingZero(month === 12 ? 1 : month + 1), // next month; zero-padded
            exp_year: now.getFullYear() + (month === 12 ? 1 : 0), // this year; or next if Dec
            cvc: ''
        };
    },
    componentWillUnmount: function() {
        E.clearErrors();
    },
    // Extracts the current card info from a Stripe response; else returns null
    getCurrentCard: function(res) {
        var currentCard;
        if (res.sources && res.sources.data) {
            res.sources.data.some(function (card) {
                if (card.id === res.default_source) {
                    currentCard = card;
                    return true;
                }
            });
        }
        if (currentCard) {
            return {
                address_line1: currentCard.address_line1,
                address_line2: currentCard.address_line2,
                address_city: currentCard.address_city,
                address_state: currentCard.address_state,
                address_zip: currentCard.address_zip,
                name: currentCard.name,
                current_number: (currentCard.brand === 'AMEX' ? '***********' : '************') + currentCard.last4,
                current_exp_month: UTILS.leadingZero(currentCard.exp_month),
                current_exp_year: currentCard.exp_year
            };
        }
        return null;
    },
    componentWillMount: function () {
        var self = this;
        self.GET('billing/account')
            .then(function (res) {
                var currentCard = false,
                    currentSubscription = false
                ;
                currentCard = self.getCurrentCard(res);
                if (res.subscriptions && res.subscriptions.data) {
                    res.subscriptions.data.some(function (subscription) {
                        if (subscription.plan && subscription.plan.id) {
                            currentSubscription = subscription.plan.id;
                            return true;
                        }
                    });
                }
                if (currentCard) {
                    self.setState(
                        Object.assign(
                            currentCard,
                            {
                                isLoading: false,
                                stripeId: res.id,
                                planType: currentSubscription || self.PLANTYPES.demo
                            }
                        )
                    );
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
                            planType: self.PLANTYPES.demo,
                            isLoading: false,
                            name: user.first_name + ' ' + user.last_name,
                            addNewCard: true
                        });
                    })
                    .catch(function (err) {
                        E.raiseError(err);
                        self.setState({
                            planType: self.PLANTYPES.demo,
                            isLoading: false,
                            isError: true
                        });
                    });
            });
    },
    componentDidMount: function() {
        this._isSubmitted = false;
    },
    handleFieldChange: function(e) {
        var data = {};
        data[e.target.id] = e.target.value;
        this.setState(data);
    },
    handlePlanTypeChange: function(val) {
        this.setState({
            isSuccess: false,
            planType: val
        });
    },
    handleAddNewCardChange: function(e) {
        // Inputs use a 1/0 value; convert it to tue/false in the state for easier use
        this.setState({
            isSuccess: false,
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
            messageNeeded = self.state.isError === true ? <Message header={T.get('copy.billing.title') + ' ' + T.get('error')} body={E.getErrors()} flavour="danger" /> :
                            self.state.isSuccess !== false ? <Message header={T.get('copy.billing.title') + ' ' + T.get('success')} body={self.state.isSuccess} flavour="success" /> : ''
        ;
        if (self.state.isLoading) {
            buttonClassName = 'button is-primary is-medium is-disabled is-loading';
            inputClassName = 'input is-medium is-disabled';
            selectClassName = 'select is-medium is-disabled is-loading';
        }
        else {
            buttonClassName = 'button is-medium is-primary';
            inputClassName = 'input is-medium';
            selectClassName = 'select is-medium';
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
                                        <Radio value={self.PLANTYPES.demo} disabled={self.state.isLoading} />
                                        Demo (free for 10 videos)
                                    </label>
                                </p>
                                <p className="control">
                                    <label className="radio">
                                        <Radio value={self.PLANTYPES.pro_monthly} disabled={self.state.isLoading} />
                                        Pro ($995/month)
                                    </label>
                                </p>
                                <p className="control">
                                    <label className="radio">
                                        <Radio value={self.PLANTYPES.pro_yearly} disabled={self.state.isLoading} />
                                        Pro ($9,995/year)
                                    </label>
                                </p>
                            </div>
                        )}
                    </RadioGroup>
                    {(() => {
                        if (self.state.planType !== self.PLANTYPES.demo && self.state.stripeId) {
                            return (
                                <div>
                                    <div className="control">
                                        <hr />
                                        <label className="radio">
                                            <input
                                                type="radio"
                                                name="addNewCard"
                                                ref="useCardOnFile"
                                                value="0"
                                                onChange={self.handleAddNewCardChange}
                                                defaultChecked
                                                disabled={self.state.isLoading}
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
                                    <p>
                                        <label className="radio">
                                            <input
                                                type="radio"
                                                name="addNewCard"
                                                ref="useNewCard"
                                                value="1"
                                                onChange={self.handleAddNewCardChange}
                                                disabled={self.state.isLoading}
                                            />
                                            {T.get('copy.billing.form.changeCard')}
                                        </label>
                                    </p>
                                </div>
                            );
                        } else {
                            return (
                                <hr />
                            );
                        }
                    })()}
                    {(() => {
                        if (self.state.planType !== self.PLANTYPES.demo && self.state.addNewCard) {
                            return (
                                <div className="control">
                                    <label htmlFor="address_line1">{T.get('copy.billing.form.billingAddress')}</label>
                                    <p className="control is-grouped">
                                        <input
                                            className={inputClassName}
                                            type="text"
                                            required
                                            id="address_line1"
                                            data-stripe="address_line1"
                                            placeholder={T.get('copy.billing.form.address')}
                                            value={self.state.address_line1}
                                            onChange={self.handleFieldChange}
                                        />
                                    </p>
                                    <p className="control is-grouped">
                                        <input
                                            className={inputClassName}
                                            type="text"
                                            id="address_line2"
                                            data-stripe="address_line2"
                                            placeholder={T.get('copy.billing.form.address2')}
                                            value={self.state.address_line2}
                                            onChange={self.handleFieldChange}
                                        />
                                    </p>
                                    <p className="control is-grouped">
                                        <input
                                            className={inputClassName}
                                            type="text"
                                            required
                                            id="address_city"
                                            data-stripe="address_city"
                                            placeholder={T.get('copy.billing.form.city')}
                                            value={self.state.address_city}
                                            onChange={self.handleFieldChange}
                                        />
                                        <input
                                            className={inputClassName}
                                            type="text"
                                            required
                                            id="address_state"
                                            data-stripe="address_state"
                                            placeholder={T.get('copy.billing.form.state')}
                                            value={self.state.address_state}
                                            onChange={self.handleFieldChange}
                                        />
                                        <input
                                            className={inputClassName}
                                            type="text"
                                            required
                                            id="address_zip"
                                            data-stripe="address_zip"
                                            placeholder={T.get('copy.billing.form.zip')}
                                            value={self.state.address_zip}
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
                                            id="name"
                                            data-stripe="name"
                                            placeholder={T.get('copy.billing.form.nameOnCard')}
                                            value={self.state.name}
                                            onChange={self.handleFieldChange}
                                        />
                                    </p>
                                    <div className="columns">
                                        <div className="column is-half">
                                            <label htmlFor="cc_number">{T.get('copy.billing.form.ccNumber')}</label>
                                            <p className="control is-grouped">
                                                <input
                                                    className={inputClassName}
                                                    type="text"
                                                    required
                                                    autoComplete="neon_number"
                                                    id="number"
                                                    data-stripe="number"
                                                    placeholder={T.get('copy.billing.form.ccNumber')}
                                                    value={self.state.number}
                                                    onFocus={self.handleNumberFocus}
                                                    onChange={self.handleFieldChange}
                                                />
                                            </p>
                                        </div>
                                        <div className="column">
                                            <label htmlFor="cc_exp_month">{T.get('copy.billing.form.ccExpiration')}</label>
                                            <p className="control is-grouped">
                                                <span className={selectClassName}>
                                                    <select
                                                        className={selectClassName}
                                                        id="exp_month"
                                                        data-stripe="exp_month"
                                                        value={self.state.exp_month}
                                                        onChange={self.handleFieldChange}
                                                    >
                                                        <option value="01">01 - Jan</option>
                                                        <option value="02">02 - Feb</option>
                                                        <option value="03">03 - Mar</option>
                                                        <option value="04">04 - Apr</option>
                                                        <option value="05">05 - May</option>
                                                        <option value="06">06 - Jun</option>
                                                        <option value="07">07 - Jul</option>
                                                        <option value="08">08 - Aug</option>
                                                        <option value="09">09 - Sep</option>
                                                        <option value="10">10 - Oct</option>
                                                        <option value="11">11 - Nov</option>
                                                        <option value="12">12 - Dec</option>
                                                    </select>
                                                </span>
                                                <span className={selectClassName + ' is-fullwidth'}>
                                                    <select
                                                        className={selectClassName + ' is-fullwidth'}
                                                        id="exp_year"
                                                        data-stripe="exp_year"
                                                        value={self.state.exp_year}
                                                        onChange={self.handleFieldChange}
                                                    >
                                                        {(() => {
                                                            return self.state.possibleYears.map(function (year) {
                                                                return (
                                                                    <option value={year} key={year}>{year}</option>
                                                                );
                                                            });
                                                        })()}
                                                    </select>
                                                </span>
                                            </p>
                                        </div>
                                        <div className="column">
                                            <label htmlFor="cc_cvc">{T.get('copy.billing.form.ccCVC')}</label>
                                            <p className="control is-grouped">
                                                <input
                                                    className={inputClassName}
                                                    type="text"
                                                    autoComplete="neon_cvc"
                                                    id="cvc"
                                                    data-stripe="cvc"
                                                    placeholder={T.get('copy.billing.form.ccCVC')}
                                                    value={self.state.cvc}
                                                    onChange={self.handleFieldChange}
                                                />
                                            </p>
                                        </div>
                                    </div>
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
                isError: false,
                isSuccess: false,
                isLoading: true
            }, function () {
                if (self.state.planType === self.PLANTYPES.demo) {
                    self.handleStripeResponse();
                } else if (self.state.stripeId && !self.state.addNewCard) {
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
            if (self.state.planType === self.PLANTYPES.demo) {
                // Only need to change subscription when a plan exists
                if (self.state.stripeId) {
                    apiCall = self.POST('billing/subscription', {
                        data: {
                            plan_type: self.state.planType
                        }
                    });
                } else {
                    // no-op; no current plan to remove or add
                    apiCall = new Promise(function (resolve) {
                        resolve();
                    });
                }
            } else if (self.state.addNewCard === true) {
                // Adding a new card AND changing the plan
                // API calls have to be chainedv when planType != "demo"
                apiCall = self.POST('billing/account', {
                    data: {
                        billing_token_ref: data.id
                    }
                })
                    .then(function (res) {
                        // Update view based on new CC data
                        var currentCard = self.getCurrentCard(res),
                            now = new Date(),
                            month = now.getMonth() + 1
                        ;
                        // Reset form for new card potential
                        if (self.refs.useCardOnFile) {
                            self.refs.useCardOnFile.checked = true;
                        }
                        self.setState(
                            Object.assign(
                                currentCard,
                                {
                                    isError: false,
                                    stripeId: res && res.id ? res.id : false,
                                    addNewCard: false,
                                    number: '',
                                    cvc: '',
                                    exp_month: UTILS.leadingZero(month === 12 ? 1 : month + 1), // next month; zero-padded
                                    exp_year: now.getFullYear() + (month === 12 ? 1 : 0) // this year; or next if Dec
                                }
                            )
                        );
                        // Still need to set/change the subscription
                        return self.POST('billing/subscription', {
                            data: {
                                plan_type: self.state.planType
                            }
                        });
                    });
            } else {
                // Just changing subscription type
                apiCall = self.POST('billing/subscription', {
                    data: {
                        plan_type: self.state.planType
                    }
                });
            }
            apiCall
                .then(function (data) {
                    self.setState({
                        isSuccess: T.get('copy.billing.form.saveSuccess'),
                        isLoading: false,
                        isError: false
                    }, function () {
                        self._isSubmitted = false;
                    }); 
                })
                .catch(function (err) {
                    E.raiseError(err);
                    self.setState({
                        isLoading: false,
                        isError: true,
                        isSuccess: false
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
