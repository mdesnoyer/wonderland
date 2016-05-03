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
            {
                message: "Please select which platform you use",
                buttons: {            
                    button1:{
                        name:"BrightCove",
                        action:"#"
                    },
                    button2:{
                        name:"Other platform",
                        action:"#"
                    },
                    button3:{
                        name:"No Platform",
                        action:"#"
                    }
                } 
            }, 
            {
                message: "Please Enter Your BrightCove Tokens",
                buttons: {            
                    button1:{
                        name:"Submit Tokens",
                        action:"#"
                    }
                }
            },
            {
                message: "Do you use bright cove thumbnails ?",
                buttons: {            
                    button1:{
                        name:"Yes",
                        action:"#"
                    },
                    button2:{
                        name:"No",
                        action:"#"
                    }
                }
            },
            {
                message: "Which Player Type do you Use?",
                buttons: {            
                    button1:{
                        name:"Smart Player",
                        action:"#"
                    },
                    button2:{
                        name:"HTMl5 Player",
                        action:"#"
                    }
                }
            },
            {
                message: "Thanks For the INFO!!"
            }
        ];
        var buttons = slides[self.state.slideProgress].buttons ? <OnboardingButtons buttonProps={slides[self.state.slideProgress].buttons}/> : ''; 
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
                            <OnboardingSlide message={slides[self.state.slideProgress].message} stepMessageNumber={self.state.slideProgress}/>
                            {buttons}
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
        // buttons: {            
        //     button1:{
        //         name:"BrightCove",
        //         action:"#"
        //     }
        // }
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