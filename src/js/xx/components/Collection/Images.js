// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

import XXThumbnail from '../Thumbnail';
import XXLift from '../Lift';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class XXCollectionImages extends React.Component {
    constructor(props) {
        super(props);

        this.toggleLowScoresVisibility = this.toggleLowScoresVisibility.bind(this);

        this.state = {
            showLowScores: false,
        };
    }

    toggleLowScoresVisibility(e) {
        e.preventDefault();

        this.setState({
            showLowScores: !this.state.showLowScores,
        });
    }

    render() {
        const { isMobile, type, updateStage } = this.props;
        const { showLowScores } = this.state;

        return (
            <div className="xxCollectionImages">
                <div className="xxCollectionImages-featured">
                    <h2 className="xxCollection-subtitle">
                        { type === 'photo' ? 'Lowest Scoring Image' : 'Default Thumbnail' }
                    </h2>
                    <XXThumbnail
                        score={49}
                        size="large"
                        src="/img/xx/temporary/thumbnail-1.jpg"
                        className="xxThumbnail--lowLight"
                    />
                </div>

                <div className="xxCollectionImages-featured">
                    <h2 className="xxCollection-subtitle">Neon Select</h2>
                    <XXThumbnail
                        href={isMobile ? null : '#'}
                        score={80}
                        size="large"
                        src="/img/xx/temporary/thumbnail-2.jpg"
                        onClick={e => {e.preventDefault(); updateStage('image-zoom');}}
                        onMouseEnter={e => updateStage('image-hover')}
                        onMouseLeave={e => updateStage('')}
                        className="xxThumbnail--highLight"
                    />
                </div>

                {
                    isMobile ? (
                        <XXLift
                            lift="48%"
                            barWidth="49%"
                            barOriginalWidth="33%"
                        />
                    ) : null
                }

                <div className="xxCollectionImages-all">
                    {
                        isMobile ? (
                            <h2 className="xxCollection-subtitle">Top Neon Selects</h2>
                        ) : null
                    }
                    <XXThumbnail
                        href={isMobile ? null : '#'}
                        score={75}
                        src="/img/xx/temporary/thumbnail-2.jpg"
                        onClick={e => {e.preventDefault(); updateStage('image-zoom');}}
                        className="xxThumbnail--highLight"
                        onMouseEnter={e => updateStage('image-hover2')}
                        onMouseLeave={e => updateStage('')}
                    />
                    <XXThumbnail
                        href={isMobile ? null : '#'}
                        score={74}
                        src="/img/xx/temporary/thumbnail-2.jpg"
                        onClick={e => {e.preventDefault(); updateStage('image-zoom');}}
                        className="xxThumbnail--highLight"
                        onMouseEnter={e => updateStage('image-hover')}
                        onMouseLeave={e => updateStage('')}
                    />
                    <XXThumbnail
                        href={isMobile ? null : '#'}
                        score={71}
                        src="/img/xx/temporary/thumbnail-2.jpg"
                        onClick={e => {e.preventDefault(); updateStage('image-zoom');}}
                        className="xxThumbnail--highLight"
                    />
                    <XXThumbnail
                        href={isMobile ? null : '#'}
                        score={69}
                        src="/img/xx/temporary/thumbnail-2.jpg"
                        onClick={e => {e.preventDefault(); updateStage('image-zoom');}}
                        className="xxThumbnail--highLight"
                    />
                    <XXThumbnail
                        href={isMobile ? null : '#'}
                        score={60}
                        src="/img/xx/temporary/thumbnail-2.jpg"
                        onClick={e => {e.preventDefault(); updateStage('image-zoom');}}
                        className="xxThumbnail--highLight"
                    />
                    {
                        isMobile ? null : (
                            <strong
                                className="xxCollectionImages-allAnchor"
                                onClick={this.toggleLowScoresVisibility}
                            >
                                <span>
                                    {
                                        type === 'photo' ? (
                                            `${showLowScores ? 'Hide' : 'See All'} Images`
                                        ) : (
                                            `${showLowScores ? 'Hide' : 'View'} Low Scores`
                                        )
                                    }
                                </span>
                            </strong>
                        )
                    }
                    {
                        showLowScores || isMobile ? (
                            /* This wrapper div is actually unnecessary */
                            <div>
                                {
                                    isMobile ? (
                                        <h2 className="xxCollection-subtitle">Lowest Neon Scores</h2>
                                    ) : null
                                }
                                <XXThumbnail
                                    href={isMobile ? null : '#'}
                                    score={55}
                                    src="/img/xx/temporary/thumbnail-1.jpg"
                                    onClick={e => {e.preventDefault(); updateStage('image-zoom');}}
                                    className="xxThumbnail--lowLight"
                                />
                                <XXThumbnail
                                    href={isMobile ? null : '#'}
                                    score={52}
                                    src="/img/xx/temporary/thumbnail-1.jpg"
                                    onClick={e => {e.preventDefault(); updateStage('image-zoom');}}
                                    className="xxThumbnail--lowLight"
                                />
                                <XXThumbnail
                                    href={isMobile ? null : '#'}
                                    score={49}
                                    src="/img/xx/temporary/thumbnail-1.jpg"
                                    onClick={e => {e.preventDefault(); updateStage('image-zoom');}}
                                    className="xxThumbnail--lowLight"
                                />
                                <XXThumbnail
                                    href={isMobile ? null : '#'}
                                    score={48}
                                    src="/img/xx/temporary/thumbnail-1.jpg"
                                    onClick={e => {e.preventDefault(); updateStage('image-zoom');}}
                                    className="xxThumbnail--lowLight"
                                />
                                <XXThumbnail
                                    href={isMobile ? null : '#'}
                                    score={46}
                                    src="/img/xx/temporary/thumbnail-1.jpg"
                                    onClick={e => {e.preventDefault(); updateStage('image-zoom');}}
                                    className="xxThumbnail--lowLight"
                                />
                                <XXThumbnail
                                    href={isMobile ? null : '#'}
                                    score={43}
                                    src="/img/xx/temporary/thumbnail-1.jpg"
                                    onClick={e => {e.preventDefault(); updateStage('image-zoom');}}
                                    className="xxThumbnail--lowLight"
                                />
                            </div>
                        ) : null
                    }
                </div>
            </div>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default XXCollectionImages;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
