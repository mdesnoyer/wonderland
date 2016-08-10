// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';
import Message from '../wonderland/Message'

import AjaxMixin from '../../mixins/Ajax';

import Dropzone from 'react-dropzone'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var ImageUploadOverlay = React.createClass({
    mixins: [AjaxMixin],
    getInitialState: function() {
        return {
            dragHover: false,
            photos: false
        }
    },
    componentWillMount: function() { 
        var self = this;
        if (self.props.error) {
            self.setState({ isMessageNeeded: true });
        }
    },
    componentWillUnmount: function() {
        var self = this;
        self.setState({ isMessageNeeded: false });
    },
    render: function() {
        const { isOnboarding } = this.props;
        var self = this,
            submitClassName = ['xxButton', 'xxButton--highlight'],
            className = ['xxUploadDialog']
            // messageNeeded = self.state.isMessageNeeded ? <Message message={self.props.error} type={'formError'}/> : null
        ;
        // if (isValid) {
        //     submitClassName.push('xxButton--important');
        // }
        return (
            <Dropzone 
                className={'xxUploadDialog'}
                multiple={true}
                disableClick={true}
                accept="image/*"
                activeClassName='has-dragAndDropHover'
                encType="multipart/form-data" 
                onDrop={this.onDrop}
            >
                <div className="xxDragAndDrop">
                    <ReactCSSTransitionGroup transitionName="xxFadeInOutFast" transitionEnterTimeout={200} transitionLeaveTimeout={200}>
                        <div className="xxDragAndDrop-content xxDragAndDrop-hint" key="drag-and-drop-hint">
                            Drag and Drop your image(s) here.<br />
                            Sorry, no folders.
                        </div>
                    </ReactCSSTransitionGroup>
                </div>
                <div className="xxUploadDialog-inner">
                    <div className="xxUploadDialog-intro">
                        <h2 className="xxTitle">Upload Your Images</h2>
                        <p>You can drag and drop your images into the window. Or you can use the buttons below to browse your device or Dropbox account.</p>
                    </div>
                    <div className="xxFormField">
                        <label className="xxLabel">Choose Image Source</label>
                        <div className="xxButton xxButton--uploadDialog xxButton--highlight xxButton--file">
                            Local
                            <input
                                type="file"
                                multiple
                                className="xxButton-fileInput"
                                onChange={self.sendLocalPhotos}
                            />
                        </div>
                        <button
                            className="xxButton xxButton--uploadDialog xxButton--highlight"
                            onClick={e => self.setState({photos: true})}
                        >Dropbox</button>
                    </div>
                    <button
                        className={submitClassName.join(' ')}
                        type="button"
                    >Submit</button>
                </div>
            </Dropzone>
        );
    },
    sendLocalPhotos: function(e) {
        var self = this, 
            files = e.target.files,
            fileArray = []
        ;
        for (var i = 0, file; file = files[i]; i++) {
            fileArray.push(file);
        }
        self.formatData(fileArray)
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
               debugger
               files.forEach((file)=> {
                   formData.append('upload', file)
               });
               debugger 
               self.sendFormattedData(formData);
   },
   sendFormattedData: function(formData) {
              var self = this;
              self.POST('thumbnails', {
                  contentType: 'multipart/form-data',
                  data: formData
              })
                  .then(function (res) {
                      console.log(res);
                      self.setState({
                          mode:'success'
                      }, setTimeout( 
                          self.setState({
                              mode:'silent'
                          }), 30)
                      )
                  })
                  .catch(function (err) {
                      // TODO: Handle error
                      console.log(err);
                  });
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ImageUploadOverlay;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
