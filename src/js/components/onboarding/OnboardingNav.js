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

var OnboardingNav = React.createClass({

    render: function() {
        var self = this ;
        return (
        	<a className="column is-2" onClick={self.clicked}>
        	    <span className="icon is-large">
        	        <i className={self.props.icon} aria-hidden="true"></i>
        	    </span>
        	</a>
        );
    },
    clicked: function(e){
        if(this.props.onClick) {
            this.props.onClick(true);
        }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default OnboardingNav;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

