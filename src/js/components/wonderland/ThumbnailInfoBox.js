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
        updated: React.PropTypes.string.isRequired,
        thumbnailStats: React.PropTypes.object
    },
    getInitialState: function() {
        return({
            ctr: T.get('copy.unknown')
        })
    },
    componentWillReceiveProps: function(nextProps) {
        var self = this;
        if (nextProps.thumbnailStats && nextProps.thumbnailStats.hasOwnProperty('ctr')) {
            if (nextProps.thumbnailStats.ctr !== self.state.ctr) {
                self.setState({
                    ctr: nextProps.thumbnailStats.ctr
                });
            }
        }
    },
    render: function() {
        var self = this;
        return (
            <aside className="box">
                <dl className="wonderland-dl">
                    <dt
                        className={'wonderland-dt' + (self.props.frameNo > 0 ? '' : ' is-hidden')}
                        dangerouslySetInnerHTML={{__html: T.get('copy.frame')}}
                    />
                        <dd className={'wonderland-dd' + (self.props.frameNo > 0 ? '' : ' is-hidden')}>
                            {self.props.frameNo}
                        </dd>
                    <dt className="wonderland-dt">{T.get('copy.type')}</dt>
                        <dd className="wonderland-dd">{self.props.type}</dd>
                    <dt className="wonderland-dt">{T.get('copy.dimensions')}</dt>
                        <dd className="wonderland-dd">{self.props.width}x{self.props.height}</dd>
                    <dt className="is-hidden wonderland-dt">{T.get('copy.thumbnailId')}</dt>
                        <dd className="is-hidden wonderland-dd">{self.props.thumbnailId}</dd>
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
                        <dd className="wonderland-dd">{UTILS.formatCtr(self.state.ctr)}</dd>
                </dl>
            </aside>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ThumbnailInfoBox;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
