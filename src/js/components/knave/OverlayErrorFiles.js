import UTILS from '../../modules/utils';
import React from 'react';

var OverlayErrorFiles = React.createClass({
	render: function() {
		if (Array.isArray(this.props.errorFiles) && this.props.errorFiles.length > 0) {
			return (
				<table className="fixed_headers">
					<thead>
					<tr>
						<th>File Name</th>
						<th>Size</th>
						<th>Error</th>

					</tr>
					</thead>
					<tbody>
					{
						this.props.errorFiles.map(function(file, id) {
							var sizeType = file.hasOwnProperty('bytes') ? 'bytes' : 'size';
							var message = file[sizeType] >= UTILS.MAX_IMAGE_FILE_SIZE ? 'File Over 2.5MB' : 'Invaild File Type'
							return (
							 <tr>
							 	<td>{file.name}</td>
							 	<td>{UTILS.bytesToSize(file[sizeType])}</td>
							 	<td>{message}</td>
							 </tr>
							)
						})
					}
					</tbody>
				</table>
			);	
		}
		else {
			return null
		}

		
	}
})

export default OverlayErrorFiles

// <table> 
// 	<tr>
// 		<th>File Name</th>
// 		<th>Size</th>
// 		<th>Error</th>
// 	</tr>
// 	<tr>
// 		<td>File Name</td>
// 		<td>Size</td>
// 		<td>Error</td>
// 	</tr>

// </table> 



// <ul className="xxOverlay-scrollbox">
// 	{
// 		this.props.errorFiles.map(function(file, id) {
// 			var sizeType = file.hasOwnProperty('bytes') ? 'bytes' : 'size';
// 			var message = file[sizeType] >= UTILS.MAX_IMAGE_FILE_SIZE ? 'File Over 2.5MB' : 'Invaild File Type'
// 			return (
// 			 <li>
// 			 	<span>{file.name + ' - ' + UTILS.bytesToSize(file[sizeType])}</span>
// 			 	<span>{message}</span>
// 			 </li>
// 			)
// 		})
// 	}
// </ul>