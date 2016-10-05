import React, { PropTypes } from 'react';
import Thumbnail from './Thumbnail';

import RENDITIONS from '../../modules/renditions';
import T from '../../modules/translation';
import {
    ImageServingEnableControl,
    ImageServingDisableControl } from './InfoActionPanels';


export function ThumbnailList(props) {
    // Empty list renders the null component.
    if (!props.thumbnails.length) {
        return null;
    }
    const thumbnails = props.thumbnails
        .slice(0, props.numberToDisplay)
        .map(t => {
            const src = RENDITIONS.findRendition(t) ||
                RENDITIONS.findSmallestRendition(t.renditions, 'gif').url;
            return (<Thumbnail
                showHref
                className={props.className || ''}
                key={t.thumbnail_id}
                thumbnailId={t.thumbnail_id}
                score={t.neon_score}
                enabled={t.enabled}
                dominantColor={t.dominant_color}
                src={src}
                onMouseEnter={props.onMouseEnter}
                onMouseLeave={props.onMouseLeave}
                onClick={props.onClick}
            />);
        });

    return (
        <div className="xxCollectionImages-all">
            {thumbnails}
            {props.children}
        </div>
    );
}
ThumbnailList.propTypes = {
    // An array of thumbnail resource
    thumbnails: PropTypes.arrayOf(PropTypes.object).isRequired,

    // The number of thumbnails to display
    // (Undefined means show all.)
    numberToDisplay: PropTypes.number,

    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func,

    className: PropTypes.string,
};

// A ThumbnailList with a ShowLess button in the first row's right-most slot.
export const ShowLessThumbnailList = React.createClass({

    propTypes: {
        thumbnails: PropTypes.array.isRequired,
        onLess: PropTypes.func.isRequired,
        numberToDisplay: PropTypes.number,
        // Label for ShowLess button
        lessLabel: PropTypes.string,
        // Classname for the button.
        showLessClassName: PropTypes.string,
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

        const showLessClassNames = ['xxCollectionImages-allAnchor'];
        if (this.props.showLessClassName) {
            showLessClassNames.push(this.props.showLessClassName);
        }
        return (
            <div>
                <ThumbnailList
                    {...this.props}
                    thumbnails={firstPartThumbs}
                    className={this.props.firstClassName}
                >
                    <a className={showLessClassNames.join(' ')} onClick={this.props.onLess}>
                        <span>{this.props.lessLabel}</span>
                    </a>
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
        moreLabel: PropTypes.string,
        // Class for ShowMore button.
        showMoreClassName: PropTypes.string,
    },

    getDefaultProps: function() {
        return {
            moreLabel: T.get('action.showMore')
        }
    },

    render: function() {
        const showMoreClassNames = ['xxCollectionImages-allAnchor'];
        if (this.props.showMoreClassName) {
            showMoreClassNames.push(this.props.showMoreClassName);
        }
        return (
            <ThumbnailList {...this.props}
            >
                <button className={showMoreClassNames.join(' ')} onClick={this.props.onMore}>
                    <span>{this.props.moreLabel}</span>
                </button>
            </ThumbnailList>
        );
    }
});

export const ServingStatusThumbnailList = React.createClass({

    propTypes: {
        thumbnails: PropTypes.array.isRequired,
        // control to enable/disable a thumbnail
        onClick: PropTypes.func.isRequired
    },

    getDefaultProps: function() {
        return {
            moreLabel: T.get('action.showMore'),
            className: ''
        }
    },

    getControl: function(t) {
        // TODO implement without binds in render.
        if (t.enabled) {
            return (<ImageServingDisableControl onClick={() => this.props.onClick(t)} />)
        }
        return (<ImageServingEnableControl onClick={() => this.props.onClick(t)} />)
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
                        thumbnailId={t.thumbnail_id}
                        score={t.neon_score}
                        dominantColor={t.dominant_color}
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
    },
});

export function ShowMoreLessThumbnailList(props) {
    const firstRowThumbCount = 5;
    const lessPartThumbs = props.thumbnails.slice(0, firstRowThumbCount);
    const morePartThumbs = props.thumbnails.slice(firstRowThumbCount);
    return (
        <div>
            <ShowLessThumbnailList
                {...props}
                thumbnails={lessPartThumbs} // i.e., Override thumbnails from props.
            />
            <ShowMoreThumbnailList
                {...props}
                thumbnails={morePartThumbs}
                numberToDisplay={props.numberToDisplay - firstRowThumbCount}
            />
        </div>
    );
}
ShowMoreLessThumbnailList.propTypes = {
    thumbnails: PropTypes.arrayOf(PropTypes.object).isRequired,
    numberToDisplay: PropTypes.number.isRequired,
};
