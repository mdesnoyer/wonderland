// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';
import Message from '../wonderland/Message'

import AjaxMixin from '../../mixins/Ajax';

import Dropzone from 'react-dropzone'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var ImageUploadPanel = React.createClass({
	render: function () {
		var self = this,
		    submitClassName = ['xxButton', 'xxButton--highlight'],
		    className = ['xxUploadDialog'],
		    dragDropClassKey,
		    dropzoneContent,
		    messageNeeded = self.props.error ? <Message message={self.props.error} type={'formError'}/> : null
	    ;
	    switch(self.props.photoUploadMode) {
	        case 'initial':
	            dragDropClassKey = 'hint';
	            dropzoneContent = <div>{T.get('imageUpload.draglocation')}<br/>{T.get('imageUpload.draglocation.directToLocal')}<br/></div>;
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
	            dropzoneContent = <div>{T.get('imageUpload.draglocation')}<br/>{T.get('imageUpload.collectionCount')}<br/></div>;
	    }
	    return (
	    	<div className="xxUploadDialog-drag-drop-panel">
	    		{messageNeeded}
	    		<Dropzone  
	    		    className="xxDragAndDrop"
	    		    multiple={true}
	    		    disableClick={false}
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
	    		<div className="xxCollectionAction-buttons">
	    		    <button
			            className="xxButton xxButton-cancel"
			            type="button"
			            data-action-label="info"
			            onClick={self.props.cancelClickHandler}
			            >{T.get('back')}</button>
	    		    <button
	    		        id="dropBoxSDK"
	    		        disabled={self.props.photoUploadMode === 'loading'}
	    		        className="xxButton xxButton-cancel xxButton--highlight"
	    		        onClick={self.props.grabDropBox}
	    		    >
	    		        Add Dropbox 
	    		    </button>
	            </div>
	            </div>
	    	</div>
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
        photoUploadThumbnailIds: React.PropTypes.array,
        numberUploadedCount: React.PropTypes.number,
        cancelClickHandler: React.PropTypes.func
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ImageUploadPanel

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -