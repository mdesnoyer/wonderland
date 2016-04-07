// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import TutorialPanel from './TutorialPanel';
import UploadVideoForm from '../forms/UploadVideoForm';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var TutorialPanels = React.createClass({
    render: function() {
        //TODO ADD TRANSLATION STRINGS 
        var panels = {
            'youtube-play':'Find A Video You Would Like to Score',
            'files-o':'Copy & Paste Video Hyper-Link into the Upload Bar ',
            'upload': 'Click on the Upload Button',
            'eye': 'Watch the Results'
        }
        return (
            <div className="section">
                <div className="columns">
                    {Object.keys(panels).map(function(panel, idx) {
                        return <TutorialPanel key={idx} icon={panel} direction={panels[panel]}/>
                    }.bind(this))}
                </div>
                <section className="section">
                    <UploadVideoForm />
                </section>
            </div>
        );
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default TutorialPanels;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
