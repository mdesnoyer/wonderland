// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import Message from '../wonderland/Message';
import VideoDelete from './VideoDelete';
import T from '../../modules/translation';
import AjaxMixin from '../../mixins/Ajax';
import UTILS from '../../modules/utils';
import Countdown from '../wonderland/Countdown';
import { LoadActions } from '../../stores/CollectionStores.js';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideoProcessing = React.createClass({

    // TODO factor this and VideoCollection's
    // A reference to a setTimeout/setInterval for monitoring
    // the state of a processing video.
    processingMonitor: null,

    propTypes: {
        title: React.PropTypes.string,
        videoState: React.PropTypes.string,
        estimatedTimeRemaining: React.PropTypes.number,
        duration: React.PropTypes.number,
        deleteVideo: React.PropTypes.func.isRequired,
    },

    componentDidMount: function() {
        this.setProcessingMonitor();
    },

    componentWillUpdate: function() {
        this.setProcessingMonitor();
    },

    componentWillUnmount: function() {
        this.clearProcessingMonitor();
    },

    setProcessingMonitor: function() {
        const tagId = this.props.tagId;
        if (!tagId) {
            // This must be the VideoOwner's VideoProcessing.
            return;
        }
        const monitorFunction = LoadActions.loadTags.bind(null, [tagId], this.props.selectedDemographic[0], this.props.selectedDemographic[1]);

        if (this.props.estimatedTimeRemaining > 10) {
            this.clearProcessingMonitor();
            const timeout = 1000 * this.props.estimatedTimeRemaining;
            setTimeout(monitorFunction, timeout);
            return;
        }

        // Only set one setInterval per video.
        if(this.processingMonitor) {
            return;
        }

        // Let's set a monitor until the video is out of processing.
        const interval = 1000 * 10;
        this.processingMonitor = setInterval(monitorFunction, interval);
    },

    clearProcessingMonitor: function() {
        if (this.processingMonitor !== null) {
            clearInterval(this.processingMonitor);
            this.processingMonitor = null;
        }
    },

    handleDeleteClick: function() {
        this.props.deleteVideo(this.props.videoId);
    },

    render: function() {
        var self = this,
            title,
            errorMessage,
            deleteButton,
            errorMessageComponent,
            isError,
            seconds,
            estimatedTimeRemaining,
            countdown = null,
            collectionClassName = ['xxCollection', 'xxCollection--video']
        ;
        errorMessage = self.props.duration >= UTILS.MAX_VIDEO_SIZE ? T.get('error.longVideo') : T.get('error.genericVideo');
        switch (self.props.videoState) {
            case 'failed':
                title = 'Oops';
                errorMessageComponent = <Message type="processing" message={errorMessage} />;
                deleteButton = (
                    <button
                        className="xxButton xxButton--delete-failed"
                        type="button"
                        onClick={self.handleDeleteClick}
                    >
                        <img
                            src="/img/xx/close.png"
                            alt={T.get('action.close')}
                            title={T.get('action.close')}
                        />
                    </button>
                );
                isError = true;
                seconds = 1;
                collectionClassName.push('xxCollection--failed');
                break;
            case 'processing':
                title = self.props.title;
                errorMessageComponent = '';
                deleteButton = '';
                isError = false;
                seconds = self.props.seconds;
                estimatedTimeRemaining = self.props.estimatedTimeRemaining;
                collectionClassName.push('xxCollection--processing');
                if (estimatedTimeRemaining !== null && estimatedTimeRemaining >= 1) {
                    countdown = (<Countdown
                        seconds={estimatedTimeRemaining}
                        classPrefix="xxCollectionFilterCountdown"
                    />);
                }
                else {
                    countdown = <span className="xxCollectionFilterCountdown">{T.get('timer.loading')}</span>;
                }
                break;
        }
        return (
            <div>
                <article className={collectionClassName.join(' ')}>
                    <h1 className="xxSubtitle">{self.props.videoState}</h1>
                    <h1 className="xxCollection-title">
                        {title}
                        {deleteButton}
                    </h1>
                    {
                        isError ? null : (
                            <div className="xxCollectionFilters">
                                <div className="xxCollectionFilterToggle xxCollectionFilterToggle--countdown"></div>
                                <span>{countdown}</span>
                            </div>
                        )
                    }
                    {errorMessageComponent}
                </article>
            </div>
        )
    },
});

export default VideoProcessing;
