// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, { PropTypes } from 'react';
import AjaxMixin from '../../mixins/Ajax';
import Message from '../wonderland/Message';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';
import TRACKING from '../../modules/tracking';
import E from '../../modules/errors';
import DropDown from './DropDown';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideoFilters = React.createClass({

    propTypes: {
        handleBackClick: PropTypes.func.isRequired,
        videoId: PropTypes.string.isRequired,
        handleSendRefilter: PropTypes.func.isRequired,
    },

    contextTypes: {
        isMobile: PropTypes.bool
    },

    getInitialState: function() {
        var self = this;
        return {
            gender: null,
            age: null,
            isError: false
        };
    },

    handleBackClick: function(e) {
        var self = this;
        if (self.handleBackClick) {
            self.props.handleBackClick();
        }
    },

    componentWillUnmount: function() {
        E.clearErrors();
    },

    render: function() {
        var self = this,
            collectionClassName = self.context.isMobile ? 'xxOverlay xxOverlay--light xxOverlay--spaced' : 'xxCollectionAction',
            isValid = self.state.gender || self.state.age,
            submitClassName = ['xxButton', 'xxButton--highlight'],
            errMsg = self.state.isError ? <Message body={E.getErrors()} flavour="danger" /> : ''
        ;
        if (isValid) {
            submitClassName.push('xxButton--important');
        }
        return (
            <div className={collectionClassName} data-vid={self.props.videoId}>
                <h2 className="xxTitle">Filter Results</h2>
                {
                    this.context.isMobile ? (
                        <div
                            className="xxOverlay-close"
                            data-action-label="info"
                            onClick={self.handleBackClick}>
                        </div>
                    ) : null
                }
                <p>{T.get('copy.videoContent.filter.thumbnails')}</p>
                {errMsg}
                <div className="xxFormField">
                    <label className="xxLabel">{T.get('label.filters')}</label>
                    <DropDown
                        options={UTILS.FILTERS_GENDER}
                        label={T.get('label.gender')}
                        handleChange={self.onGenderChange}
                    />
                </div>
                <div className="xxFormField">
                    <DropDown
                        options={UTILS.FILTERS_AGE}
                        label={T.get('label.age')}
                        handleChange={self.onAgeChange}
                    />
                </div>
                <div className="xxCollectionAction-buttons">
                    <button
                        className="xxButton"
                        type="button"
                        data-action-label="info"
                        onClick={self.handleBackClick}
                        >{T.get('back')}</button>
                    <button
                        className={submitClassName.join(' ')}
                        type="button"
                        disabled={!isValid}
                        onClick={self.sendRefilter}
                    >{T.get('apply')}</button>
                </div>
            </div>
        );
    },
    onGenderChange: function(value) {
        var self = this;
        self.setState({
            gender: value || null,
            isError: false
        });
    },
    onAgeChange: function(value) {
        var self = this;
        self.setState({
            age: value || null,
            isError: false
        });
    },
    sendRefilter: function() {
        return this.props.handleSendRefilter(
           this.props.videoId,
           this.state.gender,
           this.state.age);
        TRACKING.sendEvent(this, arguments, this.state.gender + "/" + this.state.age);
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideoFilters;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
