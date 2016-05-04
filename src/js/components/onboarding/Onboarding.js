// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import UTILS from '../../modules/utils';
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
            onboardPath: OnboardingModule.onboardSet,
            slideProgress: 0,
            slideMax: OnboardingModule.onboardSet.slideMax,
            slideMin: OnboardingModule.onboardSet.slideMin,
            dataTypes: OnboardingModule.onboardSet.dataTypes,
            slideResponse: false
       }
    },
    render: function() {
        var self = this,
            slides = self.state.onboardPath.slides[self.state.slideProgress],
            buttons = (slides.buttons && !self.state.slideResponse) ? <OnboardingButtons buttonProps={slides.buttons} onClick={self.handleClick} /> : '',
            inputs = slides.inputs ? <OnboardingInputs inputProps={slides.inputs} onChange={self.handleChange}/> : '',
            step = slides.step ? 'Step: ' + slides.step : ''
        ;
        return (
            <div className="box container">
                <progress className="progress is-small" value={self.calculateProgress()} max="100">15%</progress>
                <div className="columns">
                    <OnboardingNav
                        onClick={self.handlePreviousClick}
                        type="left"
                        progress={self.state.slideProgress}
                        barrier={self.state.slideMin}
                        intro={self.state.onboardPath.introSlide}
                    />
                    <section className="column is-8" >
                        <OnboardingSlide step={step} message={self.state.slideResponse ? self.state.slideResponse : slides.message} />
                        <form onSubmit={this.handleSubmit}>
                            {inputs}
                            {buttons}
                        </form>
                    </section>
                    <OnboardingNav
                        onClick={self.handleNextClick}
                        type="right"
                        progress={self.state.slideProgress}
                        intro={self.state.onboardPath.introSlide}
                        barrier={self.state.slideMax}
                    />
                </div>
            </div>
        );
    },
    handleClick: function(value, response, type, extraContent){
        var self = this;
        if (self.state.onboardPath.introSlide){
             self.setState({
                onboardPath: OnboardingModule[value],
                slideMax: OnboardingModule[value].slideMax,
                slideMin: OnboardingModule[value].slideMin,
                dataTypes: OnboardingModule[value].dataTypes || ''
             });
        }
        else if(type === "button"){
            response = extraContent === "true" ? response.split(',') : response
            self.setState({
                slideResponse: response
            })
        }
    },
    handleSubmit: function(e){
        var self = this;
        e.preventDefault();
        self.ajaxData(self.gatherDataFromInputs());
    },
    ajaxData: function(data){
        var self = this;
        alert("DATA MOCK SEND");
        self.moveProgress(1);
    },
    gatherDataFromInputs: function() {
        var self = this,
            data = {},
            p = self.state.dataTypes
        ;
        for (var i = 0; i < p.length; i++) {
            var dataType = p[i]
            data[dataType] = self.state[dataType]
        }
        return data;
    },
    handleChange: function(type, value) {
        var self = this;
        self.setState({
            [type]:value
        });
    },
    handleNextClick: function(){
        var self = this;
        if (self.state.slideProgress < self.state.slideMax) {
            self.moveProgress(1);
        }
    },
    handlePreviousClick: function(){
        var self = this;
        if (self.state.slideProgress > self.state.slideMin) {
            self.moveProgress(-1);
        }
        else if (!self.state.onboardPath.introSlide){
            self.setState(self.getInitialState());
        }
    },
    moveProgress: function(increment){
        var self = this; 
        self.setState(function(previousState,currentProps) {
            return {
                slideProgress: previousState.slideProgress + increment,
                slideResponse: false
            }
        });
    },
    calculateProgress: function(){
        var self = this;
        return (self.state.slideProgress / self.state.slideMax) * 100;
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Onboarding;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
