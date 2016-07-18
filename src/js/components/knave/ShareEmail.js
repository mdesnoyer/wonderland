// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import AjaxMixin from '../../mixins/Ajax';
import T from '../../modules/translation';
import E from '../../modules/errors';
import UTILS from '../../modules/utils';

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
                <p>{T.get('copy.videoContent.email')}</p>
                
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
                                    ref="email"
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
            sortedThumbnails = UTILS.fixThumbnails(self.props.thumbnails, true)
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
                        'top_thumbnail': sortedThumbnails[0].url,
                        'lift': ((parseInt(sortedThumbnails[0].lift * 100)).toString() + '%'),
                        'thumbnail_one': sortedThumbnails[1].url,
                        'thumbnail_two': sortedThumbnails[2].url,
                        'thumbnail_three': sortedThumbnails[3].url,
                        'collection_url': self.state.collectionUrl,
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
        })
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ShareEmail;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
