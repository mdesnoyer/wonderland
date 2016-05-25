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
            ctr: T.get('copy.unknown'),
            servingFrac: T.get('copy.unknown'),
            impressions: T.get('copy.unknown'),
            conversions: T.get('copy.unknown'),
            statsCreated: T.get('copy.unknown'),
            statsUpdated: T.get('copy.unknown')
        })
    },
    componentWillReceiveProps: function(nextProps) {
        var self = this;
        if (nextProps.thumbnailStats) {
            self.setState({
                ctr: nextProps.thumbnailStats.ctr,
                servingFrac: nextProps.thumbnailStats.servingFrac,
                impressions: nextProps.thumbnailStats.impressions,
                conversions: nextProps.thumbnailStats.conversions,
                statsCreated: nextProps.thumbnailStats.created,
                statsUpdated: nextProps.thumbnailStats.updated
            });
        }
    },
    render: function() {
        var self = this;
        return (
            <aside className="box wonderland-box">
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
                    {/*<dt className="wonderland-dt">Statistics</dt>*/}
                </dl>

                {/*<table className="table is-bordered is-striped is-narrow">
                    <tbody>
                        <tr>
                            <th dangerouslySetInnerHTML={{__html: T.get('copy.ctr')}} />
                            <td>{self.state.ctr}</td>
                        </tr>
                        <tr>
                            <th>Serving Fraction</th>
                            <td>{self.state.servingFrac}</td>
                        </tr>
                        <tr>
                            <td>Conversions</td>
                            <td>{self.state.conversions}</td>
                        </tr>
                        <tr>
                            <td>Impressions</td>
                            <td>{self.state.impressions}</td>
                        </tr>
                        <tr>
                            <td>Created</td>
                            <td>{self.state.statsCreated}</td>
                        </tr>
                        <tr>
                            <td>Updated</td>
                            <td>{self.state.statsUpdated}</td>
                        </tr>
                    </tbody>
                </table>*/}
            </aside>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ThumbnailInfoBox;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
