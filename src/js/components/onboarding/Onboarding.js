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
        slideMin: OnboardingModule.onboardSet.slideMin,
        data:{}
       }
    },
    render: function() {
        var self = this,
            slides = self.state.presentationName.slides[self.state.slideProgress],
            buttons = slides.buttons ? <OnboardingButtons buttonProps={slides.buttons} onClick={self.handleDetermineSlide} /> : '',
            inputs = slides.inputs ? <OnboardingInputs inputProps={slides.inputs} onChange={self.gatherChange}/> : '',
            step = slides.step ? 'Step: ' + slides.step : ''
        ;
        return (
            <div className="box container">
                <progress className="progress is-small" value={self.calculateProgress()} max="100">15%</progress>
                <div className="columns">
                    <OnboardingNav onClick={self.handlePreviousClick} icon="fa fa-arrow-circle-o-left"/>
                    <section className="column is-8" >
                        <OnboardingSlide step={step} message={slides.message} />
                        <form onSubmit={this.handleSubmit}>
                            {inputs}
                            {buttons}
                        </form>
                    </section>
                    <OnboardingNav onClick={self.handleNextClick} icon="fa fa-arrow-circle-o-right"/>
                </div>
            </div>
        );
    },
    handleDetermineSlide: function(value){
        var self = this;
        if (self.state.presentationName.introSlide){
             self.setState({
                presentationName: OnboardingModule[value],
                slideMax: OnboardingModule[value].slideMax,
                slideMin: OnboardingModule[value].slideMin
             });
        }
    },
    handleSubmit: function(e){
        var self = this;
        e.preventDefault();
        self.setState(function(previousState, currentProps) {
            // return {slideProgress: previousState.slideProgress +1}
        })
    },
    gatherChange: function(type, value) {
        var self = this;
        self.setState({
            ["data"[type]]: value
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
        else if (!self.state.presentationName.introSlide){
            self.setState(self.getInitialState());
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
