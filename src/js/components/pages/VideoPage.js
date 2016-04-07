// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import Video from '../wonderland/Video';
import Secured from '../../mixins/secured';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var VideoPage = React.createClass({
    mixins: [ Secured ],
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    render: function() {
        return (
            <div>
                <Helmet
                    title={UTILS.buildPageTitle('Video')}
                />
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
