// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import ReactSelect from 'react-select';
import AjaxMixin from '../../mixins/Ajax';
import Message from '../wonderland/Message';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';
import E from '../../modules/errors';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideoFilters = React.createClass({
    mixins: [AjaxMixin],
    getInitialState: function() {
        var self = this;
        return {
            gender: null,
            age: null,
            isError: false
        };
    },
    componentWillUnmount: function() {
        E.clearErrors();
    },
    render: function() {
        var self = this,
            isValid = self.state.gender || self.state.age,
            submitClassName = ['xxButton', 'xxButton--highlight'],
            errMsg = self.state.isError ? <Message body={E.getErrors()} flavour="danger" /> : '';

        if (isValid) {
            submitClassName.push('xxButton--important');
        }
        return (
            <div className="xxCollectionAction">
                <h2 className="xxTitle">Filter Results</h2>
                <p>
                    Filter your video to see images targeted for a specific
                    demographic audience. We’ll need to reprocess the video,
                    so this may take a few minutes.
                </p>
                { errMsg }
                <div className="xxFormField">
                    <label className="xxLabel">{T.get('label.filters')}</label>
                    <ReactSelect
                        name="gender"
                        placeholder={T.get('label.gender')}
                        onChange={self.onGenderChange}
                        value={self.state.gender}
                        options={UTILS.FILTERS_GENDER}
                    />
                </div>
                <div className="xxFormField">
                    <ReactSelect
                        name="age"
                        placeholder={T.get('label.age')}
                        onChange={self.onAgeChange}
                        value={self.state.age}
                        options={UTILS.FILTERS_AGE}
                    />
                </div>
                <div className="xxCollectionAction-buttons">
                    <button
                        className="xxButton"
                        type="button"
                        data-action-label="info"
                        onClick={self.props.handleMenuChange}
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
    onGenderChange: function (value) {
        this.setState({
            gender: value ? value.value : null,
            isError: false
        });
    },
    onAgeChange: function (value) {
        this.setState({
            age: value ? value.value : null,
            isError: false
        });
    },
    sendRefilter: function() {
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
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideoFilters;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
