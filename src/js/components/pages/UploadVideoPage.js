// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import UploadVideoForm from '../forms/UploadVideoForm';
import Secured from '../../mixins/secured';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var UploadVideoPage = React.createClass({
    mixins: [ Secured ],
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    render: function() {
        return (
            <div>
                <SiteHeader />
                <section className="section columns">
                    <div className="column is-half is-offset-quarter">
                        <UploadVideoForm />
                    </div>
                </section>
                <SiteFooter />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default UploadVideoPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
