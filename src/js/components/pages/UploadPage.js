// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import SiteHeader from '../lookingglass/SiteHeader';
import SiteFooter from '../lookingglass/SiteFooter';
import UploadForm from '../lookingglass/UploadForm';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var UploadPage = React.createClass({
    render: function() {
        return (
            <div>
                <SiteHeader />
                    <section className="section columns">
                        <div className="column is-half is-offset-quarter">
                            <UploadForm />
                        </div>
                    </section>
                <SiteFooter />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default UploadPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
