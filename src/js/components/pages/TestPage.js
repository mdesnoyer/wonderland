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
                            <DragDropComponent />
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