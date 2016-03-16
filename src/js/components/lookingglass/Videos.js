// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import Video from './Video';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Videos = React.createClass({
    render: function() {
    	var params1 = { videoId: 'NJF-XsG6l' },
	    	params2 = { videoId: '4kjKJif6l' },
	    	params3 = { videoId: 'Ekybejz6e' },
	    	params4 = { videoId: 'VkWNxoMpl' },
	    	params5 = { videoId: '4Jtt7sfax' }
    	;

        return (
            <div>
                <section className="section">
                    <Video params={params1} />
                </section>
                <section className="section">
                    <Video params={params2} />
                </section>
                <section className="section">
                    <Video params={params3} />
                </section>
                <section className="section">
                    <Video params={params4} />
                </section>
                <section className="section">
                    <Video params={params5} />
                </section>
            </div>
    	);
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Videos;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
