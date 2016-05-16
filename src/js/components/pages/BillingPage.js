// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import BillingForm from '../forms/BillingForm';
import T from '../../modules/translation';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';
import Secured from '../../mixins/Secured';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var BillingPage = React.createClass({
    mixins: [Secured], // ReactDebugMixin
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    render: function() {
        return (
            <div>
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.billing.title'))}
                    script={[{
                        src: 'https://js.stripe.com/v2/',
                        type: 'text/javascript'
                    }]}
                />
                <SiteHeader />
                <section className="section">
                    <div className="container">
                        <h1 className="title is-2">{T.get('copy.billing.heading')}</h1>
                        <div className="content">
                            <p><span dangerouslySetInnerHTML={{__html: T.get('copy.billing.body')}} /></p>
                        </div>
                        <BillingForm
                            showLegend={false}
                        />
                    </div>
                </section>
                <SiteFooter />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default BillingPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

