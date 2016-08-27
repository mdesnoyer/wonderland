// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import SESSION from '../../modules/session';
import reqwest from 'reqwest';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var YoutubeUpload = React.createClass({
    propTypes: {
        thumbnails: React.PropTypes.array.isRequired
    },
    handleClick: function(e) {
        var self = this;
        e.preventDefault();
        if (SESSION.hasYoutubeAuth()) {
            // check that they own the video in question
            // if yes, update the video's thumbnail
        }
        else {
            reqwest({
                url: UTILS.YOUTUBE_OAUTH_URL,
                method: 'GET',
                type: 'json',
                headers: {
                   'Access-Control-Allow-Origin' : '*',
                },
                data: {
                    client_id: UTILS.YOUTUBE_CLIENT_ID,
                    redirect_uri: UTILS.YOUTUBE_REDIRECT_URI,
                    response_type: 'token',
                    scope: UTILS.YOUTUBE_OAUTH_SCOPE
                }
            }).then(function(res) {
                reqwest({ // validate token
                    url: UTILS.YOUTUBE_VALIDATION_URL,
                    method: 'GET',
                    type: 'json',
                    headers: {
                       'Access-Control-Allow-Origin' : '*',
                    },
                    data: {
                        access_token: res.access_token
                    }
                }).then(function(res) {
                    console.log(res);
                }).catch(function(err) {
                    console.log(err);
                });
            }).catch(function(err) {
                console.log(err);
            });
        }
    },
    render: function() {
        var self = this;
        return (
            <ul className="xxCollectionActions">
                <li className="xxCollectionActions-item">
                    <a href="#" onClick={self.handleClick}>Youtube</a>
                </li>
            </ul>
        );
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default YoutubeUpload

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
