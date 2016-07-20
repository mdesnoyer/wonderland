// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';
import AjaxMixin from '../../mixins/Ajax';
import Message from '../wonderland/Message';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var ConfirmAccountPage = React.createClass({
	mixins: [AjaxMixin],
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {
            errorMessageArray: [],
            isError: false,
            sidebarContent: null
        }  
    },
    handleError: function (errorMessage) {
        var self = this;
        self.state.errorMessageArray.push(errorMessage);
    },
    componentWillMount: function() {
        var self = this;
        self.POST('accounts/verify', {
            host: CONFIG.AUTH_HOST,
            data: {
                token: self.props.location.query.token
            }
        })
        .then(function (res) {
            self.context.router.push('/account/confirmed/');
        })
        .catch(function (err) {
            if (err.code === 409) {
                alert('It looks like you have already confirmed this account.')
                self.context.router.push('/account/confirmed/');
            }
            else {
                self.handleError(JSON.parse(err.responseText).error.data, false);
                self.setState({
                    isError: true
                });
            }
        });
    },
    openContactUs: function(e) {
        var self = this;
        e.preventDefault();
        self.setState({
            sidebarContent: 'contact'
        });
    },
    render: function() {
        var self = this,
            messageNeeded = self.state.isError ? <Message message={self.state.errorMessageArray} type="formError" /> : ''
        ;
        return (
            <main className="xxPage">
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.confirmAccount.title'))}
                />
                <SiteHeader sidebarContent={self.state.sidebarContent} />
                <section>
                    <h1 className="xxTitle">{T.get('copy.confirmAccount.heading')}</h1>
                    {messageNeeded}
                    <div className="xxText">
                        <p>{T.get('copy.confirmAccount.body.1')} Please look for an email that will verify you account. It should arrive very quickly. If not, please <a href="#" onClick={self.openContactUs}>contact us</a>.</p>
                    </div>
                </section>
                <SiteFooter />
            </main> 
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default ConfirmAccountPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 