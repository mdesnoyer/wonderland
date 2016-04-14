// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import TutorialPanel from './TutorialPanel';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var TutorialPanels = React.createClass({
    propTypes: {
        panels: React.PropTypes.object.isRequired
    },
    render: function() {
        var self = this,
            panels = self.props.panels
        ;
        return (
            <div className="section">
                <div className="columns">
                    {Object.keys(panels).map(function(panel, idx) {
                        return <TutorialPanel key={idx} icon={panel} direction={panels[panel]}/>
                    }.bind(self))}
                </div>
            </div>
        );
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default TutorialPanels;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
