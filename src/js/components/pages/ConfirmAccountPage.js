// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var ConfirmAccountPage = React.createClass({
    render: function() {
        return (
            <div>
                <Helmet
                    title={UTILS.buildPageTitle('Confirm Account')}
                />
                <SiteHeader />
                <section className="section">
                    <div className="container">
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
