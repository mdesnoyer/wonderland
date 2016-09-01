


var UploadProgressContainer = React.createClass({
	propTypes: {
		mode:, 
		
	}
	if(isMobile) {
		return (
			<div className={"xxDragAndDrop-content xxDragAndDrop-" + dragDropClassKey } key={"drag-and-drop-"+ dragDropClassKey}>
			    {
			        self.props.mode === 'initial' && <MobileInitialDisplay />
			        self.props.mode === 'loading' && <MobileLoadingDisplay />
			        self.props.mode === 'success' && <MobileSuccessDisplay />
			    }
			</div>
		);	
	}
	else {
		return (
			<div className={"xxDragAndDrop-content xxDragAndDrop-" + dragDropClassKey } key={"drag-and-drop-"+ dragDropClassKey}>
			    {
			        self.props.mode === 'initial' && <InitialDisplay />
			        self.props.mode === 'loading' && <LoadingDisplay />
			        self.props.mode === 'success' && <SuccessDisplay />
			    }
			</div>	
		);
	}
})





