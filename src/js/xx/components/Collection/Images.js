// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

import XXThumbnail from '../Thumbnail';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var XXCollectionImages = React.createClass({
    getInitialState: function() {
        return {
            showLowScores: false,
        };
    },
    toggleLowScoresVisibility: function(e) {
        e.preventDefault();

        this.setState({
            showLowScores: !this.state.showLowScores,
        });
    },
    render: function() {
        return (
            <div className="xxCollectionImages">
                <div className="xxCollectionImages-featured">
                    <h2 className="xxCollection-subtitle">Default Thumbnail</h2>
                    <XXThumbnail
                        score={49}
                        size="large"
                        src="/img/xx/temporary/thumbnail-1.jpg"
                    />
                </div>

                <div className="xxCollectionImages-featured">
                    <h2 className="xxCollection-subtitle">Neon Select</h2>
                    <XXThumbnail
                        href="#"
                        score={80}
                        size="large"
                        src="/img/xx/temporary/thumbnail-2.jpg"
                    />
                </div>

                <div className="xxCollectionImages-all">
                    <XXThumbnail
                        href="#"
                        score={75}
                        src="/img/xx/temporary/thumbnail-2.jpg"
                    />
                    <XXThumbnail
                        href="#"
                        score={74}
                        src="/img/xx/temporary/thumbnail-2.jpg"
                    />
                    <XXThumbnail
                        href="#"
                        score={71}
                        src="/img/xx/temporary/thumbnail-2.jpg"
                    />
                    <XXThumbnail
                        href="#"
                        score={69}
                        src="/img/xx/temporary/thumbnail-2.jpg"
                    />
                    <XXThumbnail
                        href="#"
                        score={60}
                        src="/img/xx/temporary/thumbnail-2.jpg"
                    />
                    <strong className="xxCollectionImages-allAnchor" onClick={this.toggleLowScoresVisibility}>
                        <span>View Low Scores</span>
                    </strong>
                    {
                        this.state.showLowScores ? (
                            <div>
                                <XXThumbnail
                                    href="#"
                                    score={55}
                                    src="/img/xx/temporary/thumbnail-1.jpg"
                                />
                                <XXThumbnail
                                    href="#"
                                    score={52}
                                    src="/img/xx/temporary/thumbnail-1.jpg"
                                />
                                <XXThumbnail
                                    href="#"
                                    score={49}
                                    src="/img/xx/temporary/thumbnail-1.jpg"
                                />
                                <XXThumbnail
                                    href="#"
                                    score={48}
                                    src="/img/xx/temporary/thumbnail-1.jpg"
                                />
                                <XXThumbnail
                                    href="#"
                                    score={46}
                                    src="/img/xx/temporary/thumbnail-1.jpg"
                                />
                                <XXThumbnail
                                    href="#"
                                    score={43}
                                    src="/img/xx/temporary/thumbnail-1.jpg"
                                />
                                <XXThumbnail
                                    href="#"
                                    score={42}
                                    src="/img/xx/temporary/thumbnail-1.jpg"
                                />
                                <XXThumbnail
                                    href="#"
                                    score={40}
                                    src="/img/xx/temporary/thumbnail-1.jpg"
                                />
                                <XXThumbnail
                                    href="#"
                                    score={33}
                                    src="/img/xx/temporary/thumbnail-1.jpg"
                                />
                            </div>
                        ) : null
                    }
                </div>
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default XXCollectionImages;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
