// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import AjaxMixin from '../../mixins/Ajax';
import T from '../../modules/translation';
import E from '../../modules/errors';
import UTILS from '../../modules/utils';
import RENDITIONS from '../../modules/renditions';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var ShareEmail = React.createClass({
    mixins: [AjaxMixin],
    getInitialState: function() {
        var self = this;
        return {
            mode: 'quiet', // quiet, error, loading, success
            collectionUrl: self.props.collectionUrl
        }
    },
    componentWillMount: function() {
        var self = this;
        UTILS.shortenUrl(self.props.collectionUrl, self.handleUrlCallback);
    },
    handleUrlCallback: function(response) {
        var self = this;
        if (response.status_code === 200) {
            self.setState({
                collectionUrl: response.data.url
            });
        }
    },
    render: function() {
        var self = this,
            userMessage = false
        ;
        switch (self.state.mode) {
            case 'error':
                userMessage = <div className="has-error"><p className="xxLabel">{E.getErrors()}</p></div>;
                break;
            case 'loading':
                userMessage = <div className="xxLabel"><p>{T.get('copy.loading')}</p></div>;
                break;
            default:
                break;
        }
        return (
            <div className="xxCollectionAction">
                <h2 className="xxTitle">{T.get('email')}</h2>
                {
                    (self.state.mode === 'success') ? (
                        <div>
                            <p>{T.get('copy.videoContent.email.success')}</p>
                            <div className="xxCollectionAction-buttons">
                                <button
                                    className="xxButton"
                                    type="button"
                                    data-action-label="info"
                                    onClick={self.handleBackClick}
                                >{T.get('back')}</button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p>{T.get('copy.videoContent.email')}</p>
                            {userMessage}
                            <div className="xxFormField">
                                <label
                                    className="xxLabel"
                                    htmlFor="xx-email-from"
                                >{T.get('label.yourEmail')}</label>
                                <input
                                    ref="email"
                                    className="xxInputText"
                                    id="xx-email-from"
                                    type="text"
                                    placeholder={UTILS.EXAMPLE_EMAIL}
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
                                    className="xxButton xxButton--highlight"
                                    type="button"
                                    onClick={self.handleSubmit}
                                >{T.get('send')}</button>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    },
    handleBackClick: function(e) {
        var self = this;
        self.props.handleMenuChange(e);
    },
    handleSubmit: function(e) {
        var self = this,
            sortedThumbnails = UTILS.fixThumbnails(self.props.thumbnails, true),
            smallRendition = RENDITIONS.findRendition(self.props.thumbnails, 140, 79),
            largeRendition = RENDITIONS.findRendition(self.props.thumbnails, 425, 240)
        ;
        e.preventDefault();
        self.setState({
            mode: 'loading'
        }, function() {
            var options = {
                data: {
                    subject: UTILS.RESULTS_EMAIL_SUBJECT,
                    to_email_address: self.refs.email.value.trim(),
                    template_slug: UTILS.RESULTS_MANDRILL_SLUG,
                    template_args: {
                        'top_thumbnail': self.renditionCheck(largeRendition, sortedThumbnails[0]),
                        'lift': UTILS.makePercentage(sortedThumbnails[0].lift, 0, true),
                        'thumbnail_one': self.renditionCheck(smallRendition, sortedThumbnails[1]),
                        'thumbnail_two': self.renditionCheck(smallRendition, sortedThumbnails[2]),
                        'thumbnail_three': self.renditionCheck(smallRendition, sortedThumbnails[3]),
                        'collection_url': self.state.collectionUrl
                    }
                }
            };
            self.POST('email', options)
                .then(function(res) {
                    self.setState({
                        mode: 'success'
                    });
                })
                .catch(function(err) {
                    E.raiseError(err);
                    self.setState({
                        mode: 'error'
                    });
                })
            ;
        });
        TRACKING.sendEvent(self, arguments, self.props.videoId);
    },
    renditionCheck: function(renditionNumber, thumbnail) {
        return (renditionNumber === RENDITIONS.NO_RENDITION ? thumbnail.url : thumbnail.rendition[renditionNumber].url);
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ShareEmail;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
