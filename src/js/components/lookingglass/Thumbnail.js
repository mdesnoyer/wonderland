// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import ImageModal from '../core/ImageModal';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var Thumbnail = React.createClass({
    getInitialState: function () {
        return {
            checked: this.props.thumbnail.enabled || false,
            isModalActive: false
        };
    },
    toggleModal: function(e) {
        this.setState({
            isModalActive: !this.state.isModalActive
        });
    },
    handleEnabledChange: function(e) {
        this.setState({
            checked: !this.state.checked
        });
    },
    render: function() {
        var self = this,
            additionalClass = 'tag is-' + self.props.videoStateMapping + ' is-medium wonderland-thumbnail__score',
            caption = 'Thumbnail ' + (self.props.index + 1),
            url = self.props.thumbnail.url,
            cookedNeonScore = self.props.thumbnail.cookedNeonScore
        ;
        return (
            <figure
                className="wonderland-thumbnail"
                data-raw-neonscore={self.props.thumbnail.rawNeonScore}
                data-cooked-neonscore={cookedNeonScore}
                data-type={self.props.thumbnail.type}
                data-enabled={self.props.thumbnail.enabled}
            >
                <img className="wonderland-thumbnail__image" src={url} alt={caption} title={caption} onClick={this.toggleModal} />
                <figcaption className="wonderland-thumbnail__caption">
                    <span className={ additionalClass } title="NeonScore">{cookedNeonScore}</span>
                    <input className="wonderland-thumbnail__enabled" onChange={self.handleEnabledChange} checked={self.state.checked} type="checkbox" />
                </figcaption>
                <ImageModal src={url} isModalActive={this.state.isModalActive} toggleModal={this.toggleModal} caption={caption} />
            </figure>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default Thumbnail;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
