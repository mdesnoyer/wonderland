// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';
import AJAX from '../../modules/ajax';
import Message from '../wonderland/Message';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var ConfirmAccountPage = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {
            errorMessageArray: [],
            isError: false
        }  
    },
    handleError: function (errorMessage) {
        this.state.errorMessageArray.push(errorMessage);
    },
    componentWillMount: function() {
        var self = this;
        AJAX.doPost('accounts/verify', {
            host: CONFIG.AUTH_HOST,
            data: {
                token: self.props.location.query.token
            }
        }).then(function () {
            self.render = function () { return false; };
            self.context.router.push('/signin/?confirmed=true');
        }, function (err) {
            // TODO - This is ugly and prone to problems; need a better error handling method (global in AJAX.doAPICall?)
            self.handleError(JSON.parse(err.responseText).error.data, false);
            self.setState({isError: true});
        });
    },
    render: function() {
        var messageNeeded = this.state.isError ? <Message header={T.get('confirmAccount') + ' ' + T.get('error')} body={this.state.errorMessageArray} flavour="danger" />  : '';
        return (
            <div>
                <Helmet
                    title={UTILS.buildPageTitle('Confirm Account')}
                />
                <SiteHeader />
                <section className="section">
                    <div className="container">
                        {messageNeeded}
                        TODO - ConfirmAccountPage
                    </div>
                </section>
                <SiteFooter />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default ConfirmAccountPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
