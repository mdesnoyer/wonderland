// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import reqwest from 'reqwest';
import Message from '../wonderland/Message';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var URLShortenerForm = React.createClass({
    getInitialState: function() {
        return {
            mode: 'quiet', // quiet|error|loading|success
            shortURL: ''
        }
    },
    componentWillUnmount: function(e) {
        E.clearErrors();
    },
     componentDidMount: function() {
        var self = this,
            c = new Clipboard(self.refs.copyUrl)
        ;
    },
    handleSubmit: function(e) {
        var self = this;
        e.preventDefault();
        self.setState({
            mode: 'loading'
        }, function() {
            reqwest({
                url: 'https://api-ssl.bitly.com/v3/shorten',
                method: 'GET',
                type: 'jsonp',
                data: {
                    longUrl: self.refs.url.value,
                    access_token: UTILS.BITLY_ACCESS_TOKEN,
                    domain: 'bit.ly'
                }
            })
            .then(function(response) {
                if (response.status_code === 500) {
                    self.setState({
                        mode: 'error'
                    });
                }
                else {
                    self.setState({
                        mode: 'success',
                        shortURL: response.data.url
                    });
                }
            })
            .fail(function(error) {
                console.log(error);
                self.setState({
                    mode: 'error'
                });
            })
        });
    },
    render: function() {
        var self = this,
            messageNeededComponent = false;
        if (self.state.mode === 'error') {
            messageNeededComponent = <Message header={T.get('copy.urlShortener.messageHeading')} body={T.get('copy.urlShortener.messageBody')} flavour="danger" />
        }
        return (
            <div>
                <form onSubmit={self.handleSubmit}>
                    {messageNeededComponent}
                    <fieldset>
                        <p className={'control is-' + self.state.mode}>
                            <textarea
                                className={'textarea is-medium' + (self.state.mode === 'loading' ? ' is-loading' : '')}
                                type="url"
                                ref="url"
                                required
                                minLength="6"
                                maxLength="1024"
                                placeholder={T.get('url')}
                            >
                            </textarea>
                        </p>
                        <p className="control has-addons has-addons-centered">
                            <button
                                className={'button is-medium is-primary' + (self.state.mode === 'loading' ? ' is-loading' : '')}
                                type="submit"
                            >
                                {T.get('action.shortenURL')}
                            </button>
                        </p>


                        <p className={'control is-grouped' + (self.state.mode === 'success' ? '' : ' is-hidden')}>
                            <output
                                className="input small"
                                type="text"
                                readOnly
                                refs="outputUrl"
                                value={self.state.shortURL}
                            />

                            <button
                                className="button small"
                                type="button"
                                ref="copyUrl"
                                onClick={self.handleCopyUrlClick}
                                data-clipboard-text={self.state.shortURL}
                            >
                                {T.get('copy')}
                            </button>
                        </p>

                    </fieldset>
                </form>
            </div>
        );
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default URLShortenerForm

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
