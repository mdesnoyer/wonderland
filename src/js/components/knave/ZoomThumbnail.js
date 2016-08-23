// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import Thumbnail from './Thumbnail';
import T from '../../modules/translation';
import Lift from './Lift';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var ZoomThumbnail = React.createClass({
    propTypes: {
        thumbnail: React.PropTypes.object.isRequired,
        index: React.PropTypes.number.isRequired,
        selectedItem: React.PropTypes.number.isRequired,
        total: React.PropTypes.number.isRequired,
        handleClickPrevious: React.PropTypes.func.isRequired,
        handleClickNext: React.PropTypes.func.isRequired,
        valence: React.PropTypes.array.isRequired,
        extraClass: React.PropTypes.string
    },
    getValenceDisplay: function() {
        var self = this,
            valenceDisplay = null,
            whyThisImage = T.get('copy.whyThisImage') ,
            whyNotThisImage = T.get('copy.whyNotThisImage'),
            uniqueValence = self.props.valence.filter(function(value, pos) {
                return self.props.valence.indexOf(value) === pos;
            })
        ;
        if (this.props.thumbnail && this.props.thumbnail.type === 'bad_neon') {
            valenceDisplay = (<div>
                <h2 className="xxSubtitle xxImageZoom-subtitle">{T.get('copy.whyNotThisImage.header')}</h2>
                <p>{whyNotThisImage} <a href="#" onClick={self.openLearnMore}>Learn More</a>.</p>
            </div>)
        }
        else if (this.props.valence.length > 0) {
            valenceDisplay = (
                 <div>
                 <h2 className="xxSubtitle xxImageZoom-subtitle">{T.get('copy.valenceFeatures')}</h2>
                    <ul className="xxTagList">
                        {
                            uniqueValence.map(function(v, i) {
                                while (i < 3) {
                                    return (
                                        <li className="xxTagList-item" key={i}>{v}</li>
                                    );
                                }
                            })
                        }
                    </ul>
                    <p>{whyThisImage} <a href="#" onClick={self.openLearnMore}>{T.get('nav.learnMore')}</a>.</p>
                 </div>
            );
        }
        else {
            valenceDisplay = (<div>
                <h2 className="xxSubtitle xxImageZoom-subtitle">Getting Features</h2>
                <div className="xxValenceloadingSpinner"></div>
            </div>)
        }
        return valenceDisplay;
    },
    openLearnMore: function(e) {
        var self = this;
        e.preventDefault();
        self.props.handleClose(e);
        self.props.openLearnMore(e);
    },
    render: function() {
        var self = this,
            activeClass = (self.props.index === self.props.selectedItem ? ' is-active' : ''),
            extraClass = ['xxThumbnail--zoom'],
            w = self.props.thumbnail.width,
            h = self.props.thumbnail.height,
            orientation = (w === h) ? 'square' : ((w > h) ? 'landscape' : 'portrait'),
            styleOpts = {
                maxWidth: 'calc((100vh - 242px) / (' + h + ' / ' + w + '))'
            }
        ;
        if (self.props.extraClass) {
            extraClass.push(self.props.extraClass);
        }
        return (

            <div className={'xxImageZoom-inner' + activeClass}>
                <div
                    className={'xxImageZoom-image xxImageZoom-image--' + orientation}
                    style={styleOpts}
                >
                    <Thumbnail
                        extraClass={extraClass.join(' ')}
                        handleClick={null}
                        handleMouseEnter={null}
                        type={self.props.thumbnail.type}
                        title={''}
                        uid={self.props.index}
                        score={self.props.thumbnail.neon_score}
                        size={'large'}
                        src={self.props.thumbnail.url}
                        thumbnailId={self.props.thumbnail.thumbnail_id}
                        showHref={false}
                        style={{paddingBottom: `${h / w * 100}%`}}
                    />
                </div>
                <div className="xxImageZoom-content">
                    {self.getValenceDisplay()}
                    <Lift displayThumbLift={self.props.displayThumbLift}/>
                    <nav className="xxImageZoom-nav">
                        <a
                            href="#"
                            onClick={self.props.handleClickPrevious}
                            className="xxImageZoom-prev"
                            aria-label={T.get('action.previous')}
                        >
                            {T.get('action.previous')}
                        </a>
                        <a
                            href="#"
                            onClick={self.props.handleClickNext}
                            className="xxImageZoom-next"
                            aria-label={T.get('action.next')}
                        >
                            {T.get('action.next')}
                        </a>
                        <strong className="xxImageZoom-current">
                            {T.get('copy.xOfY', {
                                '@x': self.props.selectedItem + 1,
                                '@y': self.props.total
                            })}
                        </strong>
                    </nav>
                </div>
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ZoomThumbnail;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
