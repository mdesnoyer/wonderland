// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import Secured from '../../mixins/secured';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var IntegrationsNewPage = React.createClass({
    mixins: [Secured],
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    render: function() {
        return (
            <div>
                <Helmet
                    title={T.get('copy.integrations.new.title')}
                />
                <SiteHeader />
                <section className="section columns is-desktop">
                    <div className="column is-half is-offset-quarter">
                        <h1 className="title is-2">{T.get('copy.integrations.new.heading')}</h1>
                        <div className="content">
                            <p>{T.get('copy.integrations.new.body')}</p>
                        </div>
                    </div>
                </section>
                <SiteFooter />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default IntegrationsNewPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
