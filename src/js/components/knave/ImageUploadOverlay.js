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
        var self = this,
            submitClassName = ['xxButton', 'xxButton--highlight'],
            className = ['xxUploadDialog'],
            messageNeeded = self.props.error ? <Message message={self.props.error} type={'formError'}/> : null,
            dropzoneContent,
            isValid = self.props.photoUploadMode === 'initial' &&  self.props.photoUploadThumbnailIds.length > 0 && self.props.photoCollectionName !== '',
            instructions = self.props.photoCollectionName !== '' ? T.get('imageUpload.dragInstructions') : "First Let's name your photo collection"
        ;
            if (isValid) { 
                submitClassName.push('xxButton--important');
                instructions = "You can continue uploading files to this collection. When you are done press submit below."
            }

        switch(self.props.photoUploadMode) {
            case 'initial': 
                dropzoneContent = (
                    <div className="xxDragAndDrop-content xxDragAndDrop-hint" key="drag-and-drop-hint">
                        {T.get('imageUpload.draglocation')}<br />
                        {T.get('imageUpload.folders')}<br />
                        {self.props.photoUploadThumbnailIds.length + "/100 uploaded" }
                    </div>
                );
                break;
            case 'loading': 
                dropzoneContent = (
                    <div className="xxDragAndDrop-content xxDragAndDrop-progress" key="drag-and-drop-progress">
                        <span className="xxDragAndDrop-progressCounter">
                            {`${Math.round((self.props.numberUploadedCount) / self.props.photoUploadCount * 100)}%`}
                        </span>
                        {"Uploading (" + self.props.photoUploadCount + ") files."}
                        <br/>
                        {
                            self.props.photoErrorCount > 0 ? ("Unable to upload (" + self.props.photoErrorCount + ") files due to file type/size." ) : null    
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
                        {T.get('imageUpload.draglocation')}<br />
                        {T.get('imageUpload.folders')}
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
                        <h2 className="xxTitle">{T.get('imageUpload.uploadImage')}</h2>
                        <p>{instructions}</p>
                        <p>{messageNeeded}</p>
                    </div>
                    <div className="xxFormField">
                        <label className="xxLabel">{T.get('imageUpload.collectionName')}</label>
                        <input
                            className="xxInputText"
                            type="text"
                            required
                            onChange={e => self.props.updateField('photoCollectionName', e.target.value)}
                        />
                    </div>
                    { 
                        self.props.photoCollectionName !== '' ? (
                            <div>
                            <div className="xxFormField">
                                <label className="xxLabel">{T.get('imageUpload.chooseSource')}</label>
                                <div className="xxButton xxButton--uploadDialog xxButton--highlight xxButton--file">
                                    {T.get('imageUpload.local')}
                                    <input
                                        disabled={self.props.photoUploadMode === 'loading'}
                                        type="file"
                                        name="upload"
                                        multiple
                                        accept= "image/*"
                                        className="xxButton-fileInput"
                                        onChange={self.props.sendLocalPhotos}
                                    />
                                </div>
                                <button 
                                    id="dropBoxSDK"
                                    disabled={self.props.photoUploadMode === 'loading'}
                                    className="xxButton xxButton--uploadDialog xxButton--highlight"
                                    onClick={self.props.grabDropBox}
                                >
                                {T.get('imageUpload.dropBox')}
                                </button>
                            </div>
                            <button
                                className={submitClassName.join(' ')}
                                type="button"
                                onClick={self.props.toggleOpen}
                                data-send-tag={true}
                                // disabled={!isValid}
                            >{T.get('upload.submit')}</button>
                            </div>
                            ) : null 
                        
                    }
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
        // previewArray: React.PropTypes.arrayOf(React.PropTypes.object)
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ImageUploadOverlay;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
