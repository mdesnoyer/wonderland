// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import T from '../../modules/translation';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';
import Secured from '../../mixins/Secured';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var NeonscopePage = React.createClass({
    mixins: [Secured], // ReactDebugMixin
    render: function() {
        return (
            <div>
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.neonscope.title'))}
                />
                <SiteHeader />
                <section className="section">
                    <div className="container">
                        <h1 className="title is-2">{T.get('copy.neonscope.heading')}</h1>
                        <div className="content">
                            <p><span dangerouslySetInnerHTML={{__html: T.get('copy.neonscope.body')}} /></p>
                        </div>
                    </div>
                </section>
                <SiteFooter />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default NeonscopePage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
