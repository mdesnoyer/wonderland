// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import DropDown from './DropDown';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideoFilters = React.createClass({
    render: function() {
        var self = this;
        return (
            <div className="xxCollectionAction">
                <h2 className="xxTitle">Filter Results</h2>
                <p>
                    Filter your video to see images targeted for a specific
                    demographic audience. We’ll need to reprocess the video,
                    so this may take a few minutes.
                </p>
                <div className="xxFormField">
                    <label className="xxLabel">Filters</label>
                    <DropDown label="Gender" options={UTILS.FILTERS_GENDER}/>
                </div>
                <div className="xxFormField">
                    <DropDown label="Age" options={UTILS.FILTERS_AGE}/>
                </div>
                <div className="xxCollectionAction-buttons">
                    <button
                        className="xxButton"
                        type="button"
                        data-action-label="info"
                        onClick={self.props.handleMenuChange}
                        >{T.get('back')}</button>
                    <button
                        className="xxButton xxButton--highlight"
                        type="button"
                        onClick={self.sendRefilter}
                    >{T.get('apply')}</button>
                </div>
            </div>
        );
    },
    sendRefilter: function() {
        alert('TODO REFILTER');
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideoFilters;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
