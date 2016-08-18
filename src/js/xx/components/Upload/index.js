// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import ReactDOM from 'react-dom';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import XXUploadDialogPhoto from './DialogPhoto';
import XXUploadDialogVideo from './DialogVideo';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class XXUpload extends React.Component {
    constructor(props) {
        super(props);

        this.toggleOpen = this.toggleOpen.bind(this);
        this.handleOpenPhoto = this.handleOpenPhoto.bind(this);
        this.handleOpenVideo = this.handleOpenVideo.bind(this);
        this.handleBgCloseClick = this.handleBgCloseClick.bind(this);
        this.handleUpload = this.handleUpload.bind(this);

        this.state = {
            isOpen: false,
            isOpenPhoto: false,
            isOpenVideo: false,
        };
    }

    componentDidMount() {
        if (this.props.isOnboarding) {
            this.__onboardingCountdown = setTimeout(() => {
                this.setState({isOpen: true});
            }, 10 * 1000);
        }
    }

    componentWillUnmount() {
        if (this.__onboardingCountdown) {
            clearTimeout(this.__onboardingCountdown);
            this.__onboardingCountdown = null;
        }
    }

    toggleOpen(e) {
        e.preventDefault();

        if (this.props.onClose && this.state.isOpen) {
            this.props.onClose();
        }

        if (!this.props.isOnboarding || !this.state.isOpen) {
            this.setState({
                isOpen: !this.state.isOpen,
                isOpenPhoto: false,
                isOpenVideo: false,
            });
        }
    }

    handleOpenPhoto(e) {
        e.preventDefault();

        this.setState({
            isOpenPhoto: true,
        });
    }

    handleOpenVideo(e) {
        e.preventDefault();

        this.setState({
            isOpenVideo: true,
        });
    }

    handleBgCloseClick(e) {
        if (this._overlay !== e.target && this._overlay.children[0] !== e.target && this._overlay.contains(e.target)) {
            return;
        }

        if (this.props.onClose) {
            this.props.onClose();
        }

        if (!this.props.isOnboarding) {
            this.setState({
                isOpen: false,
                isOpenPhoto: false,
                isOpenVideo: false,
            });
        }
    }

    handleUpload() {
        this.props.onSubmit();

        if (!this.props.isOnboarding) {
            this.setState({
                isOpen: false,
                isOpenPhoto: false,
                isOpenVideo: false,
            });
        }
    }

    render() {
        const { handleBgCloseClick, handleUpload } = this;
        const { isOnboarding } = this.props;
        const { isOpen, isOpenPhoto, isOpenVideo } = this.state;

        const className = ['xxUpload'];
        if (isOpen) {
            className.push('is-open');
        }
        if (isOpenPhoto || isOpenVideo) {
            className.push('has-dialog');
        }

        return (
            <div className={className.join(' ')}>
                <a
                    href=""
                    className="xxUploadButton"
                    title="Analyze"
                    onClick={this.toggleOpen}
                >Upload</a>

                {
                    isOnboarding && !isOpen ? (
                        <div className="xxUploadButton-help">
                            <span className="xxUploadButton-helpCircle"></span>
                            <span className="xxUploadButton-helpLine"></span>
                            Upload a video at any time by clicking here
                        </div>
                    ) : null
                }

                <ReactCSSTransitionGroup transitionName="xxFadeInOutFast" transitionEnterTimeout={200} transitionLeaveTimeout={200}>
                    {
                        isOpen ? (
                            <div
                                className="xxOverlay"
                                ref={overlay => this._overlay = overlay}
                                onClick={handleBgCloseClick}
                                key="upload-overlay"
                            >
                                <ReactCSSTransitionGroup transitionName="xxFadeInOutFast" transitionEnterTimeout={200} transitionLeaveTimeout={200}>
                                    {
                                        !isOpenPhoto && !isOpenVideo ? (
                                            <div className="xxUploadTypes" key="upload-types">
                                                <a
                                                    href=""
                                                    className="xxUploadTypes-button xxUploadTypes-button--photo"
                                                    onClick={this.handleOpenPhoto}
                                                ><span className="xxUploadTypes-buttonLabel">Photo</span></a>

                                                <a
                                                    href=""
                                                    className="xxUploadTypes-button xxUploadTypes-button--video"
                                                    onClick={this.handleOpenVideo}
                                                ><span className="xxUploadTypes-buttonLabel">Video</span></a>
                                            </div>
                                        ) : null
                                    }
                                    {
                                        isOpenPhoto ? (
                                            <XXUploadDialogPhoto
                                                isOnboarding={isOnboarding}
                                                onSubmit={handleUpload}
                                                key="upload-photo"
                                            />
                                        ) : null
                                    }
                                    {
                                        isOpenVideo ? (
                                            <XXUploadDialogVideo
                                                isOnboarding={isOnboarding}
                                                onSubmit={handleUpload}
                                                key="upload-video"
                                            />
                                        ) : null
                                    }
                                </ReactCSSTransitionGroup>
                            </div>
                        ) : null
                    }
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
