// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import Dropzone from 'react-dropzone'
import AjaxMixin from '../../mixins/Ajax';
import UTILS from '../../modules/utils';
import Account from '../../mixins/Account';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var DragDropComponent = React.createClass({
        onDrop: function (files) {
            files.forEach((file)=> {
                alert(file.name)
            });
        },
        render: function () {
            return (
                <div>
                    <Dropzone className="Dragdrop box" activeClassName="Dragdrop-active" onDrop={this.onDrop}>
                        Try dropping some files here, or click to select files to upload.
                    </Dropzone>
                </div>
            );
        }
    });

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default DragDropComponent;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -