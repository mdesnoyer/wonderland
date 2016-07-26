// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import T from '../../modules/translation';
import Icon from '../core/Icon';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var IntegrationNotification = React.createClass({
    render: function() {
        var self = this;
        return (
            <nav className="wonderland-video__header level columns box">
                <div className="level-left column is-9">
                    <div>
                        <p>
                            {T.get('copy.integration.manualswitch')}
                        </p>
                    </div>
                </div>
                <div>
                    <div>
                        <a className="wonderland-toggle button is-medium" onClick={self.toggleOpen}>
                            <Icon
                                type="chevron-circle-down"
                                nowrap={true}
                            />
                        </a>
                    </div>
                </div>
            </nav>
        );
    },
    toggleOpen: function() {
        var self = this;
        if (self.props.toggleOpen) {
            self.props.toggleOpen();
        }
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default IntegrationNotification

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
