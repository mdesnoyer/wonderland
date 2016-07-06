// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import ReactDOM from 'react-dom';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import XXUploadDialog from './Dialog';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class XXUpload extends React.Component {
    constructor(props) {
        super(props);

        this.toggleOpen = this.toggleOpen.bind(this);
        this.handleBgCloseClick = this.handleBgCloseClick.bind(this);
        this.handleUpload = this.handleUpload.bind(this);

        this.state = {
            isOpen: false,
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
            });
        }
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
            });
        }
    }

    handleUpload() {
        this.props.onSubmit();

        if (!this.props.isOnboarding) {
            this.setState({
                isOpen: false,
            });
        }
    }

    render() {
        const { handleBgCloseClick, handleUpload } = this;
        const { isOnboarding } = this.props;
        const { isOpen } = this.state;

        const className = ['xxUpload'];
        if (isOpen) {
            className.push('is-open');
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
                            <div className="xxOverlay" ref={overlay => this._overlay = overlay} onClick={handleBgCloseClick}>
                                <XXUploadDialog
                                    isOnboarding={isOnboarding}
                                    onSubmit={handleUpload}
                                />
                            </div>
                        ) : null
                    }
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
