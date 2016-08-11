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
    render: function() {
        const { isOnboarding } = this.props;
        var self = this,
            submitClassName = ['xxButton', 'xxButton--highlight'],
            className = ['xxUploadDialog'],
            messageNeeded = self.props.error ? <Message message={self.props.error} type={'formError'}/> : null,
            dropzoneContent,
            isValid = self.props.photoUploadMode === 'initial' &&  self.props.photoUploadThumbnailIds.length > 0 && self.props.photoCollectionName !== '';
            
            if (isValid) { submitClassName.push('xxButton--important');}
        ;
        // initial, loading, success
        switch(self.props.photoUploadMode) {
            case 'initial': 
                dropzoneContent = (
                    <div className="xxDragAndDrop-content xxDragAndDrop-hint" key="drag-and-drop-hint">
                        Drag and Drop your image(s) here.<br />
                        Sorry, no folders.
                    </div>
                );
                break;
            case 'loading': 
                dropzoneContent = (
                    <div className="xxDragAndDrop-content xxDragAndDrop-progress" key="drag-and-drop-progress">
                        {"Uploading (" + self.props.photoUploadCount + ") files."}
                        <br/>
                        {
                            self.props.photoErrorCount > 0 ? ("Unable to upload (" + self.props.photoErrorCount + ") files due to file type." ) : null    
                        }
                    </div>
                );
                break;
            case 'success': 
                dropzoneContent = (
                    <div className="xxDragAndDrop-content xxDragAndDrop-complete" key="drag-and-drop-complete">
                        {"Uploaded (" + self.props.photoUploadCount + ") files"}
                    </div>
                );
                break; 
            default: 
                dropzoneContent = (
                    <div className="xxDragAndDrop-content xxDragAndDrop-hint" key="drag-and-drop-hint">
                        Drag and Drop your image(s) here.<br />
                        Sorry, no folders.
                    </div>
                );
        }
        return (
            <Dropzone 
                className={'xxUploadDialog'}
                multiple={true}
                disableClick={true}
                activeClassName='has-dragAndDropHover'
                encType="multipart/form-data" 
                onDrop={self.onDrop}
            >
                <div className="xxDragAndDrop">
                    <ReactCSSTransitionGroup transitionName="xxFadeInOutFast" transitionEnterTimeout={200} transitionLeaveTimeout={200}>
                        {dropzoneContent}
                    </ReactCSSTransitionGroup>
                </div>
                <div className="xxUploadDialog-inner">
                    <div className="xxUploadDialog-intro">
                        <h2 className="xxTitle">Upload Your Images</h2>
                        <p>You can drag and drop your images into the window. Or you can use the buttons below to browse your device or Dropbox account.</p>
                        {messageNeeded}
                    </div>
                    <div className="xxFormField">
                        <label className="xxLabel">Collection Name</label>
                        <input
                            className="xxInputText"
                            type="text"
                            required
                            onChange={e => self.props.updateField('photoCollectionName', e.target.value)}
                        />
                    </div>
                    <div className="xxFormField">

                        <label className="xxLabel">Choose Image Source</label>
                        <div className="xxButton xxButton--uploadDialog xxButton--highlight xxButton--file">
                            Local
                            <input
                                type="file"
                                multiple
                                accept= "image/*"
                                className="xxButton-fileInput"
                                onChange={self.props.sendLocalPhotos}
                            />
                        </div>
                        <button id="dropBoxSDK"
                            className="xxButton xxButton--uploadDialog xxButton--highlight"
                            onClick={self.props.grabDropBox}
                        >
                        Dropbox
                        </button>
                    </div>
                    <button
                        className={submitClassName.join(' ')}
                        type="button"
                        onClick={isValid ? self.props.toggleOpen : null}
                        data-generate-tab={true}
                        disabled={!isValid}
                    >Submit</button>
                </div>
            </Dropzone>
        );
    },
    onDrop: function (files) {
        var self = this;
        self.props.formatData(files);
    },
    propTypes: {
        error: React.PropTypes.string, 
        key: React.PropTypes.func,
        formatData: React.PropTypes.func,
        grabDropBox: React.PropTypes.func,
        sendLocalPhotos: React.PropTypes.func,
        sendFormattedData: React.PropTypes.func,
        toggleOpen: React.PropTypes.func,
        photoUploadMode: React.PropTypes.string,
        photoUploadCount: React.PropTypes.number,
        photoErrorCount: React.PropTypes.number,
        updateField: React.PropTypes.func,
        photoCollectionName: React.PropTypes.string,
        photoUploadThumbnailIds: React.PropTypes.array
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ImageUploadOverlay;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
