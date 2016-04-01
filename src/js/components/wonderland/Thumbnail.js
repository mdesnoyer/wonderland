// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import AJAX from '../../modules/ajax';
import ModalWrapper from '../core/ModalWrapper';
import ImageModal from '../core/ImageModal';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Thumbnail = React.createClass({
    getInitialState: function () {
        return {
            checked: this.props.thumbnail.enabled || false,
            isModalActive: false,
            busy: false
        };
    },
    handleToggleModal: function(e) {
        var self = this;
        self.setState({
            isModalActive: !self.state.isModalActive
        });
    },
    handleEnabledChange: function(e) {
        var self = this,
            options = {
                data: {
                    thumbnail_id: this.props.thumbnail.thumbnailId,
                    enabled: self.state.checked ? '0' : '1' // yes this is reversed because checked has not changed yet
                }
            }
        ;
        self.setState({
            busy: true
        });
        AJAX.doPut('thumbnails', options)
            .then(function(json) {
                self.setState({
                    checked: !self.state.checked,
                    busy: false
                });
            })
            .catch(function(err) {
                console.error(err.responseText);
                    self.setState({
                        busy: false
                    });
            });
    },
    render: function() {
        var self = this,
            additionalClass = 'tag is-' + self.props.videoStateMapping + ' is-medium wonderland-thumbnail__score',
            caption = 'Thumbnail ' + (self.props.index + 1),
            url = self.props.thumbnail.url,
            cookedNeonScore = self.props.thumbnail.cookedNeonScore,
            thumbnailId = self.props.thumbnail.thumbnailId,
            enabledDisabled = self.state.busy ? 'disabled' : ''
        ;
        return (
            <figure
                className="wonderland-thumbnail"
                data-raw-neonscore={self.props.thumbnail.rawNeonScore}
                data-cooked-neonscore={cookedNeonScore}
                data-type={self.props.thumbnail.type}
                data-enabled={self.props.thumbnail.enabled}
                data-thumbnail-id={thumbnailId}
            >
                <img className="wonderland-thumbnail__image" src={url} alt={caption} title={caption} onClick={self.handleToggleModal} />
                <figcaption className="wonderland-thumbnail__caption">
                    <span className={additionalClass} title="NeonScore">{cookedNeonScore}</span>
                    <input className="wonderland-thumbnail__enabled" onChange={self.handleEnabledChange} checked={self.state.checked} type="checkbox" disabled={enabledDisabled} />
                </figcaption>
                <ModalWrapper isModalActive={self.state.isModalActive} handleToggleModal={self.handleToggleModal}>
                    <ImageModal src={url} caption={caption} />
                </ModalWrapper>
            </figure>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Thumbnail;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
