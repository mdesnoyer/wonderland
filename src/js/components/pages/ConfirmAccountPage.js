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
        var self = this;
        self.state.errorMessageArray.push(errorMessage);
    },
    componentWillMount: function() {
        var self = this;
        AJAX.doPost('accounts/verify', {
            host: CONFIG.AUTH_HOST,
            data: {
                token: self.props.location.query.token
            }
        }).then(function () {
            self.render = function () {
                return false;
            };
            self.context.router.push('/account/confirmed/');
        }, function (err) {
            // TODO - This is ugly and prone to problems; need a better error handling method (global in AJAX.doAPICall?)
            self.handleError(JSON.parse(err.responseText).error.data, false);
            self.setState({isError: true});
        });
    },
    render: function() {
        var self = this,
            messageNeeded = self.state.isError ? <Message header={T.get('confirmAccount') + ' ' + T.get('error')} body={self.state.errorMessageArray} flavour="danger" />  : '',
            body1 = T.get('copy.confirmAccount.body.1'),
            body2 = T.get('copy.confirmAccount.body.2', {
                '@link': UTILS.CONTACT_EXTERNAL_URL
            })
        ;
        return (
            <div>
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.confirmAccount.title'))}
                />
                <SiteHeader />
                <section className="section columns is-desktop">
                    <div className="column is-half is-offset-quarter">
                        {messageNeeded}
                        <h1 className="title is-2">{T.get('copy.confirmAccount.heading')}</h1>
                        <div className="content">
                            <p>{body1}</p>
                            <p><span dangerouslySetInnerHTML={{__html: body2}} /></p>
                        </div>
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
