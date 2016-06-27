// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import TutorialPanel from './TutorialPanel';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var TutorialPanels = React.createClass({
    // mixins: [ReactDebugMixin],
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
