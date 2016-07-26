// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import T from '../../modules/translation';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import VideoGuest from '../wonderland/VideoGuest';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';
import SESSION from '../../modules/session';
import OnboardingTutorial from '../wonderland/OnboardingTutorial';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideoPageGuest = React.createClass({
    getInitialState: function () {
        return {
            showTutorial: false,
            noAccount: false
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

        var shareToken;
        if ('shareToken' in self.props.location.query) {
            shareToken = self.props.location.query.shareToken;
        } else {
            shareToken = self.props.params.shareToken;
        }
        while (shareToken.indexOf("__dot") > -1) {
            shareToken = shareToken.replace("__dot", ".");
        }

        return (
            <main className="xxPage">
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.videosPage.title'))}
                    meta={[
                        {property: "og:url", content:"http://www.nytimes.com/2015/02/19/arts/international/when-great-minds-dont-think-alike.html"},
                        {property: "og:type", content:"article"}, 
                        {property: "og:title", content:"When Great Minds Don’t Think Alike"},
                        {property: "og:description", content:"How much does culture influence creative thinking?"},
                        {property: "og:image", content:"http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg"}
                    ]}
                />
                <SiteHeader />
                <VideoGuest
                    videoId={self.props.params.videoId}
                    accountId={self.props.params.accountId}
                    shareToken={shareToken}
                />
                {
                    self.state.showTutorial ? (
                        <OnboardingTutorial onClose={self.onTutorialClose} isGuest={true} />
                    ) : null
                }
                {
                    self.state.noAccount ? (
                        <div className="xxUpload">
                            <a
                                className="xxUploadButton"
                                title={T.get('action.analyze')}
                                href={UTILS.DRY_NAV.DEMO.URL}
                            >{T.get('action.analyze')}</a>
                        </div>
                    ) : null
                }
                <SiteFooter />
            </main>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideoPageGuest;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
