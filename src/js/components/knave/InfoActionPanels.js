// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, {PropTypes} from 'react';

import ReactTooltip from 'react-tooltip';
import _ from 'lodash';

import CollectionLoadingText from '../core/CollectionLoadingText';
import DemographicFilters from './DemographicFilters';
import Message from '../wonderland/Message';
import Lift from './Lift';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// TODO candidate for HoC refactor
// TODO make *Control a prop of its panel

export const InfoDemoLiftPanel = React.createClass({
    propTypes: {
        // User's name of this collection
        title: PropTypes.string.isRequired,
        onDemographicChange: PropTypes.func.isRequired,
        demographicOptions: PropTypes.array.isRequired,
        selectedDemographic: PropTypes.array.isRequired,
        // whether or not the panel should display the refilter 
        // button, defaults to true 
        displayRefilterButton: PropTypes.bool,
        // The value to show in the Lift component
        liftValue: PropTypes.number,
        isSoloImage: React.PropTypes.bool,
        handleRefiltersPanelClick: React.PropTypes.func
    },
    getDefaultProps: function() {
        return {
            displayRefilterButton: true
        };
    },
    render: function() {
        var self = this;
        return (
            <div>
                <h1 className="xxCollection-title">
                    {this.props.title}
                </h1>
                <DemographicFilters
                    onChange={this.props.onDemographicChange}
                    demographicOptions={this.props.demographicOptions}
                    selectedDemographic={this.props.selectedDemographic}
                    displayRefilterButton={this.props.displayRefilterButton} 
                    handleRefiltersPanelClick={self.props.handleRefiltersPanelClick}
                />
                <Lift
                    displayThumbLift={this.props.liftValue}
                    isSoloImage={self.props.isSoloImage}
                />
            </div>
        );
    }
});

export const InfoLiftPanel = React.createClass({
    propTypes: {
        // User's name of this collection
        title: PropTypes.string.isRequired,
        lift: PropTypes.number,
        isSoloImage: React.PropTypes.bool
    },
    render: function() {
        var self = this;
        return (
            <div>
                <h1 className="xxCollection-title">
                    {this.props.title}
                </h1>
                <Lift
                    displayThumbLift={this.props.liftValue}
                    isSoloImage={self.props.isSoloImage}
                />
            </div>
        );
    }
});

export const FilterPanel = React.createClass({
    render: () => {
        return <h1>{T.get('label.filterResults')}</h1>;
    }
});

