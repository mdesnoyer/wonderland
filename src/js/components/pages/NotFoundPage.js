// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var NotFoundPage = React.createClass({
    render: function() {
        return (
            <div>
                <SiteHeader />
                    <section className="section">
                        <div className="container">
                            <h1 className="title">{T.get('error.notFoundPage')}</h1>
                            TODO - NotFoundPage
                        </div>
                    </section>
                <SiteFooter />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default NotFoundPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
