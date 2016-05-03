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
import OnboardingInput from './OnboardingInput';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var OnboardingInputs = React.createClass({

    render: function() {
        var self = this ;
        var inputs = self.props.inputProps;
        return (
            <p className="control">
                {Object.keys(inputs).map(function(input, idx) {
                    return <OnboardingInput className="button is-primary" inputType={self.props.inputType} key={idx} />
                }.bind(self))}
            </p>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default OnboardingInputs;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
