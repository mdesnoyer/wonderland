// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var XXPage = React.createClass({
    render: function() {
        return (
            <div className="xxPage">
                <div className="xxHeader">
                    <img className="xxLogo" src="/img/xx/logo.svg" />

                    <nav className="xxNav">
                        <ul>
                            <li className="xxNav-item">
                                <a href="" className="xxNav-anchor">
                                    Learn More
                                </a>
                            </li>
                            <li className="xxNav-item">
                                <a href="" className="xxNav-anchor">
                                    Contact Us
                                </a>
                            </li>
                            <li className="xxNav-item">
                                <a href="" className="xxNav-anchor">
                                    Sign Up
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>

                <article className="xxCollection">
                    <div className="xxCollection-content">
                        <h1 className="xxCollection-title">
                            Santa Cruz man wins Mavericks big wave surf
                            competition
                        </h1>
                        <div className="xxCollection-filters">
                            <strong className="xxCollection-filtersTitle">Filters</strong>
                            <span className="xxCollection-filtersValue">None</span>
                        </div>
                        <div className="xxCollection-lift">
                            <div className="xxCollection-liftChartHolder">
                                <strong className="xxCollection-liftChartTitle">48% Lift</strong>
                                <div className="xxCollection-liftChart">
                                    <div className="xxCollection-liftChartLine" style={{width: '100%'}}></div>
                                    <div className="xxCollection-liftChartLine xxCollection-liftChartLine--original" style={{width: '67.5%'}}></div>
                                </div>
                            </div>
                            <p>Compared to the default thumbnail for this video, with our select top scoring image.</p>
                        </div>
                    </div>
                    <div className="xxCollection-images">
                        <div className="xxCollection-mainImage">
                            <h2 className="xxCollection-subtitle">Default Thumbnail</h2>
                            <div className="xxThumbnail xxThumbnail--lowScore xxThumbnail--large" data-score="49">
                                <img
                                    className="xxThumbnail-image"
                                    src="/img/xx/temporary/thumbnail-1.jpg"
                                />
                            </div>
                        </div>
                        <div className="xxCollection-mainImage">
                            <h2 className="xxCollection-subtitle">Neon Select</h2>
                            <a href="" className="xxThumbnail xxThumbnail--large" data-score="80">
                                <img
                                    className="xxThumbnail-image"
                                    src="/img/xx/temporary/thumbnail-2.jpg"
                                />
                            </a>
                        </div>
                        <div className="xxCollection-allImages">
                            <a href="" className="xxThumbnail" data-score="75">
                                <img
                                    className="xxThumbnail-image"
                                    src="/img/xx/temporary/thumbnail-2.jpg"
                                />
                            </a>
                            <a href="" className="xxThumbnail" data-score="74">
                                <img
                                    className="xxThumbnail-image"
                                    src="/img/xx/temporary/thumbnail-2.jpg"
                                />
                            </a>
                            <a href="" className="xxThumbnail" data-score="71">
                                <img
                                    className="xxThumbnail-image"
                                    src="/img/xx/temporary/thumbnail-2.jpg"
                                />
                            </a>
                            <a href="" className="xxThumbnail" data-score="69">
                                <img
                                    className="xxThumbnail-image"
                                    src="/img/xx/temporary/thumbnail-2.jpg"
                                />
                            </a>
                            <a href="" className="xxThumbnail" data-score="60">
                                <img
                                    className="xxThumbnail-image"
                                    src="/img/xx/temporary/thumbnail-2.jpg"
                                />
                            </a>
                            <a className="xxCollection-allImagesMoreAnchor" href="">
                                <span>View Low Scores</span>
                            </a>
                        </div>
                    </div>
                </article>
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default XXPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
