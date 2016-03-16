// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import VideoBox from './VideoBox';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

//Fake Json Data from API documentation 
//Used to simulate a call while the API is still in development

var JSON = {
                "videos" : [
                {
                    "video_id": "v123"
                },
                {
                    "video_id": "v124"
                },
                {
                    "video_id": "v125"
                },
                {
                    "video_id": "v126"
                },
                {
                    "video_id": "v127"
                }
            ],
            "video_count" : 5,
            "next_page" : "http://services.neon-lab.com/api/v2/testAccountID123/videos?fields=video_id&since_time=1389303924785&limit=5"
        };

var Videos = React.createClass({
    getInitialState: function() {
        this.ajaxCall()
        return { childsData: JSON }
    },
	render: function() {
		// var self = this;
		var childrens = this.state.childsData.videos.map(function(childData, childIndex) {
            return <VideoBox key={childIndex} text={childData.video_id}/>;
            }.bind(this));
        var nextPage = this.state.childsData.next_page;
        return (
            <section className="section">
                <div className="container">{childrens}</div>
                <div className="column is-offset-9">
                    <a href={nextPage} className="button is-large is-primary ">Next 5</a>
                </div>
            </section>
		);
	},
    ajaxCall: function(){
        alert("TODO: AJAX CALL TO USER // CURRENTLY DUMMYDATA // WAITING ON API UPDATE");
    }
});
// NEED CONDITIONAL FOR THE NEXT PAGE

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Videos;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
