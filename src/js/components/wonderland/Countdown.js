import React from 'react';
import UTILS from '../../modules/utils';

export default class Countdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            seconds: parseInt(props.seconds || 1),
            classPrefix: props.classPrefix || 'xxOnboardingCountdown'
        };
    }

    componentDidMount() {
        if (this.props.onFinish) {
            this.setProcessingTimer();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.onFinish) {
            this.setState({
                seconds: nextProps.seconds
            }, function() {
                this.setProcessingTimer()
            });
        }
    }

    componentWillUnmount() {
        if (this.__processingTimer) {
            clearTimeout(this.__processingTimer);
        }
    }

    setProcessingTimer() {
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
        if (this.props.type === 'processing') {
            classPrefix = "xxCollectionFilterToggle xxCollectionFilterToggle--countdown"
            classPrefixLabel = "xxCollectionFilterToggle-label"
        }
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
            )
        }
        else if (this.props.seconds === null) {
            return (
                <a className={divStyle}>
                    <span className={spanStyle}>
                        {
                            "Loading..."
                        }
                    </span>
                </a>
            )
        }
        else { 
            return null; 
        }
    }
};
