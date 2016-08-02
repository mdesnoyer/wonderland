// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var CollectionsContainer = React.createClass({
    render: function() {
        var self = this;
        // once the tags end point is create we want to sort between videos and image collections
        return (
            <div>
                {
                    self.props.collections.map(function(collection) {
                    	return (
                    		<li type={'TODO'} key={collection.video_id}>
                    			<p>Title: {collection.title}</p>
                    			<p>State: {collection.state}</p>
                    		</li>
                		) 
                    })
                }
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default CollectionsContainer;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 