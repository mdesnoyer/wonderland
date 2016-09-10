import React, {PropTypes} from 'react';

import {
	UploadChooser,
	CollctionNameInput,
	CollectionSubmitButton,
	DesktopUploadButton,
	DropBoxUploadButton,
	UrlUploadButton,
	UrlUploadInput,
	DragAndDrop,
} from './UploadActions'


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
import UploadProgressContainer from './UploadProgressContainer/';
import cookie from 'react-cookie';
import accept from 'attr-accept';
import _ from 'lodash';



var UploadActionsContainer = React.createClass({
	
	render: function () {
	var props = this.props;
		if (this.props.formState === 'chooseUploadType') {
			return (
				<div className="xxOverlay"
			        ref={overlay => self._overlay = overlay}
			        onClick={self.handleBgCloseClick}
			        key="upload-overlay"
			    >
					<div className="xxUploadDialog">
					        <UploadChooser {...props}/>
					</div>
				</div>
			);
		};

		if (this.props.formState === 'addVideo') {
			return (
				<div className="xxOverlay"
			        ref={overlay => self._overlay = overlay}
			        onClick={self.handleBgCloseClick}
			        key="upload-overlay"
			    >
			    	<VideoUploadOverlay {...props}/>;
			    </div>
			)			
		};

		if (this.props.formState === 'updateVideoDefault') {
			return (
				<div className="xxUploadDialog-drag-drop-panel">
					<DragAndDrop {...props}/> 
					<div className="xxUploadButtonsChooser">
						<DropBoxUploadButton {...props}/>
						<DesktopUploadButton {...props}/>
						<UrlUploadButton {...props}/>
					</div>
					<div className="xxUploadButtonsChooser">
					    <label className="xxLabel">Dropbox</label>
					    <label className="xxLabel">Desktop</label>
					    <label className="xxLabel">URL</label>
					</div>
				</div>
			);
		};

		if (this.props.formState === 'addCollection') {
			return (
				<div className="xxOverlay"
			        ref={overlay => self._overlay = overlay}
			        onClick={self.handleBgCloseClick}
			        key="upload-overlay"
			    >
					<div className="xxUploadDialog">
					    <div className="xxUploadDialog-drag-drop">
					        <div className="xxUploadDialog-intro">
					            <h2 className="xxTitle">{T.get('imageUpload.uploadImage')}</h2>
					        </div>
							{
								!this.props.tagId ? <CollctionNameInput {...props}/> 	: (
									<div>
									<DragAndDrop {...props}/> 
										<div className="xxUploadButtonsChooser">
											<DropBoxUploadButton {...props}/>
											<DesktopUploadButton {...props}/>
										</div>
										<div className="xxUploadButtonsChooser">
										    <label className="xxLabel">Dropbox</label>
										    <label className="xxLabel">Desktop</label>
										</div>
									</div>
								)
							}
							<CollectionSubmitButton />
						</div>
					</div>
				</div>
			);
		};

		if (this.props.formState === 'updateCollection') {
			return (
				<div className="xxUploadDialog-drag-drop-panel">
					<DragAndDrop {...props}/> 
					<div className="xxUploadButtonsChooser">
						<DropBoxUploadButton {...props}/>
						<DesktopUploadButton {...props}/>
					</div>
					<div className="xxUploadButtonsChooser">
					    <label className="xxLabel">Dropbox</label>
					    <label className="xxLabel">Desktop</label>
					</div>
				</div>
			) 	
		};
	}
});

export default UploadActionsContainer; 
