// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var TestyMcTestComponent = React.createClass({
    render: function() {
        var self = this;
        return (
            <div className="tmtc">
                <h1 className="tmtc-content tmtc-title">{self.props.title}</h1>
                <p className="tmtc-content tmtc-body">{self.props.body}</p>
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default TestyMcTestComponent;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
