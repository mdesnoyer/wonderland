// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import AjaxMixin from '../../mixins/Ajax';
import cookie from 'react-cookie';
import E from '../../modules/errors';
import T from '../../modules/translation';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import VideoGuest from '../wonderland/VideoGuest';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';
import RENDITIONS from '../../modules/renditions';
import SESSION from '../../modules/session';
import OnboardingTutorial from '../wonderland/OnboardingTutorial';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideoPageGuest = React.createClass({
    mixins: [AjaxMixin], // ReactDebugMixin
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    _baseMetaTags: [
        {property: 'fb:app_id', content: UTILS.FACEBOOK_APP_ID},
        {property: 'og:type', content: 'article'},
        {property: 'og:title', content: T.get('copy.share.contentTitle')},
        {property: 'og:description', content: T.get('copy.share.facebook')},
        {property: 'twitter:card', content: 'summary_large_image'},
        {property: 'twitter:site', content: UTILS.NEON_TWITTER_HANDLE},
        {property: 'twitter:description', content: T.get('copy.share.twitter')}
    ],
    // Build urls for the share image service endpoints.
    _buildMetaTagsFromProps: function() {

        var _url = CONFIG.API_HOST +
            this.props.params.accountId +
            '/social/image/'

        // Config is missing the protocol. @TODO
        if(_url.indexOf('http:') == -1 &&
           _url.indexOf('https:') == -1) {
            _url = 'https:' + _url;
        }

        const twitter_image_url = _url + 'twitter/' +
            '?share_token=' +
            this.props.params.shareToken;
        const image_url = _url + 
            '?share_token=' +
            this.props.params.shareToken;

        
        return this._baseMetaTags.concat([
            {property: 'og:image', content: image_url},
            {property: 'og:image:width', content: 800},
            {property: 'og:image:height', content: 800},
            {property: 'twitter:image', content: twitter_image_url}
        ]);
    },
    getInitialState: function () {
        return {
            mode: 'loading',
            showTutorial: false,
            noAccount: false,
            // List of object with property "property" and "content".
            metaTags: self._baseMetaTags,
            duration: null,
            title: null,
            url: null,
            demographicThumbnails: [],
            selectedDemographic: 0,
            videoState: null,
            created: null
        };
    },
    componentDidMount: function() {
        var self = this;

        if (!SESSION.active()) {
            self.setState({
                showTutorial: true,
                noAccount: true
            });
        }

        self.setState({
            metaTags: self._buildMetaTagsFromProps()
        });

        cookie.save(UTILS.COOKIES_KEY.viewShareKey, self.props.params.shareToken, {path: UTILS.COOKIE_DEFAULT_PATH});

        self.GET('videos', {
            overrideAccountId: self.props.params.accountId,
            data: {
                video_id: self.props.params.videoId,
                share_token: self.props.params.shareToken,
                fields: UTILS.VIDEO_FIELDS
            }
        }).then(function(json) {
            const video = json.videos[0];
            self.setState({
                mode: 'success',
                title: video.title,
                duration: video.duration,
                url: video.url,
                demographicThumbnails: video.demographic_thumbnails, 
                selectedDemographic: 0, 
                videoState: video.state,
                created: video.created
            });
        }).catch(function(err) {
            switch (err.code) {
                case 401:
                    E.raiseError(T.get('error.401'));
                    break;
                case 403:
                    E.raiseError(T.get('error.403'));
                case 404:
                    E.raiseError(T.get('error.404'));
                    break;
                default:
                    E.raiseError(T.get('error.generic'));
                    break;
            }
            self.setState({
                mode: 'error'
            });
        });
    },
    onTutorialClose: function(e) {
        var self = this;
        e.preventDefault();
        self.setState({
            showTutorial: false,
        });
    },
    render: function() {
        var self = this;
        try {
            return (
                <main className='xxPage'>
                    <Helmet
                        meta={self.state.metaTags}
                        title={UTILS.buildPageTitle(T.get('copy.videosPage.title'))}
                    />
                    <SiteHeader />
                    {
                        self.state.url? (
                            <VideoGuest
                                videoId={self.props.params.videoId}
                                accountId={self.props.params.accountId}
                                shareToken={self.props.params.shareToken}
                                videoState={self.state.videoState}
                                thumbnails={self.state.thumbnails}
                                sortedThumbnails={self.state.sortedThumbnails}
                                title={self.state.title}
                                duration={self.state.duration}
                                created={self.state.created}
                                url={self.state.url}
                                mode={self.state.mode}
                                demographicThumbnails={self.state.demographicThumbnails}
                                selectedDemographic={self.state.selectedDemographic}
                            />
                        ) : null
                    }
                    {
                        self.state.showTutorial ? (
                            <OnboardingTutorial onClose={self.onTutorialClose} isGuest={true} />
                        ) : null
                    }
                    {
                        self.state.noAccount ? (
                            <div className='xxUpload'>
                                <a
                                    className='xxUploadButton'
                                    title={T.get('action.analyze')}
                                    href={UTILS.DRY_NAV.DEMO.URL}
                                >{T.get('action.analyze')}</a>
                            </div>
                        ) : null
                    }
                    <SiteFooter />
                </main>
            );
        } catch (e) {
            console.error(e);
        }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideoPageGuest;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
