// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import ThumbnailRanked from './ThumbnailRanked';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

class Thumbnails extends React.Component {
	render() {
		return (
			<section className="section">
				<table>
					<thead></thead>
					<tbody>
						<tr>
							<th>Title TODO</th>
							<td><ThumbnailRanked neonscore="99" src="http://loremflickr.com/320/240/neon"/></td>
							<td><ThumbnailRanked neonscore="77" src="http://loremflickr.com/320/240/neon"/></td>
							<td><ThumbnailRanked neonscore="66" src="http://loremflickr.com/320/240/neon"/></td>
							<td><ThumbnailRanked neonscore="44" src="http://loremflickr.com/320/240/neon"/></td>
							<td><ThumbnailRanked neonscore="22" src="http://loremflickr.com/320/240/neon"/></td>
							<td><ThumbnailRanked neonscore="02" src="http://loremflickr.com/320/240/neon"/></td>
						</tr>
					</tbody>
					<tfoot></tfoot>
				</table>
			</section>
		);
	}
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default Thumbnails;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
