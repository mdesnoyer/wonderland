import React, {PropTypes} from 'react';

import {
    UploadChooser,
    CollectionNameInput,
    CollectionSubmitButton,
    DesktopUploadButton,
    DropBoxUploadButton,
    UrlUploadButton,
    UrlUploadInput,
    DragAndDrop,
} from './UploadActions'


import { MobileLoadingDisplay } from './UploadDisplays';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';
import TRACKING from '../../modules/tracking';

import reqwest from 'reqwest';
import SESSION from '../../modules/session';

import Account from '../../mixins/Account';
import AjaxMixin from '../../mixins/Ajax';

import VideoUploadOverlay from './VideoUploadOverlay';
import OverLayMessage from './OverLayMessage'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import UploadProgressContainer from './UploadProgressContainer/';
import cookie from 'react-cookie';
import accept from 'attr-accept';
import _ from 'lodash';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var UploadActionsContainer = React.createClass({
    contextTypes: {
        isMobile: PropTypes.bool
    },
    render: function() {
        var props = this.props;
        const isMobile = this.context.isMobile;

        if (this.props.formState === 'chooseUploadType') {
            return (
                <div className="xxOverlay"
                    ref={overlay => this._overlay = overlay}
                    key="upload-overlay"
                >
                    <div className="xxUploadDialog">
                        <UploadChooser {...props} />
                    </div>
                </div>
            );
        };

        if (['addVideo', 'uploadingVideo', 'uploadedVideo'].includes(this.props.formState)) {
            return (
                <div className="xxOverlay"
                    ref={overlay => this._overlay = overlay}
                    key="upload-overlay"
                >
                    <VideoUploadOverlay {...props} />;
                </div>
            )
        };

        if (this.props.formState === 'updateVideoDefault') {
            return (
                <div className="xxUploadDialog-drag-drop-panel">
                    {!this.props.showUrlUploader ? <DragAndDrop {...props} /> : <UrlUploadInput {...props} /> }
                    <div className="xxUploadDialog-block">
                    <div className="xxUploadButtonsChooser">
                        <DropBoxUploadButton {...props} />
                        <DesktopUploadButton {...props} />
                        <UrlUploadButton {...props} />
                    </div>
                    <div className="xxUploadButtonsChooser">
                        <label className="xxLabel">Dropbox</label>
                        <label className="xxLabel">{isMobile ? T.get('label.location.myPhone') : T.get('label.location.desktop')}</label>
                        <label className="xxLabel">URL</label>
                    </div>
                    </div>
                    <div className="xxCollectionAction-buttons">
                        <button
                            className="xxButton xxButton--fullwidth xxButton--extra-margin-top"
                            type="button"
                            data-action-label="info"
                            onClick={this.props.handleCancelClick}
                            >{T.get('back')}
                        </button>
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
                                !this.props.tagId ? <CollectionNameInput {...props} /> : (
                                    <div>
                                    <div className="xxUploadDialog-block">
                                        <label className="xxLabel">{this.props.uploadedTotal + " of 100 files uploaded" }</label>
                                    </div>
                                        <DragAndDrop {...props} />
                                            <div className="xxUploadButtonsChooser">
                                                <DropBoxUploadButton {...props} />
                                                <DesktopUploadButton {...props} />
                                            </div>
                                            <div className="xxUploadButtonsChooser">
                                                <label className="xxLabel">Dropbox</label>
                                                <label className="xxLabel">{isMobile ? T.get('label.location.myPhone') : T.get('label.location.desktop')}</label>
                                            </div>
                                        <CollectionSubmitButton {...props} />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            );
        };
        if (this.props.formState === 'updateCollection') {
            const buttonLabel = T.get(this.props.uploadingTotal === null ?
                'back' : 'done');
            return (
                <div className="xxUploadDialog-drag-drop-panel">
                    <div className="xxUploadDialog-block">
                        <label className="xxLabel">{this.props.uploadedTotal + " of 100 files uploaded" }</label>
                    </div>
                    <DragAndDrop {...props} />
                    <div className="xxUploadButtonsChooser">
                        <DropBoxUploadButton {...props} />
                        <DesktopUploadButton {...props} />
                    </div>
                    <div className="xxUploadButtonsChooser">
                        <label className="xxLabel">Dropbox</label>
                        <label className="xxLabel">{isMobile ? T.get('label.location.myPhone') : T.get('label.location.desktop')}</label>
                    </div>
                    <div className="xxCollectionAction-buttons">
                        <button
                            className="xxButton xxButton--fullwidth xxButton--extra-margin-top"
                            type="button"
                            data-action-label="info"
                            onClick={this.props.handleCancelClick}
                            >{buttonLabel}
                        </button>
                    </div>
                </div>
            )
        };
    }
});

export default UploadActionsContainer;
