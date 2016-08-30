import React from 'react';

var OverlayErrorFiles = React.createClass({
	render: function() {
		debugger
		if (Array.isArray(this.props.errorFiles) && this.props.errorFiles.length > 0) {
			return (
				<ul className="xxOverlay-scrollbox">
					{
						self.props.errorFiles.map(function(file, id) {
							// return <li className="scrollbox-item"> </>
							debugger

						})
					}
					<li className="scrollbox-item">
					Name: "oiwhdoihwd" - 56KB   
					</li>
					<li className="scrollbox-item">1</li>
					<li className="scrollbox-item">1</li>
					<li className="scrollbox-item">1</li>
					<li className="scrollbox-item">1</li>
					<li className="scrollbox-item">1</li>
					<li className="scrollbox-item">1</li>
					<li className="scrollbox-item">1</li>
					<li className="scrollbox-item">1</li>
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