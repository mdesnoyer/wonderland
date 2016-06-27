// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import AjaxMixin from '../../mixins/Ajax';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideoLift = React.createClass({
    mixins: [AjaxMixin],
    propTypes: {
        thumbnails: React.PropTypes.array.isRequired
    },
    getInitialState: function() {
        return {
            mode: 'quiet', // quiet|error|loading|success
            lift: 0
        };
    },
    componentWillMount: function() {
        var self = this,
            baseId = '',
            thumbnailIds = ''
        ;
        self.props.thumbnails.forEach(function(thumbnail) {
            if (thumbnail.type === 'neon' && thumbnail.rank === 0) { // default top thumbnail
                thumbnailIds = thumbnail.thumbnail_id + ',';
            } else {
                baseId = thumbnail.thumbnail_id;
            }
        });
        self.setLift(thumbnailIds, baseId);
    },
    setLift: function(thumbnailIds, baseId) {
        var self = this;
        self.GET('statistics/estimated_lift', {
            data: {
                base_id: baseId,
                thumbnail_ids: thumbnailIds
            }
        })
        .then(function(json) {
            if (json.lift[1].lift === null) {
                self.setState({
                    mode: 'error'
                });
            }
            else {
                self.setState({
                    mode: 'success',
                    lift: UTILS.makePercentage(json.lift[1].lift, 0)
                });
            }
        })
        .catch(function(error) {
            console.log(error);
            self.setState({
                mode: 'error'
            });
        });
    },
    render: function() {
        var self = this,
            liftDisplay
        ;
        switch(self.state.mode) {
            case 'quiet':
                break;
            case 'error':
                liftDisplay = T.get('label.lift') + ' ' + T.get('copy.na');
                break;
            case 'loading':
                break;
            case 'success':
                liftDisplay = self.state.lift + ' ' + T.get('label.lift');
                break;
        }
        return (
            <aside className="box wonderland-box">
                <p>{liftDisplay}</p>
            </aside>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideoLift;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
