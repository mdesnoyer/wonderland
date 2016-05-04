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

var OnboardingSlide = React.createClass({
    render: function() {
        var self = this;
        return (
        	<div className="column tile is-parent">
        	  <article className="tile is-child">
        	    <p className="title">{self.props.step}</p>
        	    <p className="subtitle">{self.props.message}</p>
        	  </article>
        	</div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default OnboardingSlide;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




