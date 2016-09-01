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
    // propTypes: {
    // },
    render: function() {
        return (
        	<div className="xxDragAndDrop-content xxDragAndDrop-hint" key="drag-and-drop-hint">
        		{T.get('imageUpload.draglocation')}<br/>
        	</div>
        );
    }
});

export const MobileInitialDisplay = React.createClass({
    // propTypes: {
    // },
    render: function() {
        return (
        	<div className="xxDragAndDrop-content xxDragAndDrop-hint" key="drag-and-drop-hint">
        		{T.get('imageUpload.draglocation')}<br/>
        	</div>
        );
    }
});


export const LoadingDisplay = React.createClass({
    // propTypes: {
    // 	numberUploadedCount:
    // 	photoErrorCount:,
    // 	handleOpenMessageErrorFiles:,
    // 	photoUploadCount: 
    // },
    render: function() { 
        return (
        	<div className="xxDragAndDrop-content xxDragAndDrop-progress" key="drag-and-drop-progress">
        		<span className="xxDragAndDrop-progressCounter">
        		    {`${Math.round((100) / 100 * 100)}%`}
        		</span>
        		{"Uploading (" + this.props.photoUploadCount + ") files."}<br/>
        		{
        			this.props.photoErrorCount > 0 ? (
                        <div>
        				{"Unable to upload (" + 100 + ") files due to file type/size. You can view these files by clicking"}
        				<a onClick={this.props.handleOpenMessageErrorFiles}>here</a> 
                        </div>
        				) : null
				}
        	</div>
        );
    }
});


export const MobileLoadingDisplay = React.createClass({
    // propTypes: {
    // 	photoErrorCount:,
    // 	handleOpenMessageErrorFiles:,
    // 	photoUploadCount:
    // },
    render: function() {
        return (
        	<div className="xxDragAndDrop-content xxDragAndDrop-progress" key="drag-and-drop-progress">
        		<div className="xxDragDrop-spinner"></div>
        		{"Uploading (" + this.props.photoUploadCount + ") files."}<br/>
        		{
        			this.props.photoErrorCount > 0 ? (
                        <div> 
        				{"Unable to upload (" + this.props.photoErrorCount + ") files due to file type/size."}
        				<button onClick={this.props.handleOpenMessageErrorFiles}>View Errors</button> 
                        </div>
        			) : null 
    			}
        	</div>
        );
    }
});


export const SuccessDisplay = React.createClass({
    // propTypes: {
    // 	photoUploadCount: 
    // },
    render: function() {
        return (
        	<div className="xxDragAndDrop-content xxDragAndDrop-complete" key="drag-and-drop-complete">
        		{"Uploaded (" + self.props.photoUploadCount + ") files" }<br/>;
        	</div>
        	
        );
    }
});


export const MobileSuccessDisplay = React.createClass({
    // propTypes: {
    // 	photoUploadCount:
    // },
    render: function() {
        return (
        	<div className="xxDragAndDrop-content xxDragAndDrop-progress" key="drag-and-drop-progress">
        		<div className="xxDragDrop-success"> fa-check </div>

        		{"Uploading (" + this.props.photoUploadCount + ") files."}<br/>
        	</div>
        );
    }
});


