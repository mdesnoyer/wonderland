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
    componentWillMount: function() {
        var self = this;
        self.GET('limits')
            .then(function(res) {
                self.setState({
                    maxVideoSize: res.max_video_size || UTILS.MAX_VIDEO_SIZE
                })
            })
            .catch(function(err) {
            })
    },
    componentWillReceiveProps: function(nextProps) {
    }, 
    render: function() {
        var self = this,
            title,
            errorMessage,
            deleteButton,
            errorMessageComponent,
            isError,
            seconds,
            timeRemaining, 
            countdown = null,
            collectionClassName = ['xxCollection', 'xxCollection--video']
        ;
        errorMessage = self.props.duration >= self.state.maxVideoSize ? T.get('error.longVideo') : T.get('error.genericVideo');
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
                timeRemaining = self.props.timeRemaining;
                collectionClassName.push('xxCollection--processing');
                if (timeRemaining !== null && timeRemaining >= 1) {  
                    countdown = (<Countdown 
                        seconds={timeRemaining}
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
    handleDeleteClick: function() {
        var self = this, options = {}
        ;
        options.data = {
            video_id: self.props.videoId,
            hidden: true
        }
        self.PUT('videos', options)
            .then(function(res) {
                self.setState({
                    isHidden:true
                });
            })
            .catch(function(err) {
                console.log(err);
            });
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideoProcessing;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
