// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, {PropTypes} from 'react';
import Thumbnail from './_Thumbnail';

import RENDITIONS from '../../modules/renditions';
import T from '../../modules/translation';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export const ThumbnailList = React.createClass({

    propTypes: {

        // An array of thumbnail resource
        thumbnails: PropTypes.array.isRequired,

        // The number of thumbnails to display
        // (Undefined means show all.)
        numberToDisplay: PropTypes.number,

        onMouseEnter: PropTypes.func,
        onClick: PropTypes.func,

        className: PropTypes.string
    },

    render: function() {

        // Empty list renders the null component.
        if (this.props.thumbnails.length == 0) {
            return null;
        }

        // Make optional prop funcs safe.
        const noop = () => {};
        const onMouseEnter = (this.props.onMouseEnter || noop);
        const onClick = (this.props.onClick || noop);

        const thumbnails = this.props.thumbnails
            .slice(0, this.props.numberToDisplay)
            .map(t => {
                return (
                    <Thumbnail
                        className={this.props.className||''}
                        key={t.thumbnail_id}
                        score={t.neon_score}
                        src={RENDITIONS.findRendition(t)}
                        onMouseEnter={onMouseEnter.bind(null, t.thumbnail_id)}
                        onClick={onClick.bind(null, t.thumbnail_id)}
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
        lessLabel: PropTypes.string
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
                    thumbnails={firstPartThumbs}
                >
                    <strong className="xxCollectionImages-allAnchor" onClick={this.props.onLess}>
                        <span>{this.props.lessLabel}</span>
                    </strong>
                </ThumbnailList>
                <ThumbnailList
                    {...this.props}
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
