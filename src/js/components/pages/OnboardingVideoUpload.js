import React from 'react';
import T from '../../modules/translation';
import VideoUploadForm from '../knave/VideoUploadForm';

export default class OnboardingVideoUpload extends React.Component {
    constructor(props) {
        super(props);

        this.showAnalyzingPage = this.showAnalyzingPage.bind(this);

        this.state = {
            isAnalyzing: false,
        };
    }

    showAnalyzingPage() {
        this.setState({ isAnalyzing: true });
    }

    render() {
        const { isAnalyzing }= this.state;

        return (
            <div className="xxUpload">
                <VideoUploadForm isOnboarding postHook={this.showAnalyzingPage} />

                <div className="xxUploadButton-help">
                    <span className="xxUploadButton-helpCircle"></span>
                    <span className="xxUploadButton-helpLine"></span>
                    {T.get('copy.onboarding.uploadHelpText')}
                </div>

                {
                    isAnalyzing ? (
                        <h1>ANALYZING</h1>
                    ) : null
                }
            </div>
        );
    }
}
