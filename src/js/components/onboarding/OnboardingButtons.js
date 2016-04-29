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
            <p className="control">
                {Object.keys(buttons).map(function(button, idx) {
                    return <a className="button is-primary" href={buttons[button].action} key={idx}>{buttons[button].name}</a>
                }.bind(self))}
            </p>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default OnboardingButtons;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
