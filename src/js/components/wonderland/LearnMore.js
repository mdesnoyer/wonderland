// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var LearnMore = React.createClass({
    render: function() {
        return (
            <article className="xxPageOverlay-content">
                <h1 className="xxSubtitle">{T.get('nav.learnMore')}</h1>
                <h2 className="xxTitle">
                    Neon knows which images drive engagement for specific devices, audiences, and platforms.
                </h2>
                <div className="xxText">
                    <img src="/img/xx/temporary/learn-more-1.jpg" />
                    <p>{T.get('copy.learnMore.one')}</p>
                    <p>{T.get('copy.learnMore.two')}</p>
                    <p>{T.get('copy.learnMore.three')}<a href="https://neon-lab.com/how-neon-works/" rel="external">{T.get('copy.learnMore.four.URL')}</a></p>
                    <p>{T.get('copy.learnMore.four')}</p>
                    <p>{T.get('copy.learnMore.five')}</p>
                    <p>{T.get('copy.learnMore.six')}</p>
                    <p>{T.get('copy.learnMore.seven')}</p>
                </div>
            </article>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default LearnMore;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




