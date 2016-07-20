// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import Message from '../wonderland/Message';
import VideoDelete from './VideoDelete';
import T from '../../modules/translation';
import AjaxMixin from '../../mixins/Ajax';
import Countdown from '../wonderland/Countdown';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideoProcessing = React.createClass({
    mixins: [AjaxMixin],
    getInitialState: function() {
        return {
            maxVideoSize: 900
        }
    },
    componentWillMount: function() {
        var self = this;
        self.GET('limits')
            .then(function(res) {
                self.setState({
                    maxVideoSize: res.max_video_size
                })
            })
            .catch(function(err) {
            })
    },
    render: function() {
        var self = this,
            title,
            errorMessage,
            deleteButton,
            errorMessageComponent,
            isError,
            seconds
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
                    >x</button>
                );
                isError = true;
                seconds = 1;
                break;
            case 'processing':
                title = self.props.title;
                errorMessageComponent = '';
                deleteButton = '';
                isError = false;
                seconds = self.props.seconds;
                break;
        }
        return (
            <div>
                {
                    self.state.isHidden ? null : (
                        <article className="xxCollection xxCollection--video xxCollection--processing">
                            <h1 className="xxSubtitle">PROCESSING</h1>
                            <h1 className="xxCollection-title">
                                {title}
                                {deleteButton}
                            </h1>
                            {
                                isError ? null : (
                                    <div>
                                        <Countdown seconds={self.props.seconds} type="processing" onFinish={false} />
                                        <div className="xxCollectionFilters">
                                            <strong className="xxCollectionFilters-title">Filters</strong>
                                            <span className="xxCollectionFilters-value">None</span>
                                        </div>
                                    </div>
                                )
                            }
                            {errorMessageComponent}
                        </article>
                    )
                }
            </div>
        );
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
