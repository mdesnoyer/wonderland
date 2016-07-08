// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';
import AjaxMixin from '../../mixins/Ajax';
import Message from '../wonderland/Message';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var ConfirmAccountPage = React.createClass({
	mixins: [AjaxMixin], // ReactDebugMixin
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
    render: function() {
        var self = this,
            messageNeeded = self.state.isError ? <Message header={T.get('confirmAccount') + ' ' + T.get('error')} body={self.state.errorMessageArray} flavour="danger" /> : '',
            body1 = T.get('copy.confirmAccount.body.1'),
            body2 = T.get('copy.confirmAccount.body.2', {
                '@link': UTILS.CONTACT_EXTERNAL_URL
            })
        ;
        return (
            <main className="xxPage">
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.confirmAccount.title'))}
                />
                <SiteHeader />
                <section>
                        <div>
                            {messageNeeded}
                            <h1>{T.get('copy.confirmAccount.heading')}</h1>
                            <div>
                                <a href="/signin/">sign in here</a>
                                <p>{body1}</p>
                                <p><span dangerouslySetInnerHTML={{__html: body2}} /></p>
                            </div>
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