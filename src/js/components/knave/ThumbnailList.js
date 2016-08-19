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
        numberToDisplay: PropTypes.number
    },

    render: function() {

        // Empty list renders the null component.
        if (this.props.thumbnails.length == 0) {
            return null;
        }

        const thumbnails = this.props.thumbnails
            .slice(0, this.props.numberToDisplay)
            .map(t => {
                return (
                    <Thumbnail
                        key={t.thumbnail_id}
                        score={t.neon_score}
                        src={RENDITIONS.findRendition(t)}
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

// A list where the first and second parts are split
// into their own DOM nodes.
export const TwoPartThumbnailList = React.createClass({
    propTypes: {
        // An array of thumbnail resource
        firstPartThumbs: PropTypes.array.isRequired,
        secondPartThumbs: PropTypes.array
        // Note: children are implicitly rendered.
    },

    render: function() {

        return (
            <div>
                <ThumbnailList
                    thumbnails={this.props.firstPartThumbs}
                >
                    {this.props.children}
                </ThumbnailList>
                <ThumbnailList
                    thumbnails={this.props.secondPartThumbs}
                />
            </div>
        );
    }
});

// A ThumbnailList with a ShowLess button in the first row's right-most slot.
export const ShowLessThumbnailList = React.createClass({

    propTypes: {
        thumbnails: PropTypes.array.isRequired,
        onLess: PropTypes.func.isRequired
    },

    render: function() {
        // TODO extract constant.
        // Split the list into before the ShowLess and after.
        const firstPartThumbs = this.props.thumbnails.slice(0, 5);
        const secondPartThumbs = this.props.thumbnails.slice(5);
        return (
            <div>
                <ThumbnailList
                    thumbnails={firstPartThumbs}
                >
                    <strong className="xxCollectionImages-allAnchor" onClick={this.props.onLess}>
                        <span>{T.get('action.showLess')}</span>
                    </strong>
                </ThumbnailList>
                <ThumbnailList
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
        numberToDisplay: PropTypes.number.isRequired
    },

    render: function() {

        // TODO extract constant.
        return (
            <ThumbnailList {...this.props}
            >
                <strong className="xxCollectionImages-allAnchor" onClick={this.props.onMore}>
                    <span>{T.get('action.showMore')}</span>
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
