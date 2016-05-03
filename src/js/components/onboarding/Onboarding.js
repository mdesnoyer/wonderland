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
import OnboardingInput from './OnboardingInput';
import OnboardingInputs from './OnboardingInputs';
import OnboardingNav from './OnboardingNav';
import OnboardingModule from './OnboardingModule';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Onboarding = React.createClass({
    // mixins: [Secured], // ReactDebugMixin
    getInitialState: function(){
       return {
        presentationName: OnboardingModule.onboardSet,
        slideProgress: 0,
        slideMax: OnboardingModule.onboardSet.slideMax,
        slideMin: OnboardingModule.onboardSet.slideMin
       }
    },
    render: function() {
        var self = this,
            slides = self.state.presentationName.slides[self.state.slideProgress],
            buttons = slides.buttons ? <OnboardingButtons buttonProps={slides.buttons}/> : '',
            inputs = slides.inputs ? <OnboardingInputs inputProps={slides.inputs} /> : ''
        ;
        return (
            <div>
                <div className="box container">
                    <progress className="progress is-small" value={self.calculateProgress()} max="100">15%</progress>
                    <div className="columns">
                        <OnboardingNav onClick={self.handlePreviousClick} icon="fa fa-arrow-circle-o-left"/>
                        <section className="column is-8" >
                            <OnboardingSlide message={slides.message} stepMessageNumber={self.state.slideProgress}/>
                            <form onSubmit={this.handleSubmit}>
                                {inputs} 
                                {buttons}
                            </form>
                        </section>
                        <OnboardingNav onClick={self.handleNextClick} icon="fa fa-arrow-circle-o-right"/>
                    </div>
                </div>
            </div>
        );
    },
    handleSubmit: function(e){
        var self = this;
        e.preventDefault();
        self.setState(function(previousState,currentProps) {
            return {slideProgress: previousState.slideProgress +1}
        })
    },
    gatherChange: function(type, value) {
        var self = this;
        self.setState({
            [type]:value
        });
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
