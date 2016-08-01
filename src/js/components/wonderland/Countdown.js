import React from 'react';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';

export default class Countdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            seconds: parseInt(props.seconds || 1),
            classPrefix: props.classPrefix || 'xxOnboardingCountdown', 
            displayLoading: props.displayLoading || false
        };
    }

    componentDidMount() {
            this.setProcessingTimer();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            seconds: nextProps.seconds
        }, function() {
            this.setProcessingTimer()
        });
    }

    componentWillUnmount() {
        if (this.__processingTimer) {
            clearTimeout(this.__processingTimer);
        }
    }

    setProcessingTimer() {
        clearTimeout(this.__processingTimer);
        this.__processingTimer = setTimeout(() => {
            const { seconds } = this.state;

            if (seconds > 1) {
                this.setProcessingTimer();
            }
            else {
                if (this.props.onFinish) {
                    this.props.onFinish();
                }
            }
            if (seconds > 0) {
                this.setState({
                    seconds: seconds - 1
                });
            }
        }, 1000);
    }

    render() {
        var seconds = this.state.seconds,
            classPrefix = this.state.classPrefix,
            classPrefixLabel = classPrefix + '-label'
        ;
        if (this.state.seconds > 1) {
            return (
                <div className={classPrefix}>
                    <span className={classPrefixLabel}>
                        {
                            UTILS.formatTime(
                                Math.floor(seconds / 60),
                                Math.floor(seconds % 60),
                            )
                        }
                    </span>
                </div>
            )
        }
        else if (this.state.displayLoading) {
            if (this.state.seconds && this.state.seconds > 1) {  
                this.state.displayLoading = false;
            } 
            return (  
                <div className={classPrefix}>
                    <span className={classPrefixLabel}>
                        {
                            T.get('timer.loading')
                        }
                    </span>
                </div>
            )
        } 
        else {
            return (
                <div className={classPrefix}>
                    <span className={classPrefixLabel}>
                        {
                            T.get('timer.close')
                        }
                    </span>
                </div>
            )
        }
    }
};
