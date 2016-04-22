// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var Slide = React.createClass({
    propTypes: {
        icon: React.PropTypes.string.isRequired,
        slideContent: React.PropTypes.string.isRequired
    },
    render: function() {
        var self = this;  
            return (
                <div className="wonderland-slides-slide box is-fullwidth has-text-centered">
                    <p className="icon is-large ">
                        <i className={'fa fa-' + self.props.icon}></i>
                    </p>
                    <p><span dangerouslySetInnerHTML={{__html: self.props.slideContent}} /></p>
                </div>
            );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default Slide;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
