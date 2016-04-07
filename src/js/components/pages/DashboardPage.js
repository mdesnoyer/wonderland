// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import Secured from '../../mixins/secured';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var DashboardPage = React.createClass({
    mixins: [ Secured ],
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    render: function() {
        return (
            <div>
                <SiteHeader />
                <section className="section">
                    <div className="container">
                        TODO - DashboardPage
                    </div>
                </section>
                <SiteFooter />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default DashboardPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
