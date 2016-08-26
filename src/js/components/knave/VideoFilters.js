// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import AjaxMixin from '../../mixins/Ajax';
import Message from '../wonderland/Message';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';
import TRACKING from '../../modules/tracking';
import E from '../../modules/errors';
import DropDown from './DropDown';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideoFilters = React.createClass({
    mixins: [AjaxMixin],
    propTypes: {
        handleBackClick: React.PropTypes.func,
        videoId: React.PropTypes.string.isRequired,
        handleSendRefilter: React.PropTypes.func,
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
            isMeMobile = UTILS.isMeMobile(),
            collectionClassName = isMeMobile ? 'xxOverlay xxOverlay--light xxOverlay--spaced' : 'xxCollectionAction',
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
                    isMeMobile ? (
                        <div 
                            className="xxOverlay-close"
                            data-action-label="info"
                            onClick={self.handleBackClick}>
                        </div>
                    ) : null
                }
                <p>Filter your video to see images targeted for a specific demographic audience. We’ll need to reprocess the video, so this may take a few minutes.</p>
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

        // Allow the parent's refilter function to override.
        if (this.props.handleSendRefilter) {
            return this.props.handleSendRefilter(
               this.props.videoId,
               this.state.gender,
               this.state.age);
        } else {

            var self = this,
                options = {
                    data: {
                        external_video_ref: self.props.videoId,
                        reprocess: true,
                        gender: self.state.gender,
                        age: self.state.age
                    }
                }
            ;
            self.POST('videos', options)
                .then(function(json) {
                    if (self.props.handleMenuChange) {
                        // TODO stateify age and gender at videoowner level
                        self.props.handleMenuChange(self.state.age, 
                            self.state.gender, 
                            true);
                    }
                })
                .catch(function(err) {
                    E.raiseError(err);
                    self.setState({
                        isError: true
                    });
                });
        }
        TRACKING.sendEvent(this, arguments, this.state.gender + "/" + this.state.age);
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideoFilters;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
