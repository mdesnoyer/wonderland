// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Xylophone = React.createClass({
	// mixins: [ReactDebugMixin],
    render: function() {
        var self = this;
        return (
            <div className="wonderland-xylophone">
                <div
                    className="wonderland-xylophone__slot is-dummy"
                >
                    <div
                        style={{'height': '100%'}}
                        key="dummy"
                        className="wonderland-xylophone__bar is-dummy">
                    </div>
                </div>
                {
                    self.props.thumbnails.map(function(thumbnail, i) {
                        var neonScoreData = UTILS.getNeonScoreData(thumbnail.neon_score),
                            inlineStyle = {'height': neonScoreData.neonScore + '%'}
                        ;
                        var rating;
                        // 0 - 59 : red
                        // 60 - 84 : orange
                        // 85 - 99 : green
                        if (neonScoreData.neonScore < 60) {
                            rating = 'bad';
                        }
                        else if (neonScoreData.neonScore < 85) {
                            rating = 'ok';
                        }
                        else {
                            rating = 'good';
                        }
                        return (
                            <div
                                className="wonderland-xylophone__slot"
                                key={thumbnail.thumbnail_id}
                            >
                                <div
                                    style={inlineStyle}
                                    className={UTILS.buildTooltipClass('wonderland-xylophone__bar is-' + rating + (thumbnail.enabled ? '' : ' is-disabled'), 'top')}
                                    aria-label={T.get('copy.neonScoreEquals', {
                                        '@neonscore': neonScoreData.neonScore
                                    })}
                                >
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Xylophone;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
