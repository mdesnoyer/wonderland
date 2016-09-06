// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, { PropTypes } from 'react';

import UTILS from '../../modules/utils';
import T from '../../modules/translation';
import Message from '../wonderland/Message'

import AjaxMixin from '../../mixins/Ajax';

import Dropzone from 'react-dropzone'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import UploadProgressContainer from './UploadProgressContainer/';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var ImageUploadPanel = React.createClass({
    getInitialState: function() {
        return {
            isUrlOpen: false
        }
    },
    contextTypes: {
        isMobile: PropTypes.bool
    },
    render: function () {
        var self = this,
            submitClassName = ['xxButton', 'xxButton--highlight'],
            props = self.props
        ;
        const isMobile = self.context.isMobile;
        return (
            <div className="xxUploadDialog-drag-drop-panel">

                {
                    self.state.isUrlOpen ? (
                        <div>
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
                        <div className="xxCollectionAction-buttons">
                           <button className="xxButton xxButton--fullwidth xxButton--extra-margin-top" onClick={self.handleUrlClick}>Close</button>
                        </div>
                        </div>
                    ) : null
                }
                { self.state.isUrlOpen ? null : (
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
                                <div className="xxUploadDialog-block">
                                    <label className="xxLabel"> OR CHOOSE FROM </label>
                                </div>

                                </div>
                            )
                    )
                }
                <div className="xxUploadDialog-block">
                    <div className="xxUploadButtonsChooser">
                        <button
                            className="xxButton xxButton--Chooser-Dropbox"
                            id="dropBoxSDK"
                            disabled={self.props.photoUploadMode === 'loading'}
                            onClick={self.handleDropBoxClick}
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
                        {self.props.panelType === 'video' ? <button className="xxButton xxButton--Chooser-URL" onClick={self.handleUrlClick}></button> : null }
                    </div>
                    <div className="xxUploadButtonsChooser">
                        <label className="xxLabel">Dropbox</label>
                        <label className="xxLabel">Desktop</label>
                        {self.props.panelType === 'video' ? (<label className="xxLabel">URL</label>) : null }
                    </div>
                    <div className="xxCollectionAction-buttons">
                        <button
                            className="xxButton xxButton--fullwidth xxButton--extra-margin-top"
                            type="button"
                            data-action-label="info"
                            onClick={this.props.cancelClickHandler}
                            >{T.get('back')}
                        </button>
                    </div>
                    </div>
            </div>
        );
    },
    handleDropBoxClick: function() {
        this.setState({isUrlOpen: false});
        this.props.grabDropBox();
    },
    handleUrlClick: function() {
        this.setState({isUrlOpen: !this.state.isUrlOpen});
    },
    handleInputClick: function() {
        this.setState({isUrlOpen: false});
        document.getElementById("file-input").click();
    },
    handleSubmit: function(e) {
        e.preventDefault();
        this.setState({isUrlOpen: false});
        this.props.updateDefaultThumbnail(this.refs.url.value);
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
        numberUploadedCount: React.PropTypes.number,
        cancelClickHandler: React.PropTypes.func
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ImageUploadPanel

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
