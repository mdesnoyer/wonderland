// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, {PropTypes} from 'react';
import Thumbnail from './Thumbnail';

import RENDITIONS from '../../modules/renditions';
import T from '../../modules/translation';
import {
    ImageServingEnableControl,
    ImageServingDisableControl} from './InfoActionPanels';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export const ThumbnailList = React.createClass({

    propTypes: {

        // An array of thumbnail resource
        thumbnails: PropTypes.array.isRequired,

        // The number of thumbnails to display
        // (Undefined means show all.)
        numberToDisplay: PropTypes.number,

        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
        onClick: PropTypes.func,

        className: PropTypes.string
    },

    render: function() {

        // Empty list renders the null component.
        if (this.props.thumbnails.length == 0) {
            return null;
        }

        // const showHref = this.props.showHref
        const thumbnails = this.props.thumbnails
            .slice(0, this.props.numberToDisplay)
            .map(t => {
                return (
                    <Thumbnail
                        showHref={true}
                        className={this.props.className||''}
                        key={t.thumbnail_id}
                        thumbnailId={t.thumbnail_id}
                        score={t.neon_score}
                        enabled={t.enabled}
                        src={RENDITIONS.findRendition(t)}
                        onMouseEnter={this.props.onMouseEnter}
                        onMouseLeave={this.props.onMouseLeave}
                        onClick={this.props.onClick}
                    />
                );
            });

        return (
            <div className="xxCollectionImages-all">
                {thumbnails}
                {this.props.children}
            </div>
        );
    }
});

// A ThumbnailList with a ShowLess button in the first row's right-most slot.
export const ShowLessThumbnailList = React.createClass({

    propTypes: {
        thumbnails: PropTypes.array.isRequired,
        onLess: PropTypes.func.isRequired,
        numberToDisplay: PropTypes.number,
        // Label for ShowMore button
        lessLabel: PropTypes.string,
        // Classname for the part before the showless
        firstClassName: PropTypes.string,
        // And for the part after the showless
        secondClassName: PropTypes.string,
    },

    getDefaultProps: function() {
        return {
            lessLabel: T.get('action.showLess')
        }
    },

    render: function() {
        const number = this.props.numberToDisplay || 5;
        // TODO extract constant.
        // Split the list into before the ShowLess and after.
        const firstPartThumbs = this.props.thumbnails.slice(0, number);
        const secondPartThumbs = this.props.thumbnails.slice(number);
        return (
            <div>
                <ThumbnailList
                    {...this.props}
                    thumbnails={firstPartThumbs}
                    className={this.props.firstClassName}
                >
                    <strong className="xxCollectionImages-allAnchor" onClick={this.props.onLess}>
                        <span>{this.props.lessLabel}</span>
                    </strong>
                </ThumbnailList>
                <ThumbnailList
                    {...this.props}
                    className={this.props.secondClassName}
                    thumbnails={secondPartThumbs}
                />
            </div>
        );
    }
});

// A ThumbnailList with a ShowMore button in the last row's right-most slot
export const ShowMoreThumbnailList = React.createClass({

    propTypes: {
        thumbnails: PropTypes.array.isRequired,
        onMore: PropTypes.func.isRequired,
        // Control how many images are shown before the ShowMore.
        numberToDisplay: PropTypes.number.isRequired,
        // Label for ShowMore button
        moreLabel: PropTypes.string
    },

    getDefaultProps: function() {
        return {
            moreLabel: T.get('action.showMore')
        }
    },


    render: function() {

        // TODO extract constant.
        return (
            <ThumbnailList {...this.props}
            >
                <strong className="xxCollectionImages-allAnchor" onClick={this.props.onMore}>
                    <span>{this.props.moreLabel}</span>
                </strong>
            </ThumbnailList>
        );
    }
});

export const ServingStatusThumbnailList = React.createClass({

    propTypes: {
        thumbnails: PropTypes.array.isRequired,
        // TODO not necessary right now
        /*onMore: PropTypes.func.isRequired,
        // Control how many images are shown before the ShowMore.
        numberToDisplay: PropTypes.number.isRequired,
        // Label for ShowMore button
        moreLabel: PropTypes.string,*/

        // control to enable a thumbnail
        enableClick: PropTypes.func.isRequired,
        // control to disable a thumbnail
        disableClick: PropTypes.func.isRequired
    },

    getDefaultProps: function() {
        return {
            moreLabel: T.get('action.showMore'),
            className: ''
        }
    },

    getControl: function(t) {
        if (t.enabled) {
            return (<ImageServingDisableControl handleClick={()=>{this.props.disableClick(t)}} />)
        }
        else {
            return (<ImageServingEnableControl handleClick={()=>{this.props.enableClick(t)}} />)
        }
    },
    render: function() {
        const thumbnailSetOne = this.props.thumbnails
            .map(t => {
                return (
                    <Thumbnail
                        showHref={true}
                        wrapperClassName={'xxThumbnail-wrapper'}
                        className={this.props.className}
                        key={t.thumbnail_id}
                        score={t.neon_score}
                        enabled={t.enabled}
                        src={RENDITIONS.findRendition(t)}
                        children={this.getControl(t)}
                    />
                );
            });
        return (
            <div>
                <div className="xxCollectionImages-all">
                    {thumbnailSetOne}
                </div>
            </div>
        );
    }
});

// A ThumbnailList with both buttons.
export const ShowMoreLessThumbnailList = React.createClass({

    propTypes: {
        thumbnails: PropTypes.array.isRequired,
        onMore: PropTypes.func.isRequired,
        onLess: PropTypes.func.isRequired,
        numberToDisplay: PropTypes.number.isRequired
    },

    render: function() {

        // TODO extract constant.
        const firstRowThumbCount = 5;

        const lessPartThumbs = this.props.thumbnails.slice(0, firstRowThumbCount);
        const morePartThumbs = this.props.thumbnails.slice(firstRowThumbCount);
        return (
            <div>
                <ShowLessThumbnailList
                    {...this.props}
                    thumbnails={lessPartThumbs} // I.e., Override thumbnails from props.
                />
                <ShowMoreThumbnailList
                    {...this.props}
                    thumbnails={morePartThumbs}
                    numberToDisplay={this.props.numberToDisplay - firstRowThumbCount}
                />
            </div>
        );
    }
});
