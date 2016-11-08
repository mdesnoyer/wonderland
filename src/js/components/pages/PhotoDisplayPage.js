import React, { Component, PropTypes } from 'react';

import _ from 'lodash';

import { PercentileContainer } from './../photo-page-components/PhotoContainers';

import BasePage from './BasePage';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';

const photos = require('../../../../data/airbnb-scores.json');


class PhotoDisplayPage extends Component {


    constructor(props) {
        super(props);
        this.handlePercentileClick = this.handlePercentileClick.bind(this)
        this.state = {
            percentileShow: 9
        };
    }

    handlePercentileClick(e) {
        
        var locale = "percentile" + e.target.dataset.percentile
        var element = document.getElementById(locale);
        element.scrollIntoView();
    }

    getImgs(binIndex, howMany=14) {
        return _.sampleSize(photos[binIndex], howMany).map((photo) => {
            return <img src={`https://a0.muscache.com/im/pictures/${photo[0]}?aki_policy=x_medium`}/>
        });
    }


    render() {
        
        const imageGalleryOptions = {
            showNav: false,
            showPlayButton: false,
            showFullscreenButton: false,
        };
        var percentiles = [9,8,7,6,5,4,3,2,1]
        var self = this;
        return (
            <div>
                <article className="percentileDescriptionContainer">
                    <h1 className="xxTitle">{T.get('airBnB.title')}</h1>
                    <p dangerouslySetInnerHTML={{__html: T.get('airBnB.explanation')}}></p>
                </article>
                {
                /* Maybe add later this is a scroll bar
                    !UTILS.isMobile() ? <PercentileContainer handlePercentileClick={this.handlePercentileClick} /> : ''
                */
                }
                {
                    percentiles.map(function(percentile){
                        return (
                            <div>
                                <h1 id={"percentile" + percentile } className="xxTitle xxTitle--has-photo-page">{percentile + "0th Percentile"}</h1>
                                <section className="photoSection">
                                    {self.getImgs(percentile)}
                                </section>
                            </div>
                        )
                    })
                }
            </div>
        );

    }
}


export default PhotoDisplayPage;
