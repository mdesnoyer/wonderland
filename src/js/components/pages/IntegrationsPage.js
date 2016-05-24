// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import Integrations from '../wonderland/Integrations';
import Secured from '../../mixins/Secured';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var IntegrationsPage = React.createClass({
    mixins: [Secured], // ReactDebugMixin
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    render: function() {
        return (
            <div>
                <Helmet title={UTILS.buildPageTitle(T.get('copy.plugins.title'))}/>
                <SiteHeader />
                <section className="wonderland-section section">
                    <div className="container">
                        <h1 className="title is-2">{T.get('copy.plugins.heading')}</h1>
                        <div className="content">
                            {T.get('copy.plugins.body')}
                        </div>
                        <Integrations
                            pop={window.location.hash === '#pop'}
                        />
                    </div>
                </section>
                <SiteFooter />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default IntegrationsPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
