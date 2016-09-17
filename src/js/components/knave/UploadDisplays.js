// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';
import Message from '../wonderland/Message'

import AjaxMixin from '../../mixins/Ajax';

import Dropzone from 'react-dropzone'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


export const InitialDisplay = React.createClass({
    render: function() {
        return (
        	<div className="xxDragAndDrop-content xxDragAndDrop-hint" key="drag-and-drop-hint">
        		{T.get('imageUpload.draglocation')}<br/>
                {T.get('imageUpload.collectionCount')}<br/>
        	</div>
        );
    }
});

export const MobileInitialDisplay = React.createClass({
    render: function() {
        return null
    }
});

export const LoadingDisplay = React.createClass({
    
    render: function() {
        var message = T.get('imageUpload.currentCount', {'@number': this.props.uploadingTotal }),
            errorMessage = T.get('imageUpload.UploadErrors.message', {'@number': this.props.errorFiles.length })
        ;
        return (
        	<div className="xxDragAndDrop-content xxDragAndDrop-progress" key="drag-and-drop-progress">
        		<span className="xxDragAndDrop-progressCounter">
        		    {`${Math.round((this.props.uploadedTotal) / this.props.uploadingTotal * 100)}%`}
        		</span>
                <span dangerouslySetInnerHTML={{__html: message}} /><br/>
                {
                    this.props.errorFiles.length > 0 ? (
                        <div>
                        <span dangerouslySetInnerHTML={{__html: errorMessage}} /><br/>
                        <button onClick={this.props.handleOpenMessageErrorFiles}>{T.get('imageUpload.UploadErrors.link')}</button>
                        </div>
                    ) : null
                }
        	</div>
        );
    }
});

export const MobileLoadingDisplay = React.createClass({
    render: function() {
        var message = T.get('imageUpload.currentCount', {'@number': this.props.uploadingTotal }),
            errorMessage = T.get('imageUpload.UploadErrors.message', {'@number': this.props.errorFiles.length })
        ;
        return (
        	<div className="xxUploadDialog-block">
        		<div className="xxDragAndDrop-spinner"></div>
        		<span dangerouslySetInnerHTML={{__html: message}} /><br/>
        		{
        			this.props.errorFiles.length > 0 ? (
                        <div>
        				<span dangerouslySetInnerHTML={{__html: errorMessage}} /><br/>
        				<button onClick={this.props.handleOpenMessageErrorFiles}>{T.get('imageUpload.UploadErrors.link')}</button>
                        </div>
        			) : null
    			}
        	</div>
        );
    }
});

export const SuccessDisplay = React.createClass({
    render: function() {
        var message = T.get('imageUpload.UploadCount', {'@number': this.props.uploadingTotal });
        return (
        	<div className="xxDragAndDrop-content xxDragAndDrop-complete" key="drag-and-drop-complete">
        		<span dangerouslySetInnerHTML={{__html: message}} /><br/>
        	</div>

        );
    }
});

export const MobileSuccessDisplay = React.createClass({
    render: function() {
        var message = T.get('imageUpload.UploadCount', {'@number': this.props.uploadingTotal });
        return (
        	<div className="xxUploadDialog-block">
        		<div className="xxDragAndDrop-success"></div>
        		{"Uploaded (" + this.props.uploadingTotal  + ") files" }<br/>
        	</div>
        );
    }
});


