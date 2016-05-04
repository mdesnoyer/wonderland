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
        var self = this
        if((self.props.barrier === self.props.progress &&  self.props.intro) || (self.props.barrier > 0 && self.props.intro) || ( self.props.barrier > 0 && self.props.barrier === self.props.progress)) {
            return <a className="column is-2"></a>;
        }
        else{
            return (
            	<a className="column is-2" onClick={self.clicked}>
            	    <span className="icon is-large">
            	        <i className={"fa fa-arrow-circle-o-" + self.props.type} aria-hidden="true"></i>
            	    </span>
            	</a>
            );
        }
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

