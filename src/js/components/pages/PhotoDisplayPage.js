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
            selectedObject: null,
        };
        this.handleObjectSelect = this.handleObjectSelect.bind(this);
        this.handlePercentileReset = this.handlePercentileReset.bind(this);
        this.photos = [];
        this.objectPhotosMap = {};
        this.photoUrlMap = {};
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

    formatSrc(key) {
        return `https://a0.muscache.com/im/pictures/${key}.jpg?aki_policy=x_medium`;
    }

    handleObjectSelect(e) {
        this.setState({ selectedObject: e.target.value });
    }

    handlePercentileReset() {
        this.setState({ selectedObject: null });
    }

    render() {
        const percentiles = [9, 8, 7, 6, 5, 4, 3, 2, 1];
        const objectOptions =
            [<option key="" value="">{T.get('airbnb.dropdown.initial')}</option>]
            .concat(
                _.keys(this.objectPhotosMap)
                .sort()
                .map(object => <option key={object}>{object}</option>));
        const { selectedObject } = this.state;
        const buttonText = selectedObject ?
            T.get('airbnb.button.backTo') :
            T.get('airbnb.button.seeMore');
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
                <Helmet
                    title={T.get('airbnb.title')}
                />
                <select
                    value={selectedObject || ''}
                    className="objectSelect"
                    onChange={this.handleObjectSelect}
                >
                    {objectOptions}
                </select>
                <button onClick={this.handlePercentileReset}>{buttonText}</button>
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
