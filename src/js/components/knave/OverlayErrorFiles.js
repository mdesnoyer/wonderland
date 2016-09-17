import UTILS from '../../modules/utils';
import React from 'react';

var OverlayErrorFiles = React.createClass({
	render: function() {
		if (Array.isArray(this.props.errorFiles) && this.props.errorFiles.length > 0) {
			return (
				<table className="xxOverLay-Table">
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
							var message = file[sizeType] >= UTILS.MAX_IMAGE_FILE_SIZE ? 'File Over 10MB' : 'Invaild File Type'
							return (
							 <tr key={id}>
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