// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';
import CountdownClock from './CountdownClock';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default class Countdown extends React.Component {

    constructor(props) {
        super(props);
        const self = this;
        self.state = {
            seconds: parseInt(props.seconds || 1),
            classPrefix: props.classPrefix || 'xxOnboardingCountdown', 
            displayLoading: props.displayLoading || false
        };
    }

    componentDidMount() {
        const self = this;
        self.setProcessingTimer();
    }

    componentWillReceiveProps(nextProps) {
        const self = this;
        self.setState({
            seconds: nextProps.seconds
        }, function() {
            self.setProcessingTimer();
        });
    }

    componentWillUnmount() {
        const self = this;
        if (self.__processingTimer) {
            clearTimeout(self.__processingTimer);
        }
    }

    setProcessingTimer() {
        const self = this;
        clearTimeout(self.__processingTimer);
        self.__processingTimer = setTimeout(() => {
            const { seconds } = self.state;

            if (seconds > 1) {
                self.setProcessingTimer();
            }
            else {
                if (self.props.onFinish) {
                    self.props.onFinish();
                }
            }
            if (seconds > 0) {
                self.setState({
                    seconds: seconds - 1
                });
            }
        }, 1000);
    }

    render() {
        const self = this,
            seconds = self.state.seconds,
            classPrefix = self.state.classPrefix,
            classPrefixLabel = classPrefix + '-label'
        ;
        if (self.state.seconds > 1) {
            return (
                <CountdownClock
                    outerClass={classPrefix}
                    innerClass={classPrefixLabel}
                    displayValue={UTILS.formatTime(Math.floor(seconds / 60), Math.floor(seconds % 60))}
                />
            );
        }
        else if (self.state.displayLoading) {
            if (self.state.seconds && self.state.seconds > 1) {  
                self.state.displayLoading = false;
            } 
            return (
                <CountdownClock
                    outerClass={classPrefix}
                    innerClass={classPrefixLabel}
                    displayValue={T.get('timer.loading')}
                />
            );
        } 
        else {
            return (
                <CountdownClock
                    outerClass={classPrefix}
                    innerClass={classPrefixLabel}
                    displayValue={T.get('timer.almost')}
                />
            );
        }
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

