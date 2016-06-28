// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

import XXThumbnail from '../Thumbnail';

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
        const { updateStage } = this.props;
        const { showLowScores } = this.state;

        return (
            <div className="xxCollectionImages">
                <div className="xxCollectionImages-featured">
                    <h2 className="xxCollection-subtitle">
                        Default Thumbnail
                    </h2>
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
                        onClick={e => {e.preventDefault(); updateStage('image-zoom');}}
                    />
                </div>

                <div className="xxCollectionImages-all">
                    <XXThumbnail
                        href="#"
                        score={75}
                        src="/img/xx/temporary/thumbnail-2.jpg"
                        onClick={e => {e.preventDefault(); updateStage('image-zoom');}}
                    />
                    <XXThumbnail
                        href="#"
                        score={74}
                        src="/img/xx/temporary/thumbnail-2.jpg"
                        onClick={e => {e.preventDefault(); updateStage('image-zoom');}}
                    />
                    <XXThumbnail
                        href="#"
                        score={71}
                        src="/img/xx/temporary/thumbnail-2.jpg"
                        onClick={e => {e.preventDefault(); updateStage('image-zoom');}}
                    />
                    <XXThumbnail
                        href="#"
                        score={69}
                        src="/img/xx/temporary/thumbnail-2.jpg"
                        onClick={e => {e.preventDefault(); updateStage('image-zoom');}}
                    />
                    <XXThumbnail
                        href="#"
                        score={60}
                        src="/img/xx/temporary/thumbnail-2.jpg"
                        onClick={e => {e.preventDefault(); updateStage('image-zoom');}}
                    />
                    <strong
                        className="xxCollectionImages-allAnchor"
                        onClick={this.toggleLowScoresVisibility}
                    >
                        <span>
                            {`${showLowScores ? 'Hide' : 'View'} Low Scores`}
                        </span>
                    </strong>
                    {
                        showLowScores ? (
                            /* This wrapper div is actually unnecessary */
                            <div>
                                <XXThumbnail
                                    href="#"
                                    score={55}
                                    src="/img/xx/temporary/thumbnail-1.jpg"
                                    onClick={e => {e.preventDefault(); updateStage('image-zoom');}}
                                />
                                <XXThumbnail
                                    href="#"
                                    score={52}
                                    src="/img/xx/temporary/thumbnail-1.jpg"
                                    onClick={e => {e.preventDefault(); updateStage('image-zoom');}}
                                />
                                <XXThumbnail
                                    href="#"
                                    score={49}
                                    src="/img/xx/temporary/thumbnail-1.jpg"
                                    onClick={e => {e.preventDefault(); updateStage('image-zoom');}}
                                />
                                <XXThumbnail
                                    href="#"
                                    score={48}
                                    src="/img/xx/temporary/thumbnail-1.jpg"
                                    onClick={e => {e.preventDefault(); updateStage('image-zoom');}}
                                />
                                <XXThumbnail
                                    href="#"
                                    score={46}
                                    src="/img/xx/temporary/thumbnail-1.jpg"
                                    onClick={e => {e.preventDefault(); updateStage('image-zoom');}}
                                />
                                <XXThumbnail
                                    href="#"
                                    score={43}
                                    src="/img/xx/temporary/thumbnail-1.jpg"
                                    onClick={e => {e.preventDefault(); updateStage('image-zoom');}}
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