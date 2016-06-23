// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import ReactDOM from 'react-dom';

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

    toggleOpen(e) {
        e.preventDefault();

        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    handleBgCloseClick(e) {
        if (this._overlay !== e.target && this._overlay.children[0] !== e.target && this._overlay.contains(e.target)) {
            return;
        }

        this.setState({
            isOpen: false,
        });
    }

    handleUpload() {
        this.props.onSubmit();

        this.setState({
            isOpen: false,
        });
    }

    render() {
        const { handleBgCloseClick, handleUpload } = this;
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
                    onClick={this.toggleOpen}
                >Upload</a>

                {
                    isOpen ? (
                        <div className="xxOverlay" ref={overlay => this._overlay = overlay} onClick={handleBgCloseClick}>
                            <XXUploadDialog onSubmit={handleUpload} />
                        </div>
                    ) : null
                }
            </div>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
