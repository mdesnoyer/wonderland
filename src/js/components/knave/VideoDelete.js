// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import AjaxMixin from '../../mixins/Ajax';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideoDelete = React.createClass({
    mixins: [AjaxMixin],
    render: function() {
        var self = this;
        return (
            <div className="xxCollectionAction">
                <h2 className="xxTitle">{T.get('copy.videoContent.delete.title')}</h2>
                <p>{T.get('copy.videoContent.delete')}</p>
                <div className="xxCollectionAction-buttons">
                    <button
                        className="xxButton"
                        type="button"
                        data-action-label="info"
                        onClick={self.props.handleMenuChange}
                        >{T.get('cancel')}</button>
                    <button
                        className="xxButton xxButton--highlight"
                        type="button"
                        onClick={self.handleDeleteClick}
                    >{T.get('delete')}</button>
                </div>
            </div>
        );
    },
    handleDeleteClick: function(e) {
        var self = this, options = {}
        ;
        options.data = {
            video_id: self.props.videoId,
            hidden: true
        }
        self.PUT('videos', options)
            .then(function(res) {
                self.props.handleDelete();
            })
            .catch(function(err) {
                console.log(err);
            });
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideoDelete;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
