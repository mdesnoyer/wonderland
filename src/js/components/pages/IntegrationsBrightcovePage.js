// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import IntegrationsForm from '../forms/IntegrationsForm';
import Secured from '../../mixins/secured';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var IntegrationsBrightcovePage = React.createClass({
    mixins: [Secured],
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        var self = this;
        return {
            id: this.props.location.query.id
        };
    },
    render: function() {
        return (
            <div>
                <Helmet
                    title={T.get('copy.integrations.types.brightcove.title')}
                />
                <SiteHeader />
                <section className="section columns is-desktop">
                    <div className="column is-half is-offset-quarter">
                        <h1 className="title is-2">
                            <img src={T.get('copy.integrations.types.brightcove.img')} />
                        </h1>
                        <div className="content">
                            <IntegrationsForm provider="brightcove" id={this.state.id} />
                        </div>
                    </div>
                </section>
                <SiteFooter />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default IntegrationsBrightcovePage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
