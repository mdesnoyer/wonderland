import React, { Component, PropTypes } from 'react';

import _ from 'lodash';

import { PercentileContainer } from './../photo-page-components/PhotoContainers';

import BasePage from './BasePage';
import T from '../../modules/translation';

const photos = require('../../../../data/airbnb-scores.json');

class PhotoDisplayPage extends Component {

    constructor(props) {
        super(props);
        this.handlePercentileClick = this.handlePercentileClick.bind(this)
        this.state = {
            percentileShow: 9
        };
    }



    getImgs(binIndex, howMany=12) {
        return _.sampleSize(photos[binIndex], howMany).map(photo => <img key={photo[0]} src={photo[0]}/>);
    }

    handlePercentileClick(e) {
        e.preventDefault();
        this.setState({percentileShow: e.target.dataset.percentile})
    }


    render() {
        const imageGalleryOptions = {
            showNav: false,
            showPlayButton: false,
            showFullscreenButton: false,
        };
        return (
            <div>
                <article className="percentileDescriptionContainer">
                    <h1 className="xxTitle">{T.get('airBnB.title')}</h1>
                    <p dangerouslySetInnerHTML={{__html: T.get('airBnB.explanation')}}></p>
                </article>
                <h1 id="percentile90" className="xxTitle xxTitle--has-photo-page">90th Percentile</h1>
                <section className="photoSection">
                    {this.getImgs(9)}
                </section>
                <h1 id="percentile90" className="xxTitle xxTitle--has-photo-page">80th Percentile</h1>
                <section className="photoSection">
                    {this.getImgs(8)}
                </section>
                <h1 id="percentile90" className="xxTitle xxTitle--has-photo-page">70th Percentile</h1>
                <section className="photoSection">
                    {this.getImgs(7)}
                </section>
                <h1 id="percentile90" className="xxTitle xxTitle--has-photo-page">60th Percentile</h1>
                <section className="photoSection">
                    {this.getImgs(6)}
                </section>
                <h1 id="percentile90" className="xxTitle xxTitle--has-photo-page">50th Percentile</h1>
                <section className="photoSection">
                    {this.getImgs(5)}
                </section>
                <h1 className="xxTitle xxTitle--has-photo-page">40th Percentile</h1>
                <section className="photoSection">
                    {this.getImgs(4)}
                </section>
                <h1 className="xxTitle xxTitle--has-photo-page">30th Percentile</h1>
                <section className="photoSection">
                    {this.getImgs(3)}
                </section>
                <h1 className="xxTitle xxTitle--has-photo-page">20th Percentile</h1>
                <section className="photoSection">
                    {this.getImgs(2)}
                </section>
                <h1 className="xxTitle xxTitle--has-photo-page">10th Percentile</h1>
                <section className="photoSection">
                    {this.getImgs(1)}
                </section>
            </div>
        );

    }
}

export default PhotoDisplayPage;