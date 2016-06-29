// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import AjaxMixin from '../../mixins/Ajax';
import ThumbBox from '../wonderland/ThumbBox';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';
import TRACKING from '../../modules/tracking';
import Icon from '../core/Icon';
import Hud from './Hud';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Thumbnail = React.createClass({
    mixins: [AjaxMixin], // ReactDebugMixin
    propTypes: {
        isGuest: React.PropTypes.bool.isRequired,
        isEnabled: React.PropTypes.bool.isRequired,
        index: React.PropTypes.number.isRequired,
        rawNeonScore: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
        cookedNeonScore: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]).isRequired,
        type: React.PropTypes.string.isRequired,
        frameNo: React.PropTypes.number,
        url: React.PropTypes.string.isRequired,
        strippedUrl: React.PropTypes.string.isRequired,
        isServingEnabled: React.PropTypes.bool.isRequired,
        width: React.PropTypes.number.isRequired,
        height: React.PropTypes.number.isRequired,
        thumbnailId: React.PropTypes.string.isRequired,
        created: React.PropTypes.string.isRequired,
        updated: React.PropTypes.string.isRequired,
        ctr: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
        handleToggleModal: React.PropTypes.func.isRequired,
        handleEnabledChange: React.PropTypes.func.isRequired,
        isModalActive: React.PropTypes.bool.isRequired,
        thumbnailStats: React.PropTypes.object
    },
    getInitialState: function () {
        var self = this;
        return {
            isEnabled: self.props.isEnabled,
            isLoading: false
        };
    },
    componentWillReceiveProps: function(nextProps) {
        var self = this;
        self.setState({
            isEnabled: nextProps.isEnabled
        });
    },
    render: function() {
        var self = this,
            neonScoreClass = 'tag' + (self.props.isModalActive ? ' is-large' : ' is-medium') + ' wonderland-thumbnail__neonscore' + (self.state.isEnabled ? ' is-primary' : ' is-disabled'),
            caption = 'Thumbnail ' + (self.props.index + 1),
            enabledDisabled = self.state.isLoading ? 'disabled' : '',
            src = self.props.strippedUrl,
            boxClass = 'box wonderland-box' + (self.props.type === 'default' ? ' -alt' : ''),
            rubricClass = 'wonderland-thumbnail__rubric' + (self.props.type === 'default' ? '' : ' is-hidden'),
            figureClass = 'wonderland-thumbnail ' + (self.state.isEnabled ? 'is-wonderland-enabled' : 'is-wonderland-disabled') + ' -' + self.props.type,
            enabledIndicator = UTILS.enabledDisabledIcon(self.state.isEnabled), // we want the opposite
            neonScore = (UTILS.NEON_SCORE_ENABLED && self.props.type === 'neon') ? <span className={neonScoreClass} title={T.get('neonScore')}><Icon type="neon" />{self.props.cookedNeonScore}</span> : false,
            handleEnabledChangeHook = self.props.isServingEnabled ? self.handleEnabledChange : function() { return false; }
        ;
        return (
            <div className={boxClass}>
                <small className={rubricClass}>
                    {T.get('copy.currentThumbnail')}
                </small>
                <figure
                    className={figureClass}
                    data-raw-neonscore={self.props.rawNeonScore}
                    data-cooked-neonscore={self.props.cookedNeonScore}
                    data-type={self.props.type}
                    data-enabled={self.state.isEnabled}
                    data-thumbnail-id={self.props.thumbnailId}
                >
                    <img
                        ref="thumbnailImage"
                        className={'wonderland-thumbnail__image -' + self.props.type}
                        src={src}
                        alt={caption}
                        title={caption}
                        onClick={self.handleToggleModal}
                    />
                    <figcaption className="wonderland-thumbnail__caption">
                        {neonScore}
                        <input
                            className="wonderland-thumbnail__enabled"
                            onChange={handleEnabledChangeHook}
                            checked={self.state.isEnabled}
                            type="checkbox"
                            disabled={enabledDisabled}
                        />
                        <span
                            onClick={self.handleToggleModal}
                            className="wonderland-thumbnail__indicator"
                        >
                            <Icon
                                type={enabledIndicator}
                                nowrap={true}
                            />
                        </span>
                        <ThumbBox
                            copyUrl={self.props.url}
                            downloadUrl={self.props.url}
                            isEnabled={self.state.isEnabled}
                            handleToggleModal={self.handleToggleModal}
                            handleEnabledChange={handleEnabledChangeHook}
                            isServingEnabled={self.props.isServingEnabled}
                            type={self.props.type}
                            isModalActive={self.props.isModalActive}
                        />
                    </figcaption>
                </figure>
                <Hud
                    isGuest={self.props.isGuest}
                    stats={self.props.thumbnailStats}
                    cookedNeonScore={self.props.cookedNeonScore}
                />
            </div>
        );
    },
    handleToggleModal: function(e) {
        var self = this;
        TRACKING.sendEvent(self, arguments, self.props.url);
        self.props.handleToggleModal(self.props.index);
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
            isLoading: true,
            isEnabled: !self.state.isEnabled
        }, function() {
            self.PUT('thumbnails', options)
                .then(function(json) {
                    self.setState({
                        isLoading: false
                    }, function() {
                        self.props.handleEnabledChange(self.props.index)
                    });
                })
                .catch(function(err) {
                    self.setState({
                        isLoading: false,
                        isEnabled: !self.state.isEnabled // put it back
                    }, function() {
                        self.props.handleEnabledChange(self.props.index)
                    });
                })
            ;
            })
        ;
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Thumbnail;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
