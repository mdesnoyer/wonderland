import React, { Component, PropTypes } from 'react';

import _ from 'lodash';

import BasePage from './BasePage';
import T from '../../modules/translation';

const photos = require('../../../../data/airbnb-scores.json');

class PhotoDisplayPage extends Component {

    getImgs(binIndex, howMany=51) {
        return _.sampleSize(photos[binIndex], howMany).map(photo => <img src={photo[0]}/>);
    }

    render() {
        return (
            <div>
                <h1>90th Percentile</h1>
                <section className="photoSection">
                    {this.getImgs(9)}
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
