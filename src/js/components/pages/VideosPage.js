// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import Videos from '../wonderland/Videos';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var VideosPage = React.createClass({
    render: function() {
        return (
            <div>
                <SiteHeader />
                <section className="section">
                    <div className="container">
                        <Videos />
                    </div>
                </section>
                <SiteFooter />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default VideosPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
