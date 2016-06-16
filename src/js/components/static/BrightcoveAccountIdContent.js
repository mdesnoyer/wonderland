// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var BrightcoveAccountIdContent = React.createClass({
	render: function() {
		return(
			<div>
				<h4 className="title is-5">Brightcove Video Cloud Account ID</h4>
				<p>You can locate your Video Cloud Account ID on the <a rel="external" href="https://studio.brightcove.com/products/videocloud/admin/accountsettings">Account Information</a> page in your Brightcove account. Your Account ID will look similar to this:</p>
				<figure className="image wonderland-image">
					<img src="/img/support/brightcove/1-account-id.png" />
				</figure>
			</div>
		);
	}
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default BrightcoveAccountIdContent;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
