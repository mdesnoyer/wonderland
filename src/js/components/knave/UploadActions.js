
export const UploadChooser = React.createClass({
    render: function() {
        return (
        	<div className="xxUploadTypes" key="upload-types">
        	    <a
        	        href=""
        	        className="xxUploadTypes-button xxUploadTypes-button--photo"
        	        onClick={this.handleOpenPhoto}
        	    ><span className="xxUploadTypes-buttonLabel">Photo</span></a>
        	    <a
        	        href=""
        	        className="xxUploadTypes-button xxUploadTypes-button--video"
        	        onClick={this.handleOpenVideo}
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
        	        value={this.props.photoCollectionName}
        	        required
        	        onChange={e => this.props.updateField('photoCollectionName', e.target.value)}
        	    />
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
        	        onClick={self.props.toggleOpen}
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
        );
    }
});

export const DropBoxUploadButton = React.createClass({
    render: function() {
        return (
        	<button
        	    className="xxButton xxButton--Chooser-Dropbox"
        	    id="dropBoxSDK"
        	    disabled={self.props.photoUploadMode === 'loading'}
        	    onClick={self.props.grabDropBox}
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
	        		onClick={self.handleUrlClick}>
	        	</button>
	        	<div className="xxCollectionAction-buttons">
	        	   <button className="xxButton xxButton--fullwidth xxButton--extra-margin-top" onClick={self.handleUrlClick}>Close</button>
	        	</div>
        	</div>
        );
    }
});

export const UrlUploadInput = React.createClass({
    render: function() {
        return (
        	<form className="xxFormField xxFormField--has-urlDrop" onSubmit={self.handleSubmit}>
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
        return (
        	<div>
        		{
        			isMobile ?  <UploadProgressContainer mode={self.props.photoUploadMode} {...props} /> : (
        	    
	        	    <div className="xxUploadDialog-block">
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
	        	        <UploadProgressContainer mode={self.props.photoUploadMode} {...props} />
	        	        </ReactCSSTransitionGroup>
        	    	</Dropzone>
	        	    </div>
        	    	<div className="xxUploadDialog-block">
	    	        	<label className="xxLabel"> OR CHOOSE FROM </label>
	        	    </div>
        			);
        		}
    	    </div>
	    );
    },
    onDrop: function (files) {
        var self = this;
        self.props.sendLocalPhotos(files);
    },
});


export const XXXX = React.createClass({
    render: function() {
        return (
        );
    }
});

export const XXXX = React.createClass({
    render: function() {
        return (
        );
    }
});

export const XXXX = React.createClass({
    render: function() {
        return (
        );
    }
});


export const XXXX = React.createClass({
    render: function() {
        return (
        );
    }
});












