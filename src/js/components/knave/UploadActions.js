import React from 'react';

import UTILS from '../../modules/utils';
import T from '../../modules/translation';
import TRACKING from '../../modules/tracking';

import reqwest from 'reqwest';
import SESSION from '../../modules/session';

import Account from '../../mixins/Account';
import AjaxMixin from '../../mixins/Ajax';

import {AddActions, LoadActions, TagStore} from '../../stores/CollectionStores.js';

import VideoUploadOverlay from './VideoUploadOverlay';
import ImageUploadOverlay from './ImageUploadOverlay';
import ImageUploadPanel from './ImageUploadPanel';
import OverLayMessage from './OverLayMessage'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import cookie from 'react-cookie';
import accept from 'attr-accept';
import _ from 'lodash';
import Dropzone from 'react-dropzone';
import UploadProgressContainer from './UploadProgressContainer/';


export const UploadChooser = React.createClass({
    render: function() {
        return (
        	<div className="xxUploadTypes" key="upload-types">
        	    <a
        	        href=""
        	        className="xxUploadTypes-button xxUploadTypes-button--photo"
        	        onClick={this.props.handleOpenPhoto}
        	    ><span className="xxUploadTypes-buttonLabel">Photo</span></a>
        	    <a
        	        href=""
        	        className="xxUploadTypes-button xxUploadTypes-button--video"
        	        onClick={this.props.handleOpenVideo}
        	    ><span className="xxUploadTypes-buttonLabel">Video</span></a>
        	</div>
        );
    }
});


export const CollctionNameInput = React.createClass({
    render: function() {
        return (
        	<div className="xxFormField">
        	    <label className="xxLabel">{T.get('imageUpload.collectionName')}</label>
        	    <input
        	        ref="nameInput"
        	        className="xxInputText"
        	        placeholder={T.get('imageUpload.placeholderName')}
        	        type="text"
        	        value={this.props.collectionName}
        	        required
        	        onChange={e => this.props.updateField('collectionName', e.target.value)}
        	    />
        	    <div className="xxUploadDialog-block">
        	        <input
        	            className='xxButton xxButton--important'
        	            onClick={this.props.handleNameSubmit}
        	            type="submit"
        	            value={T.get('imageUpload.submit')}
        	        />
        	    </div>
        	</div>
        );
    }
});

export const CollectionSubmitButton = React.createClass({
    render: function() {
        return (
        	<div className="xxUploadDialog-block">
        	    <input
        	        data-send-tag={true}
        	        className={submitClassName.join(' ')}
        	        onClick={this.props.toggleOpen}
        	        type="submit"
        	        value={T.get('imageUpload.submit')}
        	    />
        	</div>
        );
    }
});


export const DesktopUploadButton = React.createClass({
    render: function() {
        return (
        	<button
        	    onClick={this.handleInputClick}
        	    className="xxButton xxButton--Chooser-Computer"
        	>
        	    <input
        	        disabled={this.props.photoUploadMode === 'loading'}
        	        id="file-input"
        	        type="file"
        	        multiple
        	        accept="image/*"
        	        onChange={this.props.sendLocalPhotos}
        	    />
        	</button>
        );
    }
});

export const DropBoxUploadButton = React.createClass({
    render: function() {
        return (
        	<button
        	    className="xxButton xxButton--Chooser-Dropbox"
        	    id="dropBoxSDK"
        	    disabled={this.props.photoUploadMode === 'loading'}
        	    onClick={this.props.grabDropBox}
        	></button>
        );
    }
});

export const UrlUploadButton = React.createClass({
    render: function() {
        return (
        	<div>
	        	<button 
	        		className="xxButton xxButton--Chooser-URL"
	        		onClick={this.handleUrlClick}>
	        	</button>
	        	<div className="xxCollectionAction-buttons">
	        	   <button className="xxButton xxButton--fullwidth xxButton--extra-margin-top" onClick={this.handleUrlClick}>Close</button>
	        	</div>
        	</div>
        );
    }
});

export const UrlUploadInput = React.createClass({
    render: function() {
        return (
        	<form className="xxFormField xxFormField--has-urlDrop" onSubmit={this.handleSubmit}>
        	    <input
        	        ref="url"
        	        className="xxInputText xxInputText--has-urlDrop"
        	        type="url"
        	        placeholder={T.get('image.URL')}
        	        required
        	    />
        	    <button className='xxButton xxButton--highlight xxButton--has-urlDrop'>
        	    Add URL
        	    </button>
        	</form>
        );
    }
});


export const DragAndDrop = React.createClass({	
    render: function() {
    	var props = this.props;
        return (
        	<div>
        		{
        			false ?  <UploadProgressContainer mode={this.props.photoUploadMode} {...props} /> : (
        	    	<div>
		        	    <div className="xxUploadDialog-block">
		        	    <Dropzone
		        	        className="xxDragAndDrop"
		        	        multiple={true}
		        	        disableClick={true}
		        	        activeClassName='xxDragAndDrop--has-dragAndDropHover'
		        	        encType="multipart/form-data"
		        	        onDrop={this.onDrop}
		        	    >
		        	         <ReactCSSTransitionGroup
		        	            transitionName="xxFadeInOutFast"
		        	            transitionEnterTimeout={UTILS.UPLOAD_TRANSITION}
		        	            transitionLeaveTimeout={UTILS.UPLOAD_TRANSITION}
		        	        >
		        	        <UploadProgressContainer mode={this.props.photoUploadMode} {...props} />
		        	        </ReactCSSTransitionGroup>
	        	    	</Dropzone>
		        	    </div>
	        	    	<div className="xxUploadDialog-block">
		    	        	<label className="xxLabel"> OR CHOOSE FROM </label>
		        	    </div>
	        	    </div>
        			)
        		}
    	    </div>
	    )
    },
    onDrop: function (files) {
        this.props.sendLocalPhotos(files);
    },
});



// export const XXXX = React.createClass({
//     render: function() {
//         return (
//         );
//     }
// });

// export const XXXX = React.createClass({
//     render: function() {
//         return (
//         );
//     }
// });


// export const XXXX = React.createClass({
//     render: function() {
//         return (
//         );
//     }
// });












