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
    getInitialState: function(){
        return {
            isNextClicked: false
        }
    },
    render: function() {
        var self = this,
            submitClassName = ['xxButton', 'xxButton--highlight'],
            className = ['xxUploadDialog'],
            dragDropClassKey,
            dropzoneContent,
            messageNeeded = self.props.error ? <Message message={self.props.error} type={'formError'}/> : null,
            isValid = self.props.photoUploadMode === 'initial' &&  self.props.photoUploadThumbnailIds.length > 0 && self.props.photoCollectionName !== '',
            instructions = self.props.photoCollectionName !== '' ? T.get('imageUpload.dragInstructions.two') : T.get('imageUpload.dragInstructions.one')
        ;
            if (isValid) { 
                submitClassName.push('xxButton--important');
                instructions = T.get('imageUpload.dragInstructions.three')
            }

        switch(self.props.photoUploadMode) {
            case 'initial':
                dragDropClassKey = 'hint';
                dropzoneContent = <div>{T.get('imageUpload.draglocation')}<br/>{"Each Collection can have up to 100 Images!"}<br/></div>;
                break;
            case 'loading':
                dragDropClassKey = 'progress';
                dropzoneContent = (
                    <div>
                        <span className="xxDragAndDrop-progressCounter">
                            {`${Math.round((self.props.numberUploadedCount) / self.props.photoUploadCount * 100)}%`}
                        </span>
                        {"Uploading (" + self.props.photoUploadCount + ") files."}<br/>
                        {self.props.photoErrorCount > 0 ? ("Unable to upload (" + self.props.photoErrorCount + ") files due to file type/size." ) : null}
                    </div>
                );
                break;
            case 'success': 
                dragDropClassKey = 'complete';
                dropzoneContent = <div>{"Uploaded (" + self.props.photoUploadCount + ") files" }<br/></div>;
                break; 
            default: 
                dragDropClassKey = 'hint';
                dropzoneContent = <div>{T.get('imageUpload.draglocation')}<br/>{"Each Collection can have up to 100 Images!"}<br/></div>;
        }
        return (
            <div className="xxUploadDialog">
                <div className="xxUploadDialog-drag-drop">
                    <div className="xxUploadDialog-intro">
                        <h2 className="xxTitle">{T.get('imageUpload.uploadImage')}</h2>
                    </div>
                    <div className="xxFormField">
                        <label className="xxLabel">{T.get('imageUpload.collectionName')}</label>
                        <input
                            className="xxInputText"
                            placeholder={T.get('imageUpload.placeholderName')}
                            type="text"
                            required
                            onChange={e => self.props.updateField('photoCollectionName', e.target.value)}
                        />
                    </div>
                    { self.state.isNextClicked ? (
                        <div>
                        <Dropzone  
                            className="xxDragAndDrop"
                            multiple={true}
                            disableClick={true}
                            activeClassName='xxDragAndDrop--has-dragAndDropHover'
                            encType="multipart/form-data" 
                            onDrop={self.onDrop}
                        >
                             <ReactCSSTransitionGroup 
                                transitionName="xxFadeInOutFast"
                                transitionEnterTimeout={UTILS.UPLOAD_TRANSITION} 
                                transitionLeaveTimeout={UTILS.UPLOAD_TRANSITION}
                            >
                                <div className={"xxDragAndDrop-content xxDragAndDrop-" + dragDropClassKey } key={"drag-and-drop-"+ dragDropClassKey}>
                                    {dropzoneContent}
                                </div>
                            </ReactCSSTransitionGroup>
                        </Dropzone>
                        <div className="xxUploadDialog-block">
                            <label className="xxLabel">{self.props.photoUploadThumbnailIds.length + " of 100 files uploaded" }</label>
                        </div>
                        <div className="xxUploadDialog-block">
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
                            <button className="xxButton xxButton-center" disabled >{T.get('imageUpload.or')}</button>
                            <button
                                id="dropBoxSDK"
                                disabled={self.props.photoUploadMode === 'loading'}
                                className="xxButton xxButton--highlight"
                                onClick={self.props.grabDropBox}
                            >{T.get('imageUpload.dropBox')}
                            </button>
                        </div>
                            { 
                                isValid ? (
                                    <div>
                                        <div className="xxUploadDialog-block">
                                            <label>{T.get('imageUpload.submitBelow')}</label>
                                        </div>
                                        <button
                                            className={submitClassName.join(' ')}
                                            type="button"
                                            onClick={isValid ? self.props.toggleOpen : null}
                                            data-send-tag={true}
                                            disabled={!isValid}
                                            >{'Submit Collection'}</button>
                                    </div>
                                ) : null
                            }
                        </div> 
                        ) : (
                        <button
                            disabled={self.props.photoCollectionName === ''}
                            onClick={self.handleClick} 
                            className={submitClassName.join(' ')} 
                            type="button"
                        >{T.get('action.next')}</button>
                        )
                    }
                    </div>
            </div>
        );
    },
    handleClick: function() {
        var self = this;
        if (self.props.photoCollectionName !== '' ) {
            self.setState({ isNextClicked: true});    
        }
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
