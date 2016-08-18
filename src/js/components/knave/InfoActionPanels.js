// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, {PropTypes} from 'react';
import DemographicFilters from './DemographicFilters';

import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// TODO candidate for HoC refactor
// TODO make *Control a prop of its panel

export const InfoDemoLiftPanel = React.createClass({

    propTypes: {
        // User's name of this collection
        tagId: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        onDemographicChange: PropTypes.func.isRequired,
        demographicOptions: PropTypes.array.isRequired
    },

    render: function() {
        const lift = <h2>{T.get('label.lift')}</h2>;

        return (<div>
            <h1 className="xxCollection-title">{this.props.title} [Icon]</h1>
            <DemographicFilters
                tagId={this.props.tagId}
                onChange={this.props.onDemographicChange}
                demographicOptions={this.props.demographicOptions}
            />
            {lift}
        </div>);
    }
});

export const InfoLiftPanel = React.createClass({
    propTypes: {
        // User's name of this collection
        title: PropTypes.string.isRequired,
    },

    render: function() {
        return (<div>
            <h1>{this.props.title}</h1>
            <h2>{T.get('label.lift')}</h2>
        </div>);
    }
});

export const FilterPanel = React.createClass({
    render: () => {
        return <h1>{T.get('label.filterResults')}</h1>;
    }
});

export const EmailPanel = React.createClass({
    render: function() {
        return (<div>
            <h1>{T.get('label.emailMe')}</h1>
        </div>);
    }
});

export const EmailControl = React.createClass({

    propTypes: {
        handleClick: PropTypes.func.isRequired
    },

    render: function() {
        return (
            <a
                data-tip={T.get('label.emailMe')}
                data-for="staticTooltip"
                data-place="bottom"
                data-action-label="email"
                onClick={this.props.handleClick}
                className="xxCollectionActions-anchor xxCollectionActions-email">
                <span>{T.get('email')}</span>
            </a>
        );
    }
});

export const SharePanel = React.createClass({
    render: function() {
        return (<div>
            <h1>{T.get('label.shareYourImages')}</h1>
        </div>);
    }
});

export const ShareControl = React.createClass({

    propTypes: {
        handleClick: PropTypes.func.isRequired
    },

    render: function() {
        return (
            <a
                data-tip={T.get('copy.share.main')}
                data-for="staticTooltip"
                data-place="bottom"
                data-action-label="share"
                onClick={this.props.handleClick}
                className="xxCollectionActions-anchor xxCollectionActions-share">
                <span>{T.get('share')}</span>
            </a>
        );
    }
});

export const DeletePanel = React.createClass({
    render: function() {
        return (<div>
            <h1>Delete It</h1>
        </div>);
    }
});

export const DeleteControl = React.createClass({

    propTypes: {
        handleClick: PropTypes.func.isRequired
    },

    render: function() {
        return (
            <a
                data-tip={T.get('copy.videoContent.delete.title')}
                data-for="staticTooltip"
                data-place="bottom"
                data-action-label="delete"
                onClick={this.props.handleClick}
                className="xxCollectionActions-anchor xxCollectionActions-delete">
                <span>{T.get('delete')}</span>
            </a>
        );
    }
});

export const SavePanel = React.createClass({
    render: function() {
        return (<div>
            <h1>{T.get('action.saveMyImages')}</h1>
        </div>);
    }
});

export const SaveControl = React.createClass({

    propTypes: {
        handleClick: PropTypes.func.isRequired
    },

    render: function() {
        return (
            <a
                data-tip={T.get('action.saveMyImages')}
                data-for="staticTooltip"
                data-place="bottom"
                data-action-label="share"
                onClick={this.props.handleClick}
                className="xxCollectionActions-anchor xxCollectionActions-save">
                <span>{T.get('save')}</span>
            </a>
        );
    }
});
