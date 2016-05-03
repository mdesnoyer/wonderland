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

var OnboardingButtons = React.createClass({

    render: function() {
        var self = this ;
        var buttons = self.props.buttonProps;
        return (
            <ul className="control">
                {Object.keys(buttons).map(function(button, idx) {
                    return <li><a className="button is-primary is-medium" href={buttons[button].action} key={idx}>{buttons[button].name}</a></li>
                }.bind(self))}
            </ul>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default OnboardingButtons;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
