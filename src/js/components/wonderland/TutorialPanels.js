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
            <aside className="container">
                <div className="columns">
                    {Object.keys(panels).map(function(panel, idx) {
                        return <TutorialPanel key={idx} icon={panel} direction={panels[panel]}/>
                    }.bind(self))}
                </div>
            </aside>
        );
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default TutorialPanels;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
