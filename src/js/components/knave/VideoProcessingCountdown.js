// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideoProcessingCountdown = React.createClass({
    getInitialState: function() {
        return {
            seconds: parseInt(this.props.seconds)
        }
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({
            seconds: nextProps.seconds
        }, function() {
            this.setProcessingTimer()
        });
    },
    setProcessingTimer: function() {
        this.__processingTimer = setTimeout(() => {
            const { seconds } = this.state;

            if (seconds > 1) {
                this.setProcessingTimer();
            }
            if (seconds > 0) {
                this.setState({
                    seconds: seconds - 1
                });
            }
        }, 1000);
    },
    render: function() {
        var seconds = this.state.seconds
        switch(true) {
            case (this.state.seconds > 1):
                return (
                    <div className="xxCollectionFilterToggle xxCollectionFilterToggle--countdown">
                        <span className="xxCollectionFilterToggle-label">
                            {
                                UTILS.formatTime(
                                    Math.floor(seconds / 60),
                                    Math.floor(seconds % 60),
                                )
                            }
                        </span>
                    </div>
                );
                break;
            default:
                return null;
        }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideoProcessingCountdown;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
