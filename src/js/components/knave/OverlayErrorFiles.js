import React from 'react';

var OverlayErrorFiles = React.createClass({
	render: function() {
		debugger
		if (Array.isArray(this.props.errorFiles) && this.props.errorFiles.length > 0) {
			return (
				<ul className="xxOverlay-scrollbox">
					{
						this.props.errorFiles.map(function(file, id) {
							var sizeType = file.hasOwnProperty('bytes') ? 'bytes' : 'size';
							return <li> {file.name + ' - ' + file[sizeType]} </li>
						})
					}
				</ul>
			);	
		}
		else {
			return null
		}

		
	}
})

export default OverlayErrorFiles



// overflow: scroll;
// list-style: none;
// height: 6em;
// width: 100%;
// position: relative;
// background: white;