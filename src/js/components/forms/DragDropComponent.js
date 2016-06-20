// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import Dropzone from 'react-dropzone'
import AjaxMixin from '../../mixins/Ajax';
import UTILS from '../../modules/utils';
import Account from '../../mixins/Account';
import reqwest from 'reqwest';
import SESSION from '../../modules/session';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var DragDropComponent = React.createClass({
        mixins: [AjaxMixin, Account],
        getInitialState: function() {
            var self = this;
            return {
                mode: 'silent', //silent/error/sucess/error/
            }
        },
        onDrop: function (files) {
            var self = this;
            self.setState({
                mode: 'loading'
            },
                self.formatData(files)
            )
        },
        formatData: function(files) {
            var self = this,
                formData = new FormData(),
                url = self.createUrl(),
                headers = self.createHeaders()
            ;

            debugger
            files.forEach((file)=> {
                formData.append('upload', file)
            })

            formData.append('Authorization', 'Bearer ' + SESSION.state.accessToken)

            ///send ajax data 
            debugger
            reqwest({
              url: url,
              headers:{'Authorization': 'Bearer ' + SESSION.state.accessToken},
              method: 'POST',
              contentype: 'multipart/form-data',
              crossOrigin: true,
              processData : false,
              data : formData
            })
            .then(res => {
                console.log(res);
                debugger
            }).catch(err => {
                console.log(err);
                debugger
            });

        },
        createUrl: function() {
            console.log(CONFIG.API_HOST + SESSION.state.accountId + '/thumbnails/')
            debugger 
            return CONFIG.API_HOST + SESSION.state.accountId + '/thumbnails/'  
        },
        createHeaders: function(){
            // var 
            // options.headers.Authorization = 'Bearer ' + self.Session.state.accessToken
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
                    <Dropzone className="Dragdrop box" activeClassName="Dragdrop-active" encType="multipart/form-data" onDrop={this.onDrop}>
                        {DropzoneContents}
                    </Dropzone>
                </div>
            );
        }
    });

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default DragDropComponent;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -