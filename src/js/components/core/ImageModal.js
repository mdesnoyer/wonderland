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
                        <a className="button is-primary" download={this.props.copySrc} title="Download this thumbnail" href={this.props.copySrc}>Download</a>
                    </p>
                    <p className="control">
                        <input className="input" type="text" defaultValue={this.props.copySrc} disabled />
                    </p>
                </figcaption>
            </figure>
        );
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ImageModal;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -