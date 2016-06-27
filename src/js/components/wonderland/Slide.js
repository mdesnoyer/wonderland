// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import Icon from '../core/Icon';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Slide = React.createClass({
    // mixins: [ReactDebugMixin],
    propTypes: {
        icon: React.PropTypes.string.isRequired,
        slideContent: React.PropTypes.string.isRequired
    },
    render: function() {
        var self = this;  
            return (
                <div className="wonderland-slides-slide box is-fullwidth has-text-centered">
                    <p className="icon is-large">
                        <Icon
                            type={self.props.icon}
                            nowrap={true}
                        />
                    </p>
                    <p><span dangerouslySetInnerHTML={{__html: self.props.slideContent}} /></p>
                </div>
            );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Slide;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
