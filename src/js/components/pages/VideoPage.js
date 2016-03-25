// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import SiteHeader from '../lookingglass/SiteHeader';
import SiteFooter from '../lookingglass/SiteFooter';
import Video from '../lookingglass/Video';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var VideoPage = React.createClass({
    render: function() {
        return (
            <div>
                <SiteHeader />
                <section className="section">
                    <div className="container">
                        <Video params={this.props.params} forceOpen={true} />
                    </div>
                </section>
                <SiteFooter />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default VideoPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
