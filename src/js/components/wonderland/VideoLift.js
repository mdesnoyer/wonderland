// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import SESSION from '../../modules/Session';
import T from '../../modules/Translation';
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
            //     lift: json.lift * 100,
            // });
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
                liftDisplay = self.state.lift + '% ' + T.get('label.lift');
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