export const EmailPanel = React.createClass({
    propTypes: {
        // generates a shareUrl to use
        loadShareUrl: PropTypes.func.isRequired,
        // Value to push into the email
        shareUrl: PropTypes.string,
        // generates a shareUrl to use
        sendResultsEmail: PropTypes.func.isRequired
    },

    getInitialState: function() {
        return {
            mode: undefined,
            errorMessage: undefined,
        }
    },
    componentWillMount: function() {
        this.props.loadShareUrl();
    },

    _startEmailSend: function(email) {
        this.setState({ mode: 'loading'}, function() {
            this.props.sendResultsEmail(
                email,
                this._sendEmailCallback);
        });
    },
    _sendEmailCallback: function(r) {
        const self = this;
        if (r.status_code === 200) {
            return self.setState({mode: 'success'});
        }
        this.setState({
            mode: 'error',
            errorMessage: r.errorMessage
        });
    },
    render: function() {
        var self = this,
            collectionClassName = self.props.isMobile ?
                'xxOverlay xxOverlay--light xxOverlay--spaced' :
                'xxCollectionAction',
            userMessage = false
        ;
        switch (self.state.mode) {
            case 'error':
                userMessage = <Message message={self.state.errorMessage} type="formError" />;
                break;
            case 'loading':
                userMessage = <Message message={T.get('copy.loading')} />;
                break;
            default:
                break;
        }
        return (
            <div className={collectionClassName}>
                <h2 className="xxTitle">{T.get('email')}</h2>
               {
                    self.props.isMobile ? (
                        <div
                            className="xxOverlay-close"
                            data-action-label="info"
                            onClick={self.props.handleBackClick}>
                        </div>
                    ) : null
                }
                {
                    (self.state.mode === 'success') ? (
                        <div>
                            <div className="xxText">
                                <p>{T.get('copy.videoContent.email.success')}</p>
                            </div>
                            <div className="xxCollectionAction-buttons">
                                <button
                                    className="xxButton"
                                    type="button"
                                    data-action-label="info"
                                    onClick={this.props.cancelClickHandler}
                                >{T.get('back')}</button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="xxText">
                                <p>{T.get('copy.videoContent.email')}</p>
                            </div>
                            {userMessage}
                            <div className="xxFormField">
                                <label
                                    className="xxLabel"
                                    htmlFor="xx-email-from"
                                >{T.get('label.yourEmail')}</label>
                                <input
                                    ref="email"
                                    className="xxInputText"
                                    id="xx-email-from"
                                    type="email"
                                    placeholder={'example@example.com'}
                                    required
                                />
                            </div>
                            <div className="xxCollectionAction-buttons">
                                <button
                                    className="xxButton"
                                    type="button"
                                    data-action-label="info"
                                    onClick={this.props.cancelClickHandler}
                                >{T.get('back')}</button>
                                <button
                                    className="xxButton xxButton--highlight"
                                    type="button"
                                    disabled={!this.props.shareUrl}
                                    onClick={() => {this._startEmailSend(
                                        self.refs.email.value.trim())}}
                                >{T.get('send')}</button>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
});

export const EmailControl = React.createClass({

    propTypes: {
        handleClick: PropTypes.func.isRequired
    },

    render: function() {
        return (
            <a
                data-tip={T.get('label.emailMe')}
                data-for="staticTooltip"
                data-place="bottom"
                data-action-label="email"
                onClick={this.props.handleClick}
                className="xxCollectionActions-anchor xxCollectionActions-email">
                <span>{T.get('email')}</span>
            </a>
        );
    }
});

export const SharePanel = React.createClass({

    propTypes: {
        // Tag of element
        tagId: PropTypes.string.isRequired,
        // handles the clicks on facebook/twitter/linkedin buttons
        socialClickHandler: PropTypes.func.isRequired,
        // Value to push into the form
        shareUrl: PropTypes.string,
        // generates a shareUrl to use
        loadShareUrl: PropTypes.func.isRequired
    },

    componentWillMount: function() {
        this.props.loadShareUrl();
    },

    componentDidMount: function() {
        const clipboard = new Clipboard(this.refs.copyButton);
        clipboard.on('success', e => {
            e.clearSelection();
        });
        // If the copy API is available on this device,
        // set the tooltip to show that text was copied
        // instead of just selected.
        if(_.isFunction(document.execCommand)) {
            this.setTooltipCode('action.textCopied');
        } else {
            this.setTooltipCode('action.textSelected');
        }
        // This binds selectableTooltip to the Copy button.
        ReactTooltip.rebuild();
    },

    setTooltipCode(code) {
        if (this.props.setTooltipText) {
            this.props.setTooltipText(T.get(code));
        }
    },

    getShareForm() {
        const shareElement = this.props.shareUrl?
            (
                <div className="xxFormField">
                    <label
                        className="xxLabel"
                        htmlFor="xx-share-link"
                    >{T.get('copy.share.label')}</label>
                    <input
                        className="xxInputText"
                        id={"xx-share-link" + this.props.tagId}
                        type="text"
                        value={this.props.shareUrl}
                        readOnly
                    />
                </div>
            ): <CollectionLoadingText />;

        return (
            <div>
                {shareElement}
                <div className="xxCollectionAction-buttons">
                    <button
                        className="xxButton"
                        type="button"
                        data-action-label="info"
                        onClick={this.props.cancelClickHandler}
                    >{T.get('back')}</button>
                    <button
                        disabled={!this.props.shareUrl}
                        className="xxButton xxButton--highlight"
                        data-clipboard-target={"#xx-share-link" + this.props.tagId}
                        value={this.props.shareUrl}
                        ref="copyButton"
                        type="button"
                        data-for="settableTooltip"
                        data-tip
                    >{T.get('copy')}</button>
                </div>
            </div>
        );
    },

    render: function() {

        const collectionClassName = this.props.isMobile ? 'xxOverlay xxOverlay--light xxOverlay--spaced' : 'xxCollectionAction'

        return (
            <div className={collectionClassName}>
                <h2 className="xxTitle">{T.get('copy.share.main')}</h2>
                {
                    this.props.isMobile ? (
                        <div
                            className="xxOverlay-close"
                            data-action-label="info"
                            onClick={this.props.cancelClickHandler}>
                        </div>
                    ) : null
                }
                <ul className="xxCollectionShare">
                    <li className="xxCollectionShare-item is-active">
                        <span
                            className="xxCollectionShare-anchor xxCollectionShare-link"
                        ><span>Link</span></span>
                    </li>
                    <li className="xxCollectionShare-item">
                        <a
                            data-social-action-label="facebook"
                            onClick={() => {this.props.socialClickHandler('facebook')}}
                            className="xxCollectionShare-anchor xxCollectionShare-fb"
                            data-for="staticTooltip"
                            data-tip={T.get('tooltip.share.facebook')}
                        >
                            <span>Facebook</span>
                        </a>
                    </li>
                    <li className="xxCollectionShare-item">
                        <a
                            data-social-action-label="twitter"
                            onClick={() => {this.props.socialClickHandler('twitter')}}
                            className="xxCollectionShare-anchor xxCollectionShare-twitter"
                            data-for="staticTooltip"
                            data-tip={T.get('tooltip.share.twitter')}
                        >
                            <span>Twitter</span>
                        </a>
                    </li>
                    <li className="xxCollectionShare-item">
                        <a
                            data-social-action-label="linkedin"
                            onClick={() => {this.props.socialClickHandler('linkedin')}}
                            className="xxCollectionShare-anchor xxCollectionShare-linkedin"
                            data-for="staticTooltip"
                            data-tip={T.get('tooltip.share.linkedin')}
                        >
                            <span>LinkedIn</span>
                        </a>
                    </li>
                </ul>
                <div className="xxText">
                    <p>{T.get('copy.share.description')}</p>
                </div>
                {this.getShareForm()}
            </div>
        );
    }
});

export const ShareControl = React.createClass({

    propTypes: {
        handleClick: PropTypes.func.isRequired
    },

    render: function() {
        return (
            <a
                data-tip={T.get('copy.share.main')}
                data-for="staticTooltip"
                data-place="bottom"
                data-action-label="share"
                onClick={this.props.handleClick}
                className="xxCollectionActions-anchor xxCollectionActions-share">
                <span>{T.get('share')}</span>
            </a>
        );
    }
});

export const DeletePanel = React.createClass({
    propTypes: {

        // function used to remove a video from the
        // UI display
        deleteCollection: PropTypes.func.isRequired,

        // what to do when the cancel button is clicked
        cancelClickHandler: PropTypes.func.isRequired
    },
    render: function() {
        var collectionClassName = this.props.isMobile ?
            'xxOverlay xxOverlay--light xxOverlay--spaced' :
            'xxCollectionAction';
        return (
            <div className={collectionClassName}>
                <h2 className="xxTitle">{T.get('copy.videoContent.delete.title')}</h2>
                {
                    this.props.isMobile ? (
                        <div
                            className="xxOverlay-close"
                            data-action-label="info">
                        </div>
                    ) : null
                }
                <div className="xxText">
                    <p>{T.get('copy.videoContent.delete')}</p>
                </div>
                <div className="xxCollectionAction-buttons">
                    <button
                        className="xxButton"
                        type="button"
                        data-action-label="info"
                        onClick={this.props.cancelClickHandler}
                        >{T.get('cancel')}</button>
                    <button
                        className="xxButton xxButton--highlight"
                        type="button"
                        onClick={this.props.deleteCollection}
                    >{T.get('delete')}</button>
                </div>
            </div>
        );
    }
});

export const DeleteControl = React.createClass({

    propTypes: {
        handleClick: PropTypes.func.isRequired
    },

    render: function() {
        return (
            <a
                data-tip={T.get('copy.videoContent.delete.title')}
                data-for="staticTooltip"
                data-place="bottom"
                data-action-label="delete"
                onClick={this.props.handleClick}
                className="xxCollectionActions-anchor xxCollectionActions-delete">
                <span>{T.get('delete')}</span>
            </a>
        );
    }
});
