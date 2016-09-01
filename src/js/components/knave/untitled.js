

var uploadBox = React.createClass({
    getInitialState: function() {
        return {
            isUrlOpen: false
        }
    },
    render: function () {
        var self = this,
            submitClassName = ['xxButton', 'xxButton--highlight']
            isValid = self.props.photoUploadMode === 'initial' &&  self.props.photoUploadThumbnailIds.length > 0 && self.props.photoCollectionName !== ''
        ;
        if (isValid) { submitClassName.push('xxButton--important'); };
        var props = self.props;
        const isMobile = window.outerWidth < 768;

        if (isOverlay) {
            return (
                <div className="xxUploadDialog-drag-drop">
                        <div className="xxUploadDialog-intro">
                            <h2 className="xxTitle">{T.get('imageUpload.uploadImage')}</h2>
                        </div>
                        <div className="xxFormField">
                            <label className="xxLabel">{T.get('imageUpload.collectionName')}</label>
                            <input
                                ref="nameInput"
                                className="xxInputText"
                                placeholder={T.get('imageUpload.placeholderName')}
                                type="text"
                                value={self.props.photoCollectionName}
                                required
                                onChange={e => self.props.updateField('photoCollectionName', e.target.value)}
                            />
                        </div>
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

                            </ReactCSSTransitionGroup>
                        </Dropzone>
                            <div className="xxUploadButtonsChooser"> 
                                <button 
                                    className="xxButton xxButton--Chooser-Dropbox"
                                    id="dropBoxSDK"
                                    disabled={self.props.photoUploadMode === 'loading'}
                                    onClick={self.props.grabDropBox}
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
                            </div>
                            <div className="xxUploadButtonsChooser">
                            <label className="xxLabel">Dropbox</label> 
                            <label className="xxLabel">Desktop</label> 
                            </div>
                        <div className="xxUploadDialog-block">
                            <label className="xxLabel">{self.props.photoUploadThumbnailIds.length + " of 100 files uploaded" }</label>
                        </div>
                </div>
            )
        }
        if(isPanel) {
            <div className="xxUploadDialog-drag-drop-panel">
                    <Dropzone  
                        className="xxDragAndDrop"
                        multiple={self.props.panelType === 'photo'}
                        disableClick={false}
                        activeClassName='xxDragAndDrop--has-dragAndDropHover'
                        encType="multipart/form-data" 
                        onDrop={self.onDrop}
                    >
                    <ReactCSSTransitionGroup 
                        transitionName="xxFadeInOutFast"
                        transitionEnterTimeout={UTILS.UPLOAD_TRANSITION} 
                        transitionLeaveTimeout={UTILS.UPLOAD_TRANSITION}
                    >                                    
                        <Progress />
                    </ReactCSSTransitionGroup>
                    </Dropzone>
            </div>
        }
    }
})





        // upload overylay
        <div className="xxUploadDialog">
            <CollectionName />
            <Dropzone>
                <Progress />
            </Dropzone>
            <UploadTypeChoose/>
        </div>


        // upload panel 
        <div className="xxUploadDialog">
            <Dropzone>
                <Progress />
            </Dropzone>
            <UploadTypeChoose/>
        </div>

        // upload overlay mobile
        <div className="xxUploadDialog">
            <CollectionName />
                <Progress />
            <UploadTypeChoose/>
        </div>

        <div className="xxUploadDialog">
            <Progress />
            <UploadTypeChoose/>
        </div>