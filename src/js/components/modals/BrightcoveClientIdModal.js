// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import BrightcoveClientIdContent from '../static/BrightcoveClientIdContent';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var BrightcoveClientIdModal = React.createClass({
    render: function() {
        return (
            <section className="box wonderland-box hero is-desktop">
                <div className="hero-body">
                    <div className="container">
                        <div className="content">
                            <BrightcoveClientIdContent />
                            <p>Learn about why we need these permissions <a href="/support/#brightcove-plugin-guide">here</a>.</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default BrightcoveClientIdModal;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


