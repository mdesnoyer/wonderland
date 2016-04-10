// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var ImageModal = React.createClass({
    render: function() {
        return (
            <figure className="wonderland-thumbnail">
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
        );
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ImageModal;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -