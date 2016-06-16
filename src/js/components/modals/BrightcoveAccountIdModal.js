// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import BrightcoveAccountIdContent from '../static/BrightcoveAccountIdContent';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var BrightcoveAccountIdModal = React.createClass({
    render: function() {
        return (
            <section className="box wonderland-box hero is-desktop">
                <div className="hero-body">
                    <div className="container">
                        <div className="content">
                            <BrightcoveAccountIdContent />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default BrightcoveAccountIdModal;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
