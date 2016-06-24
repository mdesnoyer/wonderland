// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import ReactDOM from 'react-dom';

import XXThumbnail from './Thumbnail';
import XXLift from './Lift';

import scrollbarWidth from '../utils/scrollbarWidth';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class XXPageOverlay extends React.Component {
    constructor(props) {
        super(props);

        this.handleCloseClick = this.handleCloseClick.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        ReactDOM.findDOMNode(this).scrollTop = 0;

        document.body.classList.add('has-overlayWithScroll', 'has-overlayDark');
        document.body.style.marginRight = `${scrollbarWidth}px`;
    }

    componentWillUnmount() {
        document.body.classList.remove('has-overlayWithScroll', 'has-overlayDark');
        document.body.style.marginRight = 0;
    }

    handleCloseClick(e) {
        e.preventDefault();

        this.props.onClose();
    }

    render() {
        const { handleBgCloseClick, handleCloseClick } = this;

        return (
            <article className="xxOverlay xxOverlay--dark xxOverlay--scroll xxOverlay--visibleNav">
                <a href="" className="xxOverlay-close" onClick={handleCloseClick}>Close</a>
                <div className="xxImageZoom">
                    <div className="xxImageZoom-inner">
                        {/*
                            Ideally, the back-end provides image dimensions
                            paddingBottom, rather than needing to use DOM access
                            to calculate. You would also use those to determine
                            whether to set --vertical or --square modifier.
                        */}
                        {/*<div className="xxImageZoom-image">
                            <XXThumbnail
                                className="xxThumbnail--zoom"
                                score={75}
                                size="large"
                                src="/img/xx/temporary/thumbnail-5.jpg"
                                style={{paddingBottom: `${356 / 636 * 100}%`}}
                            />
                        </div>*/}
                        {/*<div className="xxImageZoom-image xxImageZoom-image--square">
                            <XXThumbnail
                                className="xxThumbnail--zoom"
                                score={75}
                                size="large"
                                src="/img/xx/temporary/thumbnail-4.jpg"
                                style={{paddingBottom: `${636 / 636 * 100}%`}}
                            />
                        </div>*/}
                        <div
                            className="xxImageZoom-image xxImageZoom-image--vertical"
                            style={{maxWidth: `calc((100vh - 242px) / (496 / 370))`}}
                        >
                            <XXThumbnail
                                className="xxThumbnail--zoom"
                                score={75}
                                size="large"
                                src="/img/xx/temporary/thumbnail-3.jpg"
                                style={{paddingBottom: `${496 / 370 * 100}%`}}
                            />
                        </div>
                        <div className="xxImageZoom-content">
                            <h2 className="xxSubtitle xxImageZoom-subtitle">Valence Features</h2>
                            <ul className="xxTagList">
                                <li className="xxTagList-item">eye gaze</li>
                                <li className="xxTagList-item">eye gaze</li>
                                <li className="xxTagList-item">eye gaze</li>
                            </ul>
                            <p>
                                Why did Neon pick this image? We understand
                                all of the different features that give rise
                                to image preference. In your image, these
                                particular features showed up.
                            </p>
                            <XXLift />
                            <nav className="xxImageZoom-nav">
                                <a href="#" className="xxImageZoom-prev">Previous</a>
                                <a href="#" className="xxImageZoom-next">Next</a>
                                <strong className="xxImageZoom-current">1 of 6</strong>
                            </nav>
                        </div>
                    </div>
                </div>
            </article>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
