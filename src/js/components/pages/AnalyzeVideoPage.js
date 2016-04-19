// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import AnalyzeVideoForm from '../forms/AnalyzeVideoForm';
import Secured from '../../mixins/secured';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var AnalyzeVideoPage = React.createClass({
    mixins: [Secured],
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    render: function() {
        return (
            <div>
                <Helmet
                    title={T.get('copy.analyzeVideo.title')}
                />
                <SiteHeader />
                <section className="section">
                    <div className="columns is-desktop">
                        <div className="column is-half is-offset-quarter">
                            <h1 className="title is-2">{T.get('copy.analyzeVideo.heading')}</h1>
                            {/*<div className="content">
                                <p>{T.get('copy.analyzeVideo.body')}</p>
                            </div>*/}
                            <section className="container">
                                <AnalyzeVideoForm
                                    showLegend={false}
                                />
                            </section>
                        </div>
                    </div>
                </section>
                <SiteFooter />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default AnalyzeVideoPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
