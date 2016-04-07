// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import TermsOfService from './TermsOfService'

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var TermsOfServiceModal = React.createClass({

    render: function() {
        return (
            <div className="box">
                <TermsOfService />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default TermsOfServiceModal;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

