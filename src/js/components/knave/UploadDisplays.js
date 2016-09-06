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
        return (
        	<div className="xxDragAndDrop-content xxDragAndDrop-progress" key="drag-and-drop-progress">
        		<span className="xxDragAndDrop-progressCounter">
        		    {`${Math.round((this.props.numberUploadedCount) / this.props.photoUploadCount * 100)}%`}
        		</span>
        		{"Uploading (" + this.props.photoUploadCount + ") files."}<br/>
        		{
        			this.props.photoErrorCount > 0 ? (
                        <div>
        				{"To view the (" + this.props.photoErrorCount + ") error file(s) click "}
                        <a onClick={this.props.handleOpenMessageErrorFiles}>here</a>
                        </div>
        				) : null
				}
        	</div>
        );
    }
});

export const MobileLoadingDisplay = React.createClass({
    render: function() {
        return (
        	<div className="xxUploadDialog-block">
        		<div className="xxDragAndDrop-spinner"></div>
        		{"Uploading (" + this.props.photoUploadCount + ") files."}<br/>
        		{
        			this.props.photoErrorCount > 0 ? (
                        <div>
        				{this.props.photoErrorCount + " files with errors."}
        				<button onClick={this.props.handleOpenMessageErrorFiles}>View Errors</button>
                        </div>
        			) : null
    			}
        	</div>
        );
    }
});

export const SuccessDisplay = React.createClass({
    render: function() {
        return (
        	<div className="xxDragAndDrop-content xxDragAndDrop-complete" key="drag-and-drop-complete">
        		{"Uploaded (" + this.props.photoUploadCount + ") files" }<br/>
        	</div>

        );
    }
});

export const MobileSuccessDisplay = React.createClass({
    render: function() {
        return (
        	<div className="xxUploadDialog-block">
        		<div className="xxDragAndDrop-success"></div>
        		{"Uploaded (" + this.props.photoUploadCount  + ") files" }<br/>
        	</div>
        );
    }
});


