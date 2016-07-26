// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import reqwest from 'reqwest';
import Message from '../wonderland/Message';
import AjaxMixin from '../../mixins/Ajax';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var URLShortenerForm = React.createClass({
    mixins: [AjaxMixin],
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
                shortUrl: self.refs.url.value.trim()
            });
        }
    },
    render: function() {
        var self = this,
            messageNeededComponent = false
        ;
        if (self.state.mode === 'error') {
            messageNeededComponent = <Message message={T.get('copy.urlShortener.messageBody')} />
        }
        return (
            <div>
                <form onSubmit={self.handleSubmit}>
                    {messageNeededComponent}
                    <fieldset>
                        <div className="xxFormField">
                            <textarea
                                className="xxTextArea"
                                type="url"
                                ref="url"
                                minLength="6"
                                maxLength="1024"
                                placeholder={T.get('url')}
                                required
                            >
                            </textarea>
                        </div>
                        <div className="xxFormButtons">
                            <button
                                className="xxButton xxButton--highlight xxButton--important"
                                type="submit"
                            >
                                {T.get('action.shortenURL')}
                            </button>
                        </div>
                        <div className="xxFormField">
                            <input
                                className="xxInputText"
                                type="url"
                                readOnly
                                refs="outputUrl"
                                value={self.state.shortUrl}
                            />
                        </div>
                        <div className="xxFormButtons">
                            <button
                                className="xxButton"
                                data-clipboard-text={self.state.shortUrl}
                                value={self.state.shortUrl}
                                ref="copyUrl"
                                type="button"
                                onClick={self.handleCopyClick}
                            >
                                {T.get('copy')}
                            </button>
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default URLShortenerForm

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
