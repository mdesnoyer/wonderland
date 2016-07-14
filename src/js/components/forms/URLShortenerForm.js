// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import reqwest from 'reqwest';
import Message from '../wonderland/Message';
import Icon from '../core/Icon';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var URLShortenerForm = React.createClass({
    getInitialState: function() {
        return {
            mode: 'quiet', // quiet|error|loading|success
            shortUrl: ''
        }
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
            UTILS.shortenUrl(self.refs.url.value.trim(), self.handleUrl);
        });
    },
    handleUrl: function(response) {
        var self = this;
        if (response.status_code === 200) {
            self.setState({
                mode: 'success',
                shortUrl: response.data.url
            });
        }
        else {
            self.setState({
                mode: 'error',
                shortUrl: ''
            });
        }
    },
    render: function() {
        var self = this,
            messageNeededComponent = false
        ;
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
                        <p className="has-text-centered">
                            <button
                                className={'button is-medium is-primary' + (self.state.mode === 'loading' ? ' is-loading' : '')}
                                type="submit"
                            >
                                <Icon type="compress" />
                                {T.get('action.shortenURL')}
                            </button>
                        </p>


                        <p className={'control is-grouped' + (self.state.mode === 'success' ? '' : ' is-hidden')}>
                            <output
                                className="input small"
                                type="url"
                                readOnly
                                refs="outputUrl"
                                value={self.state.shortUrl}
                            />

                            <button
                                className="button small is-primary"
                                type="button"
                                ref="copyUrl"
                                data-clipboard-text={self.state.shortUrl}
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
