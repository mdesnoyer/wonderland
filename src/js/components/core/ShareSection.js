// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import {ShareButtons, generateShareIcon} from 'react-share';
import UTILS from '../../modules/utils';
import E from '../../modules/errors';
import AjaxMixin from '../../mixins/Ajax';
import Account from '../../mixins/Account';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} = ShareButtons

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const LinkedinIcon = generateShareIcon('linkedin');

var ShareSection = React.createClass({
    mixins: [AjaxMixin, Account],
    propTypes: {
        shareToken: React.PropTypes.string.isRequired,
        videoId: React.PropTypes.string.isRequired,
    },
    getInitialState: function() {
        var self = this;
        return {
            shareToken: self.props.shareToken,
            videoId: self.props.videoId,
            shortUrl: ''
        }
    },
    componentWillMount: function() {
        var self = this;
        self.generateShareUrl();
    },
    render: function() {
        var self = this,
            urlToDisplay = self.determineUrl(),
            customColorBackground = {fill:'#aaa'}
        ;
        return (
            <div className='columns container'>
                <FacebookShareButton
                    onMouseEnter={self.handleMouseEnter}
                    url={urlToDisplay}
                    title={T.get('copy.share.facebook')}
                    className={'column is-3 share-section-icon-color'}
                    >
                    <FacebookIcon
                        onMouseEnter={self.handleMouseEnter}
                        iconBgStyle={customColorBackground}
                        size={32}
                        round />
                </FacebookShareButton>
                <TwitterShareButton
                    url={urlToDisplay}
                    title={T.get('copy.share.twitter')}
                    className={'column is-3 share-section-icon-color'}
                     >
                    <TwitterIcon
                        iconBgStyle={customColorBackground}
                        size={32}
                        round />
                </TwitterShareButton>
                <LinkedinShareButton
                    url={urlToDisplay}
                    title={T.get('copy.share.linkedin')}
                    className={'column is-3 share-section-icon-color'}
                     >
                    <LinkedinIcon
                        iconBgStyle={customColorBackground}
                        size={32}
                        round />
                </LinkedinShareButton>
            </div>
        )
    },
    generateShareUrl: function() {
        var self = this;
        self.getAccount()
            .then(function (account) {
                self.setState({
                    accountId: account.accountId,
                }, function() {
                        self.GET('videos/share', {
                            data: {
                                video_id: self.state.videoId
                            }
                        })
                            .then(function(json) {
                                self.setState({
                                    shareToken: json.share_token,
                                },
                                    function(){
                                        self.shortenUrlWithBitly()
                                    }
                                );
                            })
                            .catch(function(err) {
                                console.log(err);
                            });
                });
            })
            .catch(function (err) {
                console.log(err);
            });
    },
    returnLongUrl: function() {
        //return long form url for initial processing OR if bitly fails
        var self = this;
        return window.location.origin + '/share/video/' + self.state.videoId + '/account/' + self.state.accountId + '/token/' + self.state.shareToken + '/'
    },
    shortenUrlWithBitly: function() {
        //Shorten Long form with bitly UTILITY
        var self = this
        UTILS.shortenUrl(self.returnLongUrl(), self.handleUrlCallback)
        // function below to test bitly until loginless is complete
        // UTILS.shortenUrl('https://development-app.neon-lab.com/share/video/' + self.state.videoId + '/account/' + self.state.accountId + '/token/' + self.state.shareToken + '/', self.handleUrlCallback)
    },
    handleUrlCallback: function(response) {
        //if Bitly response OK then update set state of shortURL
        var self = this;
        response.status_code === 200 && self.setState({shortUrl: response.data.url});
    },
    determineUrl: function() {
        // logic to determine if URL should be set to short or long URL 
        var self = this;
        return self.state.shortUrl !== '' ? self.state.shortUrl : self.returnLongUrl()
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ShareSection;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
