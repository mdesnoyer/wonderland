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
            thumbnails: self.props.thumbnails,
            collectionUrl: self.props.collectionUrl
        }
    },
    componentWillMount: function() {
        var self = this;
        UTILS.shortenUrl(self.state.collectionUrl, self.handleUrlCallback);
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
        var self = this;
        return (
            <div className="xxCollectionAction">
                <h2 className="xxTitle">{T.get('email')}</h2>
                <p>{T.get('copy.videoContent.email')}</p>
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
                        placeholder="you@email.com"
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
        );
    },
    handleBackClick: function(e) {
        var self = this;
        self.props.handleMenuChange(e);
    },
    handleSubmit: function(e) {
        var self = this;
        e.preventDefault();
        self.setState({
            mode: 'loading'
        }, function() {
            var options = self.dataMaker();
            console.log(options);
            // self.POST('email', options)
            //     .then(function(res) {
            //         self.setState({
            //             mode: 'success'
            //         });
            //     })
            //     .catch(function(err) {
            //         E.raiseError(err);
            //         self.setState({
            //             mode: 'error'
            //         });
            //     })
            // ;
        })
    },
    dataMaker: function() {
        var self = this,
            top_thumbnail = false,
            lift = 0,
            thumbnail_one = false,
            thumbnail_two = false,
            thumbnail_three = false
        ;
        self.props.thumbnails.forEach(function(thumbnail) {
            if (thumbnail.type === 'neon') {
                switch (thumbnail.rank) {
                    case 0:
                        top_thumbnail = thumbnail.url;
                        lift = thumbnail.lift;
                        break;
                    case 1:
                        thumbnail_one = thumbnail.url
                        break;
                    case 2:
                        thumbnail_two = thumbnail.url
                        break;
                    case 3:
                        thumbnail_three = thumbnail.url
                        break;
                    default:
                        break;
                }
            }
        });
        var data = {
            data: {
                subject: UTILS.RESULTS_EMAIL_SUBJECT,
                to_email_address: self.refs.email.value.trim(),
                template_slug: UTILS.RESULTS_MANDRILL_SLUG,
                template_args: {
                    'top_thumbnail': top_thumbnail,
                    'lift': lift,
                    'thumbnail_one': thumbnail_one,
                    'thumbnail_two': thumbnail_two,
                    'thumbnail_three': thumbnail_three,
                    'collection_url': self.state.collectionUrl,
                }
            }
        }
        return data; 
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ShareEmail;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
