// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import Secured from '../../mixins/Secured';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var NewPluginPage = React.createClass({
    mixins: [Secured], // ReactDebugMixin
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    addBrightcove: function () {
        this.context.router.push(UTILS.DRY_NAV.INTEGRATIONS_BRIGHTCOVE.URL);
    },
    render: function() {
        return (
            <div>
                <Helmet
                    title={T.get('copy.new.plugin.title')}
                />
                <SiteHeader />
                <section className="section">
                    <div className="container">
                        <h1 className="title is-2">{T.get('copy.new.plugin.heading')}</h1>
                        <div className="content">
                            {T.get('copy.new.plugin.body')}
                        </div>
                        <div className="columns">
                            <div className="card column is-one-third">
                                <div className="card-content has-text-centered">
                                    <img src={T.get('copy.plugins.types.brightcove.img')} />
                                    <div>
                                        <a className="button is-primary is-medium" onClick={this.addBrightcove}>{T.get('add')}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <SiteFooter />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default NewPluginPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
