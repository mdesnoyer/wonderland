// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import Helmet from 'react-helmet';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import TermsOfService from '../core/TermsOfService'

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var TermsPage = React.createClass({
    render: function() {
        return (
            <div>
                <Helmet
                    title={UTILS.buildPageTitle('Terms of Service')}
                />
                <SiteHeader />
                <section className="section">
                    <div className="container">
                        <TermsOfService />
                    </div>
                </section>
                <SiteFooter />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default TermsPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -