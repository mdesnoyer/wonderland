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
        return (
            <main className="xxPage">
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.videosPage.title'))}
                />
                <SiteHeader />
                <VideoGuest
                    videoId={self.props.params.videoId}
                    accountId={self.props.params.accountId}
                    shareToken={self.props.params.shareToken}
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
