// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import ReactDOM from 'react-dom';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';
import Message from '../wonderland/Message'

import AjaxMixin from '../../mixins/Ajax';

import Dropzone from 'react-dropzone'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import UploadProgressContainer from './UploadProgressContainer/';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var ImageUploadOverlay = React.createClass({
    getInitialState: function() {
        return {
            isNextClicked: false
        }
    },
    componentDidMount: function() {
        window.addEventListener('keydown', this.handleKeyEvent);
        // Put focus in the form name input when opening.
        const node = ReactDOM.findDOMNode(this.refs.nameInput);
        if(node) {
            node.focus();
        }
    },

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyEvent);
    },

    handleKeyEvent(e) {
        // Enter nexts.
        const self = this;
        var isValid = self.props.photoUploadMode === 'initial' &&  self.props.photoUploadThumbnailIds.length > 0 && self.props.photoCollectionName !== '';
        if (e.keyCode === 13) {
            if (this.state.isNextClicked && isValid) {
                e.target.dataset.sendTag = true;
                self.props.toggleOpen(e);
            } else {
                self.handleClick();
            }
        }
    },
    render: function() {
        const isMobile = window.outerWidth < 768;
        var self = this,
            submitClassName = ['xxButton', 'xxButton--highlight'],
            className = ['xxUploadDialog'],
            dragDropClassKey,
            dropzoneContent,
            messageNeeded = self.props.error ? <Message message={self.props.error} type={'formError'}/> : null,
            isValid = self.props.photoUploadMode === 'initial' &&  self.props.photoUploadThumbnailIds.length > 0 && self.props.photoCollectionName !== ''
        ;
            if (isValid) {
                submitClassName.push('xxButton--important');
            };
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
                        {self.props.photoErrorCount > 0 ? ("Unable to upload (" + self.props.photoErrorCount + ") files due to file type/size." ) : null}<br/>
                        You can view these files by clicking <a onClick={self.props.handleOpenMessageErrorFiles}>here</a>  
                    </div>
                );
                break;
            case 'success': 
                dragDropClassKey = 'complete';
                dropzoneContent = <div>{"Uploaded (" + self.props.photoUploadCount + ") files" }<br/></div>;
                break; 
            default: 
                dragDropClassKey = 'hint';
                dropzoneContent = <div>{T.get('imageUpload.draglocation')}<br/>{T.get('imageUpload.collectionCount')}<br/></div>;
        }
        return (
            <div className="xxUploadDialog">
                <div className="xxUploadDialog-drag-drop">
                    <div className="xxUploadDialog-intro">
                        <h2 className="xxTitle">{T.get('imageUpload.uploadImage')}</h2>
                        <h2>{messageNeeded}</h2>
                    </div>
                    <div className="xxFormField">
                        <label className="xxLabel">{T.get('imageUpload.collectionName')}</label>
                        <input
                            ref="nameInput"
                            className="xxInputText"
                            placeholder={T.get('imageUpload.placeholderName')}
                            type="text"
                            value={self.props.photoCollectionName}
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
                                        
                                    <UploadProgressContainer mode="success" />
                                    
                                    </ReactCSSTransitionGroup>
                                </Dropzone>
                                <div className="xxUploadDialog-block">
                                <label className="xxLabel"> OR CHOOSE FROM </label>
                                </div>
                                <div className="xxUploadButtonsChooser"> 
                                    <button 
                                        className="xxButton xxButton--Chooser-Dropbox"
                                        id="dropBoxSDK"
                                        disabled={self.props.photoUploadMode === 'loading'}
                                        onClick={self.props.grabDropBox}
                                    ></button>
                                    <button 
                                        onClick={self.handleInputClick}
                                        className="xxButton xxButton--Chooser-Computer"
                                    >
                                        <input
                                            disabled={self.props.photoUploadMode === 'loading'}
                                            id="file-input"
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={self.props.sendLocalPhotos}
                                        />
                                    </button>
                                </div>
                                <div className="xxUploadButtonsChooser">
                                <label className="xxLabel">Dropbox</label> 
                                <label className="xxLabel">Desktop</label> 
                                </div>
                            <div className="xxUploadDialog-block">
                                <label className="xxLabel">{self.props.photoUploadThumbnailIds.length + " of 100 files uploaded" }</label>
                            </div>
                            { 
                                isValid ? (
                                    <div>
                                        <div className="xxUploadDialog-block">
                                            <label>{T.get('imageUpload.submitBelow')}</label>
                                        </div>
                                        <input
                                            data-send-tag={true}
                                            className={submitClassName.join(' ')}
                                            onClick={isValid ? self.props.toggleOpen : null}
                                            disabled={!isValid}
                                            type="submit"
                                            value='Submit Collection'
                                        />
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
                            >
                                {T.get('action.next')}
                            </button>
                        )
                    }
                    </div>
            </div>
        );
    },
    handleInputClick: function() {
        document.getElementById("file-input").click();
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
        photoUploadThumbnailIds: React.PropTypes.array,
        numberUploadedCount: React.PropTypes.number
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ImageUploadOverlay;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


// <div className="xxButton xxButton--uploadDialog xxButton--highlight xxButton--file">
// {T.get('imageUpload.local')}
//     <input
//         disabled={self.props.photoUploadMode === 'loading'}
//         type="file"
//         name="upload"
//         multiple
//         accept= "image/*"
//         className="xxButton-fileInput"
//         onChange={self.props.sendLocalPhotos}
//     />
// </div>
// <button className="xxButton xxButton-center" disabled >
//     {T.get('imageUpload.or')}
// </button>
// <button
//     id="dropBoxSDK"
//     disabled={self.props.photoUploadMode === 'loading'}
//     className="xxButton xxButton--highlight"
//     onClick={self.props.grabDropBox}
// >
//     {T.get('imageUpload.dropBox')}
// </button>

