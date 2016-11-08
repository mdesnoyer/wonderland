import React, { Component } from 'react';

import _ from 'lodash';

import T from '../../modules/translation';

const photos = require('../../../../data/airbnb-scores.json');
const objectPhotosMap = require('../../../../data/airbnb-object-photos-map.json');
const photoUrlMap = require('../../../../data/airbnb-photo-url-map.json');

class PhotoDisplayPage extends Component {

    constructor() {
        super();
        this.state = {
            selectedObject: null,
        };
        this.handleObjectSelect = this.handleObjectSelect.bind(this)
        this.handlePercentileReset = this.handlePercentileReset.bind(this);
        this.howMany = 14;
    }

    getImgsForBin(binIndex) {
        return _.sampleSize(photos[binIndex], this.howMany).map(photo =>
            <img
                key={photo[0]}
                alt="bnb"
                src={this.formatSrc(photo[0])}
            />
        );
    }

    getImgsForObject() {
        return _.sampleSize(objectPhotosMap[this.state.selectedObject], this.howMany).map(photoId =>
            <img
                key={photoUrlMap[photoId]}
                alt="bnb"
                src={this.formatSrc(photoUrlMap[photoId])}
            />
        );
    }

    formatSrc(key) {
        return `https://a0.muscache.com/im/pictures/${key}.jpg?aki_policy=x_medium`;
    }

    handleObjectSelect(e) {
        this.setState({ selectedObject: e.target.value });
    }

    handlePercentileReset(){
        this.setState({ selectedObject: null });
    }

    render() {
        const percentiles = [9, 8, 7, 6, 5, 4, 3, 2, 1];
        const objectOptions = [<option key={null}>Look for Objects</option>].concat(
            _.keys(objectPhotosMap)
            .sort()
            .map(object => <option key={object}>{object}</option>));
        const { selectedObject } = this.state;
        const buttonText = !this.state.selectedObject ? T.get('airBnB.buttonText') : T.get('airBnB.buttonText2');
        const content = selectedObject ?
            <div>
                <h1 className="xxTitle xxTitle--has-photo-page">
                    {selectedObject}
                </h1>
                <section className="photoSection">
                    {this.getImgsForObject()}
                </section>
            </div> :
            percentiles.map(percentile =>
                <div key={percentile}>
                    <h1 className="xxTitle xxTitle--has-photo-page">
                        {`${percentile}0th Percentile`}
                    </h1>
                    <section className="photoSection">
                        {this.getImgsForBin(percentile)}
                    </section>
                </div>
            );


        return (
            <div>
                <select
                    value={selectedObject}
                    className="objectSelect"
                    onChange={this.handleObjectSelect}
                >
                    {objectOptions}
                </select>
                <button onClick={this.handlePercentileReset}>{buttonText}</button>
                <article className="percentileDescriptionContainer">
                    <h1 className="xxTitle">{T.get('airBnB.title')}</h1>
                    <p dangerouslySetInnerHTML={{ __html: T.get('airBnB.explanation') }} />
                </article>
                {content}
            </div>
        );
    }
}


export default PhotoDisplayPage;
