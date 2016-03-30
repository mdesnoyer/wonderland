// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var ImageModal = React.createClass({
    handleToggleModal: function(e) {
        this.props.toggleModal();
    },
    render() {
        var self = this,
            modalClass = 'modal' + (this.props.isModalActive ? ' is-active' : '')
        ;
        return (
            <div className={modalClass}>
                <div className="modal-background"></div>
                <div className="wonderland-modal-content modal-content">
                    <figure
                        className="wonderland-thumbnail"
                    >
                        <img className="wonderland-thumbnail__image" src={this.props.src} alt={this.props.caption} title={this.props.caption} />
                        <figcaption className="wonderland-thumbnail__caption">
                            <p className="control">
                                <a className="button is-primary" download={this.props.src} title="Download this thumbnail" href={this.props.src}>Download</a>
                            </p>
                            <p className="control">
                                <input className="input" type="text" defaultValue={this.props.src} disabled />
                            </p>
                        </figcaption>
                    </figure>
                </div>
                <button className="modal-close" onClick={self.handleToggleModal}></button>
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default ImageModal;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
