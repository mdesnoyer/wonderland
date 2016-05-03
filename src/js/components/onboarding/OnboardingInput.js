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
            <p className="control is-7">
                <input className="input"
                    onChange={this.changed}
                    placeholder={self.props.inputType}
                    style={self.props.style}
                />
           </p>
        );
    },
    changed: function(e){
        if(this.props.onChange) {
            // this.props.onChange({[this.props.inputType]: e.target.value});
            this.props.onChange(this.props.inputType, e.target.value);
        }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default OnboardingInput;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
