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
                        var thumbnails = []
                        collection.thumbnails.forEach(function(thumbId) {
                            self.props.thumbnails.forEach(function(thumbnail){
                                if (thumbnail.hasOwnProperty(thumbId)){
                                    thumbnails.push(thumbnail)
                                }
                            })
                        })
                    	return (
                            <article className="xxCollection xxCollection--video" key={collection.key}>
                    			<p>name: {collection.name}</p>
                    			<p>type: {collection.tag_type}</p>
                                <p>created: {collection.created}</p>
                                <p>updated: {collection.updated}</p>
                                <p>thumbnails:
                                {
                                    thumbnails.map(function(index) {
                                        debugger
                                        return (
                                            <img src={index[Object.keys(index)[0]].renditions[0].url} />
                                            )
                                    })
                                }
                                </p>
                            </article>
                		) 
                    })
                }
            </div>
        );
    },
    propTypes : {
        collections: React.PropTypes.array.isRequired,
        thumbnails:  React.PropTypes.array.isRequired
    }
    // getDefaultProps: function() {
    //     return {

    //     }
    // }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default CollectionsContainer;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 