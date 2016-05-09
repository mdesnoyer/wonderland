// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import T from '../../modules/translation';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var SupportPage = React.createClass({
    // mixins: [ReactDebugMixin],
    render: function() {
        return (
            <div>
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.support.title'))}
                />
                <SiteHeader />
                <section className="section">
                    <div className="container">
                        <h1 className="title is-2">{T.get('copy.support.heading')}</h1>
                        <div className="content">
                            <h2 className="title is-3">Overview</h2>
                            <p>TODO</p>
                            <h3 className="title is-4">Video Analysis</h3>
                            <p>TODO</p>
                            <h3 className="title is-4">Automated A/B Testing & Analytics</h3>
                            <p>TODO</p>
                            <h3 className="title is-4">Getting Started</h3>
                            <p>TODO</p>
                            <h2 className="title is-3">Brightcove Plugin</h2>
                            <p>TODO</p>
                            <h3 className="title is-4">Credentials</h3>
                            <p>TODO</p>
                            <h3 className="title is-4">Image Serving</h3>
                            <p>TODO</p>
                            <h3 className="title is-4">Players</h3>
                            <p>TODO</p>
                            <h3 className="title is-4">Telemetry from site</h3>
                            <p>TODO</p>
                            <h2 className="title is-3">Custom Platform Implementation Guide</h2>
                            <p>TODO</p>
                            <h3 className="title is-4">Video Ingestion</h3>
                            <p>TODO</p>
                            <h3 className="title is-4">Image Serving</h3>
                            <p>TODO</p>
                            <h3 className="title is-4">Callback handling</h3>
                            <p>TODO</p>
                            <h3 className="title is-4">Telemetry</h3>
                            <p>TODO</p>
                            <h2 className="title is-3">Reference (API Docs, api.docs.neon-lab.com)</h2>
                            <p>TODO</p>
                            <h2 className="title is-3">Support</h2>
                            <p>TODO</p>
                            <h3 className="title is-4">Contact form</h3>
                            <p>TODO</p>
                        </div>
                    </div>
                </section>
                <SiteFooter />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default SupportPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
