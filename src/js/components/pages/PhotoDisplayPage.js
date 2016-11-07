import React, { Component, PropTypes } from 'react';

import _ from 'lodash';

import BasePage from './BasePage';
import T from '../../modules/translation';

const photos = require('../../../../data/airbnb-scores.json');

class PhotoDisplayPage extends Component {

    getImgs(binIndex, howMany=12) {
        return _.sampleSize(photos[binIndex], howMany).map(photo => <img src={photo[0]}/>);
    }

    render() {
        return (
            <div>
                <h1>90th Percentile</h1>
                <section className="photoSection">
                    {this.getImgs(9)}
                </section>
                <h1>80th Percentile</h1>
                <section className="photoSection">
                    {this.getImgs(8)}
                </section>
                <h1>70th Percentile</h1>
                <section className="photoSection">
                    {this.getImgs(7)}
                </section>
                <h1>60th Percentile</h1>
                <section className="photoSection">
                    {this.getImgs(6)}
                </section>
                <h1>50th Percentile</h1>
                <section className="photoSection">
                    {this.getImgs(5)}
                </section>
                <h1>40th Percentile</h1>
                <section className="photoSection">
                    {this.getImgs(4)}
                </section>
                <h1>30th Percentile</h1>
                <section className="photoSection">
                    {this.getImgs(3)}
                </section>
                <h1>20th Percentile</h1>
                <section className="photoSection">
                    {this.getImgs(2)}
                </section>
                <h1>10th Percentile</h1>
                <section className="photoSection">
                    {this.getImgs(1)}
                </section>
                <h1>0th Percentile</h1>
                <section className="photoSection">
                    {this.getImgs(0)}
                </section>
            </div>
        );
    }
}

export default PhotoDisplayPage;
