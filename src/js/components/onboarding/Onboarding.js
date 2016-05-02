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
import OnboardingSlide from './OnboardingSlide';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var Onboarding = React.createClass({
    // mixins: [Secured], // ReactDebugMixin
    getInitialState: function(){
       return {
        slideProgress: 0,
        slideMax: 4,
        slideMin: 0
       } 
    },
    render: function() {
        var self = this; 

        var slides = [ 
            {message: "Please select which platform you use"}, 
            {message: "Please Enter Your BrightCove Tokens"},
            {message: "Do you use bright cove thumbnails ?"},
            {message: "Which Player Type do you Use?"},
            {message: "Thanks For the INFO!!"}

        ]
        return (
            <div>
                <div className="box container">
                    <progress className="progress is-small" value={self.calculateProgress()} max="100">15%</progress>
                    <div className="columns">
                        <a className="column is-2 button" onClick={self.handlePreviousClick}>
                            <span className="icon">
                              <i className="fa fa-arrow-circle-o-left" aria-hidden="true"></i>
                            </span>
                        </a>
                        <div className="column is-8">
                            <OnboardingSlide message={slides[self.state.slideProgress].message}/>
                            
                        </div>
                        <a className="column is-2 button" onClick={self.handleNextClick}>
                            <span className="icon">
                                <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        );
    },
    handleNextClick: function(){
        var self = this;
        if (self.state.slideProgress < self.state.slideMax) {
            self.setState(function(previousState,currentProps) {
                return {slideProgress: previousState.slideProgress + 1}
            })
        }
    },
    handlePreviousClick: function(){
        var self = this;
        if (self.state.slideProgress > self.state.slideMin) {
            self.setState(function(previousState,currentProps) {
                return {slideProgress: previousState.slideProgress -1}
            })
        }
    },
    calculateProgress: function(){
        var self = this;
        return (self.state.slideProgress / self.state.slideMax) * 100 
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default Onboarding;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 






//     slideOne: {
//         message: "Please select which platform you use",
//         buttons: {            
//             button1:{
//                 name:"BrightCove",
//                 action:"#"
//             }
//         }
//     },
//     slideTwo:{
//         message: "Do you use bright cove thumbnails ?",
//         buttons: {            
//             button1:{
//                 name:"Yes",
//                 action:"#"
//             },
//             button2:{
//                 name:"No",
//                 action:"#"
//             }
//         }
//     }
// }]