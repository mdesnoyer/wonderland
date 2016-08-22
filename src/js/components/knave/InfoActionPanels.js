// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, {PropTypes} from 'react';
import DemographicFilters from './DemographicFilters';
import Message from '../wonderland/Message';
import Lift from './Lift';

import T from '../../modules/translation';

import CollectionLoadingText from '../core/CollectionLoadingText';

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
        liftValue: PropTypes.number

    },
    getDefaultProps: function() {
        return {
            displayRefilterButton: true
        };
    },
    render: function() {
        return (<div>
            <h1 className="xxCollection-title">
                {this.props.title}
            </h1>
            <DemographicFilters
                onChange={this.props.onDemographicChange}
                demographicOptions={this.props.demographicOptions}
                selectedDemographic={this.props.selectedDemographic}
                displayRefilterButton={this.props.displayRefilterButton} 
            />
            <Lift displayThumbLift={this.props.liftValue}/>
        </div>);
    }
});

export const InfoLiftPanel = React.createClass({
    propTypes: {
        // User's name of this collection
        title: PropTypes.string.isRequired,
        lift: PropTypes.number
    },

    render: function() {
        return (<div>
            <h1 className="xxCollection-title">
                {this.props.title}
            </h1>
            <Lift displayThumbLift={this.props.liftValue} />
        </div>);
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
        getShareUrl: PropTypes.func.isRequired,
        // TODO
        sendResultsEmail: PropTypes.func.isRequired,
        // key/id of the object
        id: PropTypes.string.isRequired,
        // The type (video,image,gif)
        type: PropTypes.string.isRequired
    },
    getInitialState: function() {
        return {
            isLoading: true,
            mode: undefined,
            errorMessage: undefined,
            shareUrl: ''
        }
    },
    componentWillMount: function() {
        this.props.getShareUrl(
            this.props.id,
            this.props.type,
            this._shareUrlCallback)
    },
    _shareUrlCallback: function(r) {
        if (r.status_code === 200) {
            this.setState({
                shareUrl: r.data.url
            });
        }
    },
    _startEmailSend: function(email) {
        // TODO this is risky, and we are relying
        // on shareUrl to be set -- it likely will be
        // but if bitly is slow, we could be sending an
        // email without the shareUrl
        this.setState({ mode: 'loading'}, function() {
            this.props.sendResultsEmail(
                this.props.id,
                this.props.type,
                email,
                this.state.shareUrl,
                this._sendEmailCallback);
        });
    },
    _sendEmailCallback: function(r) {
        if (r.status_code !== 200) {
            this.setState({
                mode: 'error',
                errorMessage: r.errorMessage
            });
        }
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
        // handles the clicks on facebook/twitter/linkedin buttons
        socialClickHandler: PropTypes.func.isRequired,
        // generates a shareUrl to use
        getShareUrl: PropTypes.func.isRequired,
        // key/id of the object
        id: PropTypes.string.isRequired,
        // The type (video,image,gif)
        type: PropTypes.string.isRequired
    },
    getInitialState: function() {
        return {
            shareUrl: '',
            isLoading: true
        }
    },
    componentWillMount: function() {
        this.props.getShareUrl(
            this.props.id,
            this.props.type,
            this._shareUrlCallback)
    },
  
    _shareUrlCallback: function(r) {
        if (r.status_code === 200) {
            this.setState({
                shareUrl: r.data.url,
                isLoading: false
            });
        }
        else {
            this.setState({ isLoading: false });
        }
    },
    render: function() {
        var self = this,
            collectionClassName = self.props.isMobile ? 'xxOverlay xxOverlay--light xxOverlay--spaced' : 'xxCollectionAction'
        ;
        return (
            <div className={collectionClassName}>
                <h2 className="xxTitle">{T.get('copy.share.main')}</h2>
                {
                    self.props.isMobile ? (
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
                        <a data-social-action-label="facebook"
                            onClick={() => {this.props.socialClickHandler('facebook')}}
                            className="xxCollectionShare-anchor xxCollectionShare-fb"
                        ><span>Facebook</span></a>
                    </li>
                    <li className="xxCollectionShare-item">
                        <a data-social-action-label="twitter"
                            onClick={() => {this.props.socialClickHandler('twitter')}}
                            className="xxCollectionShare-anchor xxCollectionShare-twitter"
                        ><span>Twitter</span></a>
                    </li>
                    <li className="xxCollectionShare-item">
                        <a data-social-action-label="linkedin"
                            onClick={() => {this.props.socialClickHandler('linkedin')}}
                            className="xxCollectionShare-anchor xxCollectionShare-linkedin"
                        ><span>LinkedIn</span></a>
                    </li>
                </ul>
                <div className="xxText">
                    <p>{T.get('copy.share.description')}</p>
                </div>
                <div className="xxFormField">
                    <label
                        className="xxLabel"
                        htmlFor="xx-share-link"
                    >{T.get('copy.share.label')}</label>
                    {
                        self.state.isLoading ? <CollectionLoadingText /> : (
                            <input
                                className="xxInputText"
                                id={"xx-share-link" + self.props.videoId}
                                type="text"
                                value={self.state.shareUrl}
                                readOnly
                            />
                        )
                    }
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
                        data-clipboard-target={"#xx-share-link" + self.props.videoId}
                        value={self.state.shareUrl}
                        ref="copyUrl"
                        type="button"
                        data-for="settableTooltip"
                        data-tip
                    >{T.get('copy')}</button>
                </div>
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
