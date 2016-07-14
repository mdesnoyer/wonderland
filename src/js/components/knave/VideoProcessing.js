// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import Message from '../wonderland/Message';
import VideoDelete from './VideoDelete';
import T from '../../modules/translation';
import AjaxMixin from '../../mixins/Ajax';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideoProcessing = React.createClass({
    mixins: [AjaxMixin],
    getInitialState: function() {
        return {
            isHidden: false
        }
    },
    render: function() {
        var self = this,
            title,
            errorMessage,
            deleteButton,
            errorMessageComponent
        ;
        errorMessage = self.props.duration >= 900 ? T.get('error.longVideo') : T.get('error.genericVideo');  
        switch (self.props.videoState) {
            case 'failed': 
                title = '';
                errorMessageComponent = <Message type="processing" message={errorMessage} />;
                deleteButton = (
                    <button
                        className="xxButton xxButton--delete-failed"
                        type="button"
                        onClick={self.handleDeleteClick}
                    >x</button>
                );
                break;
            case 'processing':
                title = self.props.title ? ' : ' + self.props.title : '';
                errorMessageComponent = '';
                deleteButton = '';
                break;
        }
        return (
            <div>
                { 
                    self.state.isHidden ? null : (
                        <article className="xxCollection xxCollection--video xxCollection--processing">
                            <h1 className="xxCollection-title">
                                {self.props.videoState.toUpperCase() + title}
                                {deleteButton}
                            </h1>
                            { 
                                self.props.error ? null : (
                                    <div>
                                        <a className="xxCollectionFilterToggle xxCollectionFilterToggle--countdown">
                                            <span>11:11</span>
                                        </a>
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
