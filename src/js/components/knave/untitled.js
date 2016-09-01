

var uploadBox = React.createClass({
    render: function () {
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