import React, { Component, PropTypes } from 'react';

import _ from 'lodash';
import Helmet from 'react-helmet';

import SESSION from '../../modules/session';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';


class PhotoDisplayPage extends Component {

    static displayName = 'PhotoDisplayPage';

    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    static howMany = 14;

    constructor() {
        super();
        this.state = {
            selectedInteriorExterior: null,
            selectedObject: null,
        };
        this.handleObjectSelect = this.handleObjectSelect.bind(this);
        this.handleInteriorExteriorSelect = this.handleInteriorExteriorSelect.bind(this);
        this.handlePercentileReset = this.handlePercentileReset.bind(this);
        this.photos = [];
        this.objectPhotosMap = {};
        this.photoUrlMap = {};
        this.interiorPhotos = [];
        this.exteriorPhotos = [];
    }

    componentWillMount() {
        if (!SESSION.active()) {
            return this.context.router.push(UTILS.DRY_NAV.SIGNIN.URL);
        }
        const { accountId } = SESSION.state;
        if (!accountId) {
            return this.context.router.push(UTILS.DRY_NAV.SIGNIN.URL);
        }
        if (!CONFIG.AIRBNB_ACCOUNTS.includes(accountId)) {
            return this.context.router.push(UTILS.DRY_NAV.SIGNIN.URL);
        }

        this.photos = require('../../../../data/airbnb-scores.json');
        this.objectPhotosMap = require('../../../../data/airbnb-object-photos-map.json');
        this.photoUrlMap = require('../../../../data/airbnb-photo-url-map.json');
        this.interiorPhotos = require('../../../../data/airbnb-interior-photos.json');
        this.exteriorPhotos = require('../../../../data/airbnb-exterior-photos.json');
    }

    getImgsForBin(binIndex) {
        return _.sampleSize(this.photos[binIndex], PhotoDisplayPage.howMany).map(photo =>
            <img
                key={photo[0]}
                alt="bnb"
                src={this.formatSrc(photo[0])}
            />
        );
    }

    getImgsForObject() {
        return this.objectPhotosMap[this.state.selectedObject].slice(0, PhotoDisplayPage.howMany).map(photoId =>
            <img
                key={this.photoUrlMap[photoId]}
                alt="bnb"
                src={this.formatSrc(this.photoUrlMap[photoId])}
            />
        );
    }

    getImgsForIntExt(isInterior = True) {

        const photoIds = isInterior ? this.interiorPhotos : this.exteriorPhotos;
        return _.sampleSize(photoIds, PhotoDisplayPage.howMany)
            .map(photoId =>
            <img
                key={this.photoUrlMap[photoId]}
                alt="bnb"
                src={this.formatSrc(this.photoUrlMap[photoId])}
            />
        );
    }

    formatSrc(key) {
        return `https://a0.muscache.com/im/pictures/${key}.jpg?aki_policy=x_medium`;
    }

    handleObjectSelect(e) {
        this.setState({
            selectedInteriorExterior: null,
            selectedObject: e.target.value,
        });
    }

    handleInteriorExteriorSelect(e) {
        this.setState({
            selectedInteriorExterior: e.target.value,
            selectedObject: null,
        });
    }

    handlePercentileReset() {
        this.setState({
            selectedInteriorExterior: null,
            selectedObject: null
        });
    }

    render() {
        const percentiles = [9, 8, 7, 6, 5, 4, 3, 2, 1];
        const objectOptions =
            [<option key="" value="">{T.get('airbnb.dropdown.initial')}</option>]
            .concat(
                _.keys(this.objectPhotosMap)
                .sort()
                .map(object => <option key={object}>{object}</option>));
        const { selectedObject, selectedInteriorExterior } = this.state;
        const buttonText = selectedObject || selectedInteriorExterior ?
            T.get('airbnb.button.backTo') :
            T.get('airbnb.button.seeMore');

        let content;
        if (selectedObject) {
            content = (
                <div>
                    <h1 className="xxTitle xxTitle--has-photo-page">
                        {selectedObject}
                    </h1>
                    <section className="photoSection">
                        {this.getImgsForObject()}
                    </section>
                </div>
            );
        } else if (selectedInteriorExterior) {
            content = (
                <div>
                    <h1 className="xxTitle xxTitle--has-photo-page">
                        {selectedInteriorExterior}
                    </h1>
                    <section className="photoSection">
                        {this.getImgsForIntExt(selectedInteriorExterior === 'Interior')}
                    </section>
                </div>
            );
        } else {
            content = percentiles.map(percentile =>
                <div key={percentile}>
                    <h1 className="xxTitle xxTitle--has-photo-page">
                        {`${percentile}0th Percentile`}
                    </h1>
                    <section className="photoSection">
                        {this.getImgsForBin(percentile)}
                    </section>
                </div>
            );
        }

        return (
            <div>
                <Helmet
                    title={T.get('airbnb.title')}
                />
                <button onClick={this.handlePercentileReset}>{buttonText}</button>
                <select
                    value={selectedObject || ''}
                    className="objectSelect"
                    onChange={this.handleObjectSelect}
                >
                    {objectOptions}
                </select>
                <br />
                <select
                    value={selectedInteriorExterior || ''}
                    className="objectSelect"
                    onChange={this.handleInteriorExteriorSelect}
                >
                    <option key="">{T.get('copy.interiorExterior')}</option>
                    <option key="interior">{T.get('copy.interior')}</option>
                    <option key="exterior">{T.get('copy.exterior')}</option>
                </select>
                <article className="percentileDescriptionContainer">
                    <h1 className="xxTitle">{T.get('airbnb.title')}</h1>
                    <p dangerouslySetInnerHTML={{ __html: T.get('airbnb.explanation') }} />
                </article>
                {content}
            </div>
        );
    }
}


export default PhotoDisplayPage;
