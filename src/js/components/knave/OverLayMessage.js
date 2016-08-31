// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';

import OverlayErrorFiles from './OverlayErrorFiles';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var OverLayMessage = React.createClass({
    render: function() {
        var self = this;
        var message = typeof self.props.overlayCode === 'number' ? 'general' : self.props.overlayCode
        return (
            <div>
                <section className="xxOverlay">
                    <div className="xxOverlay-content">
                    <h2 className="xxTitle">{T.get('uploadError.title.' + message )}</h2>
                    <h3 className="xxOnboardingSlide-description">{T.get('uploadError.msg.' + message)}</h3>
                    <OverlayErrorFiles errorFiles={self.props.errorFiles} />
                    <fieldset>
                            <button
                                className="xxButton xxButton--highlight"
                                type="button"
                                data-button-type="close"
                                onClick={self.handleClick}
                            >{'Got It!'}</button>
                    </fieldset>
                    </div>
                </section>
            </div>
        );
    },
    handleClick: function(e) {
        this.props.overlayReset(e);
    },
    propTypes: {
        overlayCode: React.PropTypes.string ,
        errorFiles: React.PropTypes.array
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default OverLayMessage

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
