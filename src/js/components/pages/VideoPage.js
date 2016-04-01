// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import Video from '../wonderland/Video';

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
