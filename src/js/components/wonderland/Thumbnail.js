// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import AJAX from '../../modules/ajax';
import ModalParent from '../core/ModalParent';
import ImageModalChild from '../core/ImageModalChild';
import ThumbBox from '../wonderland/ThumbBox';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Thumbnail = React.createClass({
    propTypes: {
        isEnabled: React.PropTypes.bool.isRequired,
        videoStateMapping: React.PropTypes.string.isRequired,
        index: React.PropTypes.number.isRequired,
        rawNeonScore: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
        cookedNeonScore: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]).isRequired,
        type: React.PropTypes.string.isRequired,
        frameNo: React.PropTypes.number.isRequired,
        url: React.PropTypes.string.isRequired,
        strippedUrl: React.PropTypes.string.isRequired,
        forceOpen: React.PropTypes.bool.isRequired,
        isAccountServingEnabled: React.PropTypes.bool.isRequired,
        width: React.PropTypes.number.isRequired,
        height: React.PropTypes.number.isRequired,
        thumbnailId: React.PropTypes.string.isRequired,
        created: React.PropTypes.string.isRequired,
        updated: React.PropTypes.string.isRequired,
        ctr: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
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
            additionalClass = 'tag is-' + (self.state.isEnabled ? self.props.videoStateMapping : 'disabled') + ' is-medium wonderland-thumbnail__score',
            caption = 'Thumbnail ' + (self.props.index + 1),
            enabledDisabled = self.state.isBusy ? 'disabled' : '',
            src = (self.props.forceOpen ? self.props.strippedUrl : '/img/clear.gif'),
            dataSrc = (self.props.forceOpen ? '' : self.props.strippedUrl),
            figureClassName = 'wonderland-thumbnail ' + (self.state.isEnabled ? 'is-wonderland-enabled' : 'is-wonderland-disabled'),
            enabledIndicator = UTILS.enabledDisabledIcon(self.state.isEnabled), // we want the opposite
            neonScore = UTILS.NEON_SCORE_ENABLED ? <span className={additionalClass} title={T.get('neonScore')}>{self.props.cookedNeonScore}</span> : '',
            handleEnabledChangeHook = self.props.isAccountServingEnabled ? self.handleEnabledChange : function() { return false; }
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
                    onClick={self.handleToggleModal}
                />
                <figcaption className="wonderland-thumbnail__caption">
                    {neonScore}
                    <input className="wonderland-thumbnail__enabled is-medium" onChange={handleEnabledChangeHook} checked={self.state.isEnabled} type="checkbox" disabled={enabledDisabled} />
                    <span onClick={self.handleToggleModal} className="wonderland-thumbnail__indicator -background"><i className="fa fa-circle"></i></span>
                    <span onClick={self.handleToggleModal} className="wonderland-thumbnail__indicator -foreground"><i className={'fa fa-' + enabledIndicator}></i></span>
                    <ThumbBox
                        copyUrl={self.props.url}
                        downloadUrl={self.props.url}
                        isEnabled={self.state.isEnabled}
                        handleToggleModal={self.handleToggleModal}
                        handleEnabledChange={handleEnabledChangeHook}
                        isAccountServingEnabled={self.props.isAccountServingEnabled}
                    />
                </figcaption>
                <ModalParent
                    isModalActive={self.state.isModalActive}
                    handleToggleModal={self.handleToggleModal}
                    isModalContentClipped={true}
                >
                    <ImageModalChild
                        caption={caption}
                        strippedUrl={self.props.strippedUrl}
                        copyUrl={self.props.url}
                        downloadUrl={self.props.url}
                        isEnabled={self.state.isEnabled}
                        handleEnabledChange={handleEnabledChangeHook}
                        isAccountServingEnabled={self.props.isAccountServingEnabled}
                        type={self.props.type}
                        frameNo={self.props.frameNo}
                        width={self.props.width}
                        height={self.props.height}
                        thumbnailId={self.props.thumbnailId}
                        created={self.props.created}
                        updated={self.props.updated}
                        ctr={self.props.ctr}
                    />
                </ModalParent>
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
