// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var LoadingText = React.createClass({
    render: function() {
        return (
            <div>
                {T.get('action.loading')}
                <span className="loadingText">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                </span>
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default LoadingText;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
