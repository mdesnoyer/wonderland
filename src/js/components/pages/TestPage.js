// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import Helmet from 'react-helmet';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import DragDropComponent from '../forms/DragDropComponent'
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var TermsPage = React.createClass({
	// mixins: [ReactDebugMixin],
    render: function() {
        return (
            <div>

                <SiteHeader />
                <section className="section">
                    <div className="columns is-desktop">
                        <div className="column is-half is-offset-one-quarter">
                            <div className="columns">
                                <div className="box column is-8 container is-fluid">
                                        <p className="control has-addons">
                                            <input className="input" placeholder="Enter your the image URL" />
                                            <a className="button is-success">Analyze</a>
                                        </p>
                                    <DragDropComponent />
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

export default TermsPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -