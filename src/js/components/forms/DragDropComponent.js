// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import Dropzone from 'react-dropzone'
import AjaxMixin from '../../mixins/Ajax';
import UTILS from '../../modules/utils';
import Account from '../../mixins/Account';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var DragDropComponent = React.createClass({
        getInitialState: function() {
            var self = this;
            return {
                mode: 'silent' //silent/error/sucess/error/
            }
        },
        onDrop: function (files) {
            var self = this;
            self.setState({
                mode: 'loading'
            },
                self.sendFiles(files)
            ) 
        },
        sendFiles: function(files) {
            files.forEach((file)=> {
                    alert(file.name)
                })
        },
        render: function () {
            var self = this,
                DropzoneContents
            ; 

            switch(self.state.mode){
                case 'silent':
                    DropzoneContents = 'Try dropping some files here, or click to select files to upload.';
                    break;
                case 'loading':
                    DropzoneContents = (
                        <span className="icon">
                            <i className="fa fa-cog fa-spin"></i>
                        </span>
                    );
                break;
            }
            return (
                <div>
                    <Dropzone className="Dragdrop box" activeClassName="Dragdrop-active" onDrop={this.onDrop}>
                        {DropzoneContents}
                    </Dropzone>
                </div>
            );
        }
    });

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default DragDropComponent;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -