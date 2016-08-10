// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';
import Message from '../wonderland/Message'

import AjaxMixin from '../../mixins/Ajax';

import Dropzone from 'react-dropzone'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var ImageUploadOverlay = React.createClass({
    render: function() {
        const { isOnboarding } = this.props;
        var self = this,
            submitClassName = ['xxButton', 'xxButton--highlight'],
            className = ['xxUploadDialog'],
            messageNeeded = self.props.error ? <Message message={self.props.error} type={'formError'}/> : null
        ;
        return (
            <Dropzone 
                className={'xxUploadDialog'}
                multiple={true}
                disableClick={true}
                accept="image/*"
                activeClassName='has-dragAndDropHover'
                encType="multipart/form-data" 
                onDrop={self.onDrop}
            >
                <div className="xxDragAndDrop">
                    <ReactCSSTransitionGroup transitionName="xxFadeInOutFast" transitionEnterTimeout={200} transitionLeaveTimeout={200}>
                        <div className="xxDragAndDrop-content xxDragAndDrop-hint" key="drag-and-drop-hint">
                            Drag and Drop your image(s) here.<br />
                            Sorry, no folders.
                        </div>
                    </ReactCSSTransitionGroup>
                </div>
                <div className="xxUploadDialog-inner">
                    <div className="xxUploadDialog-intro">
                        <h2 className="xxTitle">Upload Your Images</h2>
                        <p>You can drag and drop your images into the window. Or you can use the buttons below to browse your device or Dropbox account.</p>
                        {messageNeeded}
                    </div>
                    <div className="xxFormField">
                        <label className="xxLabel">Choose Image Source</label>
                        <div className="xxButton xxButton--uploadDialog xxButton--highlight xxButton--file">
                            Local
                            <input
                                type="file"
                                multiple
                                className="xxButton-fileInput"
                                onChange={self.props.sendLocalPhotos}
                            />
                        </div>
                        <button id="dropBoxSDK"
                            className="xxButton xxButton--uploadDialog xxButton--highlight"
                            onClick={self.props.grabDropBox}
                        >
                        Dropbox
                        </button>
                    </div>
                    <button
                        className={submitClassName.join(' ')}
                        type="button"
                        onClick={self.props.toggleOpen}
                        data-generate-tab={true}
                    >Submit</button>
                </div>
            </Dropzone>
        );
    },
    onDrop: function (files) {
        var self = this;
            self.props.formatData(files)
    },
    propTypes: {
        sendLocalPhotos: React.PropTypes.func,
        grabDropBox: React.PropTypes.func,
        sendFormattedData: React.PropTypes.func,
        toggleOpen: React.PropTypes.func
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ImageUploadOverlay;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
