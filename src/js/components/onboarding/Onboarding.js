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
import OnboardingButtons from './OnboardingButtons';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var Onboarding = React.createClass({
    // mixins: [Secured], // ReactDebugMixin
    render: function() {
        var buttons = {
            button1:{
                name:"button1",
                action:"#"
            },
            button2:{
                name:"button2",
                action:"#"
            }
        }
        return (
            <div>
                <div className=" box container is-fluid">
                 <progress className="progress is-small" value="15" max="100">15%</progress>
                    <OnboardingButtons buttonProps={buttons} />
                </div>
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default Onboarding;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
