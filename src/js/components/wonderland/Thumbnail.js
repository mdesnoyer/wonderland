// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import AJAX from '../../modules/ajax';
import ModalWrapper from '../core/ModalWrapper';
import ImageModal from '../core/ImageModal';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Thumbnail = React.createClass({
    propTypes: {
        isEnabled: React.PropTypes.bool.isRequired,
        videoStateMapping: React.PropTypes.string.isRequired,
        index: React.PropTypes.number.isRequired,
        rawNeonScore: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
        cookedNeonScore: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]).isRequired,
        type: React.PropTypes.string.isRequired,
        thumbnailId: React.PropTypes.string.isRequired,
        url: React.PropTypes.string.isRequired,
        strippedUrl: React.PropTypes.string.isRequired,
        forceOpen: React.PropTypes.bool.isRequired,
    },
    getInitialState: function () {
        var self = this;
        return {
            isEnabled: self.props.isEnabled,
            isModalActive: false,
            isBusy: false
        };
    },
    componentDidMount: function() {
        var self = this;
        if (!self.props.forceOpen) {
            // We want to sneak these in since it is closed
            var thumbnailImage = self.refs.thumbnailImage,
                bufferImage = new Image()
            ;
            bufferImage.onload = function() {
                var _self = this; // img
                thumbnailImage.setAttribute('src', _self.src);
            };
            bufferImage.src = thumbnailImage.getAttribute('data-src');
        }
        self._isMounted = true;
    },
    componentWillUnmount: function() {
        var self = this;
        self._isMounted = false;
    },
    render: function() {
        var self = this,
            additionalClass = 'tag is-' + self.props.videoStateMapping + ' is-medium wonderland-thumbnail__score',
            caption = 'Thumbnail ' + (self.props.index + 1),
            enabledDisabled = self.state.isBusy ? 'disabled' : '',
            src = (self.props.forceOpen ? self.props.strippedUrl : '/img/clear.gif'),
            dataSrc = (self.props.forceOpen ? '' : self.props.strippedUrl)
        ;
        return (
            <figure
                className="wonderland-thumbnail"
                data-raw-neonscore={self.props.rawNeonScore}
                data-cooked-neonscore={self.props.cookedNeonScore}
                data-type={self.props.type}
                data-enabled={self.props.isEnabled}
                data-thumbnail-id={self.props.thumbnailId}
            >
                <img
                    ref="thumbnailImage"
                    className="wonderland-thumbnail__image"
                    src={src}
                    data-src={dataSrc}
                    alt={caption}
                    title={caption}
                    onClick={self.handleToggleModal}
                />
                <figcaption className="wonderland-thumbnail__caption">
                    <span className={additionalClass} title="NeonScore">{self.props.cookedNeonScore}</span>
                    <input className="wonderland-thumbnail__enabled" onChange={self.handleisEnabledChange} checked={self.state.isEnabled} type="checkbox" disabled={enabledDisabled} />
                </figcaption>
                <ModalWrapper isModalActive={self.state.isModalActive} handleToggleModal={self.handleToggleModal}>
                    <ImageModal
                        src={self.props.strippedUrl}
                        copySrc={self.props.url}
                        caption={caption}
                    />
                </ModalWrapper>
            </figure>
        );
    },
    handleToggleModal: function(e) {
        var self = this;
        self.setState({
            isModalActive: !self.state.isModalActive
        });
    },
    handleisEnabledChange: function(e) {
        var self = this,
            options = {
                data: {
                    thumbnail_id: self.props.thumbnailId,
                    enabled: self.state.isEnabled ? '0' : '1' // yes this is reversed because isEnabled has not changed yet
                }
            }
        ;
        self.setState({
            isBusy: true
        }, function() {
            AJAX.doPut('thumbnails', options)
                .then(function(json) {
                    if (self._isMounted) {
                        self.setState({
                            isEnabled: !self.state.isEnabled,
                            isBusy: false
                        });
                    }
                })
                .catch(function(err) {
                    if (self._isMounted) {
                        self.setState({
                            isBusy: false
                        });
                    }
                });
            })
        ;
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Thumbnail;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
