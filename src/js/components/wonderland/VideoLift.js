// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import SESSION from '../../modules/Session';
import AjaxMixin from '../../mixins/Ajax';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideoLift = React.createClass({
    mixins: [AjaxMixin],
    propTypes: {
        thumbnails: React.PropTypes.array.isRequired
    },
    getInitialState: function() {
        return {
            lift: 0
        };
    },
    getLift: function() {
        var self = this,
            account_id = SESSION.state.accountId,
            base_id = '',
            thumbnail_ids = ''
        ;
        self.props.thumbnails.forEach(function(thumbnail) {
            if (thumbnail.type === 'neon') {
                thumbnail_ids += thumbnail.thumbnail_id + ',';
            } else {
                base_id = thumbnail.thumbnail_id;
            }
        });
        self.GET('/' + account_id + '/statistics/estimated_lift', {
            host: CONFIG.AUTH_HOST,
            data: {
                account_id: account_id,
                base_id: base_id,
                thumbnail_ids: thumbnail_ids
            }
        })
        .then(function(json) {
            console.log('working');
            // self.setState({
            //     lift: json.lift * 100
            // });
        })
        .catch(function(error) {
            console.log(error);
        });
    },
    render: function() {
        var self = this;

        self.getLift();

        return (
            <aside className="box wonderland-box">
                <p>{self.state.lift}% Lift</p>
            </aside>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideoLift;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
