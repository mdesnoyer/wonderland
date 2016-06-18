// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

import XXUploadDialog from './Dialog';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class XXUpload extends React.Component {
    constructor(props) {
        super(props);

        this.toggleOpen = this.toggleOpen.bind(this);
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

    handleUpload() {
        this.props.onSubmit();

        this.setState({
            isOpen: false,
        });
    }

    render() {
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
                        <div className="xxOverlay">
                            <XXUploadDialog onSubmit={this.handleUpload} />
                        </div>
                    ) : null
                }
            </div>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
