import React from 'react';
import UTILS from '../../modules/utils';

export default class Countdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            seconds: props.seconds,
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

    setProcessingTimer() {
        this.__processingTimer = setTimeout(() => {
            const { seconds } = this.state;

            if (seconds > 1) {
                this.setProcessingTimer();
            } else {
                this.props.onFinish();
            }

            this.setState({
                seconds: seconds - 1,
            });
        }, 1000);
    }

    render() {
        const { seconds } = this.state;
        const {spanStyle, divStyle}; 
        switch(self.props.type) {
            case 'processing':
                divStyle = "xxCollectionFilterToggle xxCollectionFilterToggle--countdown";
                spanStyle = "xxCollectionFilterToggle-label";
                break;
            default
                divStyle = "xxOnboardingCountdown";
                spanStyle = "xxOnboardingCountdown-label";
        }
        // className="xxCollectionFilterToggle xxCollectionFilterToggle--countdown"
        return (
            <div className={divStyle}>
                <span className={spanStyle}>
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
};