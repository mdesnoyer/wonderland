// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import T from '../../modules/translation';


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var IntegrationNotification = React.createClass({
    render: function() {
        var self = this;
        return (
            <nav className="wonderland-video__header navbar columns box">
                <div className="navbar-left column is-9">
                    <div className="navbar-item">
                        <h6 className="subtitle is-6">
                            {T.get('copy.integration.manualswitch')}
                        </h6>
                    </div>
                </div>
                <div className="navbar-right column is-3">
                    <div className="navbar-item has-text-centered">
                        <a className="wonderland-toggle button is-medium" onClick={self.toggleOpen}>
                            <i className="fa fa-chevron-circle-down" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
            </nav>
        );
    },
    toggleOpen: function() {
        var self = this;
        if (self.props.toggeleOpen) {
            self.props.toggeleOpen();
        }
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default IntegrationNotification

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
