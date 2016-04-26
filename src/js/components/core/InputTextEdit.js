// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import AJAX from '../../modules/ajax';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var InputTextEdit = React.createClass({
	proptypes: {
		title: React.PropTypes.string.isRequired,
		displayTitle: React.PropTypes.string.isRequired
	},
	getInitialState: function() {
		var self = this;
		return {
			title: self.props.title,
			displayTitle: self.props.displayTitle,
			isFocused: false,
			// if enabled then the editable input box replaces the title of the Video Header
			isEnabled: false
		}
	},
	render: function() {
		var self = this, 
			style = self.state.isFocused ? {'border': ''} : {border: 'none'},
		 	placeHolderEnable = (
				<input 
					style={style} 
					className="title is-5" 
					type="text" 
					title={self.state.title}
					value={self.state.displayTitle} 
					onChange={self.handleTitleChange} 
					onFocus={self.handleFocus} 
					onBlur={self.handleBlur}
				/>
			),
		 	placeHolderDisable = <p className="title is-5" title={self.state.videoId}>{self.state.displayTitle}</p>,
		 	placeHolder = self.state.isEnabled ? placeHolderEnable : placeHolderDisable
	 	;
		return (
			<h2>
				{placeHolder}
			</h2>
		);
	},
	handleFocus: function(){
		this.setState({
			isFocused: true
		});
	},
	handleBlur: function(e){
		this.setState({
			isFocused: false
		});
		this.sendUpdatedTitle();
	},
	handleTitleChange(e) {
	    this.setState({
	        displayTitle: e.target.value
	    });
    },
    sendUpdatedTitle: function() {
    	alert("AJAX CALL TODO");

    }
});


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default InputTextEdit

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
