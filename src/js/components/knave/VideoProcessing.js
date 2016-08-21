// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import Message from '../wonderland/Message';
import VideoDelete from './VideoDelete';
import T from '../../modules/translation';
import AjaxMixin from '../../mixins/Ajax';
import UTILS from '../../modules/utils';
import Countdown from '../wonderland/Countdown';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideoProcessing = React.createClass({
    mixins: [AjaxMixin],
    getInitialState: function() {
        return {
            maxVideoSize: UTILS.MAX_VIDEO_SIZE
        }
    },
    componentDidMount: function() {
        var self = this;
        if (self.props.videoState === 'processing' && !self.props.title && self.props.estimatedTimeRemaining >=0) {
            self.props.updateThumbnails();
        }
        else if (self.props.videoState === 'processing') {
            self.props.getVideoStatus();
        }
    },
    componentWillReceiveProps: function(nextProps) {
        var self = this;
        if (self.props.title !== nextProps.title && self.props.estimatedTimeRemaining !== nextProps.estimatedTimeRemaining) {
            self.props.getVideoStatus(self.props.videoId);
        }else if (self.props.videoState === 'processing' && !self.props.title && self.props.estimatedTimeRemaining >=0) {
           self.props.updateThumbnails();
        }else if (self.props.videoState !== nextProps.videoState){
            self.props.updateThumbnails();
        }
    },
    handleDeleteClick: function() {
        this.props.handleDeleteClick(self.props.videoId);
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
                    countdown = (
                        <span className="xxCollectionFilterCountdown">{T.get('timer.loading')}</span>
                    );
                }
                break;
        }
        if (self.state.isHidden) {
            return (<div></div>);
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
    propTypes: {
        title: React.PropTypes.string,
        videoState: React.PropTypes.string,
        estimatedTimeRemaining: React.PropTypes.number,
        seconds: React.PropTypes.number,
        updateThumbnails: React.PropTypes.func,
        getVideoStatus: React.PropTypes.func.isRequired,
        deleteVideo: React.PropTypes.func.isRequired
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideoProcessing;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
