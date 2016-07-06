// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import DragDropComponent from '../forms/DragDropComponent';
import DropBoxHolder from './DropBoxHolder';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var ImageUpload = React.createClass({
    render: function() {
        var self = this;
        return (
            <div className="box drop-container">
                <p className="subtitle is-3">TODO Image Source</p>
                <DropBoxHolder />
                <DragDropComponent />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ImageUpload;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
