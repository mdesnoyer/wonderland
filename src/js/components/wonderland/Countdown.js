import React from 'react';
import UTILS from '../../modules/utils';

export default class Countdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            seconds: parseInt(props.seconds),
            classPrefix: props.classPrefix || 'xxOnboardingCountdown'
        };
    }

    componentDidMount() {
        this.setProcessingTimer();
    }

    componentWillUnmount() {
        if (this.__processingTimer) {
            clearTimeout(this.__processingTimer);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.state.seconds) {
            this.setState({
                seconds: nextProps.seconds
            }, function() {
                this.setProcessingTimer()
            });
        }
    }

    setProcessingTimer() {
        this.__processingTimer = setTimeout(() => {
            const { seconds } = this.state;

            if (seconds > 1) {
                this.setProcessingTimer();
            }
            else {
                this.props.onFinish();
            }
            this.setState({
                seconds: seconds - 1,
            });
        }, 1000);
    }

    render() {
        const { seconds, classPrefix } = this.state;
        let classPrefixLabel = classPrefix + 'label';
        if (this.props.seconds > 1) {
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
            );
        }
        else {
            return null;
        }
    }
};