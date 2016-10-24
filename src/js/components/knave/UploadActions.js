import React, {PropTypes} from 'react';

import ReactDOM from 'react-dom';

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

export const CollectionNameInput = React.createClass({
    componentDidMount: function() {
        const self = this;
        ReactDOM.findDOMNode(self.refs.textCollectionName).focus();
    },
    render: function() {
        const self = this;
        return (
            <form onSubmit={self.props.handleNameSubmit}>
                <div className="xxFormField">
                    <label className="xxLabel">{T.get('imageUpload.collectionName')}</label>
                    <input
                        ref="textCollectionName"
                        className="xxInputText"
                        placeholder={T.get('imageUpload.placeholderName')}
                        type="text"
                        value={this.props.collectionName}
                        required
                        onChange={e => this.props.updateField('collectionName', e.target.value)}
                    />
                </div>
                <div className="xxUploadDialog-block">
                    <input
                        disabled={this.props.collectionName === ''}
                        className='xxButton xxButton--important'
                        type="submit"
                        value={T.get('action.submitName')}
                    />
                </div>
            </form>
        );
    }
});

export const CollectionSubmitButton = React.createClass({
    render: function() {
        return (
            <div className="xxUploadDialog-block">
                <input
                    disabled={this.props.uploadState === 'loading'}
                    className="xxButton xxButton--important"
                    onClick={this.props.handleCollectionLoad}
                    type="submit"
                    value='Done'
                />
            </div>
        );
    }
});

export const DesktopUploadButton = React.createClass({
    render: function() {
        const multiple = this.props.multiple || true;
        const accept = this.props.accept || 'image/*';
        return (
            <button
                onClick={this.props.handleInputClick}
                className="xxButton xxButton--Chooser-Computer"
            >
                <input
                    disabled={this.props.uploadState === 'loading'}
                    id="file-input"
                    type="file"
                    multiple={multiple}
                    accept={accept}
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
                disabled={this.props.uploadState === 'loading'}
                className="xxButton xxButton--Chooser-Dropbox"
                id="dropBoxSDK"
                disabled={this.props.uploadState === 'loading'}
                onClick={this.props.grabDropBox}
            ></button>
        );
    }
});

export const UrlUploadButton = React.createClass({
    render: function() {
        return (
            <button
                disabled={this.props.uploadState === 'loading'}
                className="xxButton xxButton--Chooser-URL"
                onClick={this.props.handleshowUrlUploader}>
            </button>
        );
    }
});

export const UrlUploadInput = React.createClass({
    render: function() {
        return (
            <form className="xxFormField xxFormField--has-urlDrop" onSubmit={this.props.handleUpdateVideoDefault}>
                <input
                    name="url"
                    className="xxInputText xxInputText--has-urlDrop"
                    type="url"
                    placeholder={T.get('image.URL')}
                    required
                    value={this.props.urlInput}
                    onChange={e => this.props.updateField('urlInput', e.target.value)}
                />
                <button
                    className='xxButton xxButton--highlight xxButton--has-urlDrop'
                    disabled={this.props.uploadState === 'loading'}
                >
                Add URL
                </button>
            </form>
        );
    }
});

export const DragAndDrop = React.createClass({
    contextTypes: {
        isMobile: PropTypes.bool
    },
    render: function() {
        var props = this.props,
            isMobile = this.context.isMobile
        ;
        return (
            <div>
                {
                    isMobile ?  <UploadProgressContainer uploadState={this.props.uploadState} {...props} /> : (
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
                            <UploadProgressContainer {...props}/>
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
