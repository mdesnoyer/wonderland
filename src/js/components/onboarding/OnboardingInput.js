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

var OnboardingInput = React.createClass({
    render: function() {
        var self = this ;
        return (
                <input className="input"
                    onChange={this.changed}
                    placeholder={self.props.inputType}
                    style={self.props.style} />
        );
    },
    changed: function(e){
        if(this.props.onChange) {
            this.props.onChange( e.target.value);
        }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default OnboardingInput;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
