// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import T from '../../modules/translation';
import FuzzyTime from '../core/FuzzyTime';
import AjaxMixin from '../../mixins/Ajax';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var ThumbnailInfoBox = React.createClass({
    mixins: [AjaxMixin], // ReactDebugMixin
    propTypes: {
        frameNo: React.PropTypes.number,
        type: React.PropTypes.string.isRequired,
        width: React.PropTypes.number,
        height: React.PropTypes.number,
        thumbnailId: React.PropTypes.string,
        created: React.PropTypes.string.isRequired,
        updated: React.PropTypes.string.isRequired
    },
    getInitialState: function() {
        return({
            ctr: T.get('copy.unknown')
        })
    },
    componentWillMount: function() {
        var self = this,
            options = {
                data: {
                    thumbnail_id: self.props.thumbnailId,
                    // Comma-separated string of fields to return. Can include
                    // serving_frac (the fraction of traffic seeing this
                    // thumbnail), ctr (the click-through rate), impressions
                    // (the number of impressions), conversions (the number
                    // of conversions), created, and updated.
                    fields: 'ctr'
                }
            }
        ;
        self.GET('statistics/thumbnails', options)
        .then(function(json) {
            var ctr = json.statistics[0].ctr; 
            self.setState({
                ctr: ctr ? UTILS.formatCtr(ctr) : T.get('copy.na')
            });
        })
        .catch(function(err) {
            // If this errors, we don't want to shout it. It can just
            // gracefully not work.
            console.log(err);
        });
    },
    render: function() {
        var self = this;
        return (
            <aside className="box">
                <dl className="wonderland-dl">
                    <dt
                        className={'wonderland-dt' + (self.props.frameNo > 0 ? '' : ' is-hidden')}
                        dangerouslySetInnerHTML={{__html: T.get('copy.frameNo')}}
                    />
                        <dd className={'wonderland-dd' + (self.props.frameNo > 0 ? '' : ' is-hidden')}>
                            {self.props.frameNo}
                        </dd>
                    <dt className="wonderland-dt">{T.get('copy.type')}</dt>
                        <dd className="wonderland-dd">{self.props.type}</dd>
                    <dt className="wonderland-dt">{T.get('copy.dimensions')}</dt>
                        <dd className="wonderland-dd">{self.props.width}x{self.props.height}</dd>
                    <dt className="wonderland-dt">{T.get('copy.thumbnailId')}</dt>
                        <dd className="wonderland-dd">{self.props.thumbnailId}</dd>
                    <dt className="wonderland-dt">{T.get('copy.created')}</dt>
                        <dd className="wonderland-dd">
                            <FuzzyTime date={self.props.created} />
                        </dd>
                    <dt className="wonderland-dt">{T.get('copy.updated')}</dt>
                        <dd className="wonderland-dd">
                            <FuzzyTime date={self.props.updated} />
                        </dd>
                    <dt
                        className="wonderland-dt"
                        dangerouslySetInnerHTML={{__html: T.get('copy.ctr')}}
                    />
                        <dd className="wonderland-dd">{self.state.ctr}</dd>
                </dl>
            </aside>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default ThumbnailInfoBox;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
