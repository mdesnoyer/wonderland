// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import AJAX from '../../modules/ajax';
import ModalWrapper from '../core/ModalWrapper';
import ImageModal from '../core/ImageModal';
import ThumbBox from '../wonderland/ThumbBox';

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
            additionalClass = 'tag is-' + (self.state.isEnabled ? self.props.videoStateMapping : 'disabled') + ' is-large wonderland-thumbnail__score',
            caption = 'Thumbnail ' + (self.props.index + 1),
            enabledDisabled = self.state.isBusy ? 'disabled' : '',
            src = (self.props.forceOpen ? self.props.strippedUrl : '/img/clear.gif'),
            dataSrc = (self.props.forceOpen ? '' : self.props.strippedUrl),
            figureClassName = 'wonderland-thumbnail ' + (self.state.isEnabled ? 'is-wonderland-enabled' : 'is-wonderland-disabled'),
            indicator = self.state.isEnabled ? 'fa-check-circle' : 'fa-times-circle'
        ;
        return (
            <figure
                className={figureClassName}
                data-raw-neonscore={self.props.rawNeonScore}
                data-cooked-neonscore={self.props.cookedNeonScore}
                data-type={self.props.type}
                data-enabled={self.state.isEnabled}
                data-thumbnail-id={self.props.thumbnailId}
            >
                <img
                    ref="thumbnailImage"
                    className="wonderland-thumbnail__image"
                    src={src}
                    data-src={dataSrc}
                    alt={caption}
                    title={caption}
                    onClick={self.handleEnabledChange}
                />
                <figcaption className="wonderland-thumbnail__caption">
                    <span className={additionalClass} title="NeonScore">{self.props.cookedNeonScore}</span>
                    <input title="Enable/Disable this Thumbnail" className="wonderland-thumbnail__enabled is-medium" onChange={self.handleEnabledChange} checked={self.state.isEnabled} type="checkbox" disabled={enabledDisabled} />
                    <span onClick={self.handleEnabledChange} className="wonderland-thumbnail__indicator"><i className={'fa ' + indicator}></i></span>
                    <ThumbBox
                        copyUrl={self.props.url}
                        downloadUrl={self.props.url}
                        handleToggleModal={self.handleToggleModal}
                    />
                </figcaption>
                <ModalWrapper isModalActive={self.state.isModalActive} handleToggleModal={self.handleToggleModal}>
                    <ImageModal
                        caption={caption}
                        strippedUrl={self.props.strippedUrl}
                        copyUrl={self.props.url}
                        downloadUrl={self.props.url}
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
    handleEnabledChange: function(e) {
        var self = this,
            options = {
                data: {
                    thumbnail_id: self.props.thumbnailId,
                    enabled: self.state.isEnabled ? '0' : '1' // yes this is reversed because isEnabled has not changed yet
                }
            }
        ;
        self.setState({
            isBusy: true,
            isEnabled: !self.state.isEnabled
        }, function() {
            AJAX.doPut('thumbnails', options)
                .then(function(json) {
                    if (self._isMounted) {
                        self.setState({
                            isBusy: false
                        });
                    }
                })
                .catch(function(err) {
                    if (self._isMounted) {
                        self.setState({
                            isBusy: false,
                            isEnabled: !self.state.isEnabled // put it back
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
