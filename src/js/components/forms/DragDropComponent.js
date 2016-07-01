// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import Dropzone from 'react-dropzone'
import AjaxMixin from '../../mixins/Ajax';
import Account from '../../mixins/Account';
import reqwest from 'reqwest';
import SESSION from '../../modules/session';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var DragDropComponent = React.createClass({
        mixins: [AjaxMixin, Account],
        getInitialState: function() {
            var self = this;
            return {
                mode: 'silent', //silent/error/success/error/
            }
        },
        onDrop: function (files) {
            var self = this;
            debugger 
            self.setState({
                mode: 'loading'
            },
                self.formatData(files)
            );
        },
        formatData: function(files) {
            var self = this,
                formData = new FormData()
            ;
            files.forEach((file)=> {
                formData.append('upload', file)
            });
            self.sendFormattedData(formData);
        },
        sendFormattedData: function(formData) {
            var self = this,
                url = self.createUrl()
            ;
            reqwest({
              url: url,
              headers:{'Authorization': 'Bearer ' + SESSION.state.accessToken},
              method: 'POST',
              contentype: 'multipart/form-data',
              crossOrigin: true,
              processData : false,
              data : formData
            })
            .then(function(res) {
                console.log(res);
                self.setState({
                    mode:'success'
                }, setTimeout( 
                    self.setState({
                        mode:'silent'
                    }), 30)
                )
            }).catch(function(err) {
                if (err.status === 401) {
                    console.log(err);
                    self.grabRefreshToken(SESSION.state.refreshToken, formData)
                }
            });
        },
        createUrl: function() {
            return CONFIG.API_HOST + SESSION.state.accountId + '/thumbnails/'  
        },
        grabRefreshToken: function(refreshToken, formData) {
            var self = this; 
            reqwest({
                url: CONFIG.AUTH_HOST + 'refresh_token',
                data: JSON.stringify({
                    token : SESSION.state.refreshToken
                }),
                contentType: 'application/json',
                method: 'POST',
                crossDomain: true,
                type: 'json'
            })
                .then(function (res) {
                    SESSION.set(res.access_token, res.refresh_token, res.account_ids[0]);
                    self.sendFormattedData(formData)
                })
                .catch(function (err) {
                    SESSION.end();
                });
        },
        render: function () {
            var self = this,
                DropzoneContents
            ;
            switch(self.state.mode) {
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
                case 'success':
                    DropzoneContents = (
                        <span className="icon">
                            <i className="fa fa-check"></i>
                        </span>
                    );
                    break;
            }
            return (
                <div>
                    <Dropzone 
                        className="dragdrop box"
                        multiple={false}
                        accept="image/*"
                        activeClassName="dragdrop-active"
                        encType="multipart/form-data" 
                        onDrop={this.onDrop}
                    >
                        {DropzoneContents}
                    </Dropzone>
                </div>
            );
        }
    });

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default DragDropComponent;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -