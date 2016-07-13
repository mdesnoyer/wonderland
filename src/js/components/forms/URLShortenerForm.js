// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
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
        var self = this
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
            messageNeededComponent = false,
            output = false
        ;
        if (self.state.mode === 'error') {
            messageNeededComponent = <Message message={T.get('copy.urlShortener.messageBody')} />
        }
        if (self.state.mode === 'success') {
            output = (
                <div>
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
                            type="button"
                            ref="copyUrl"
                            data-clipboard-test={self.state.shortUrl}
                        >
                            {T.get('copy')}
                        </button>
                    </div>
                </div>
            );
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
                        {output}
                    </fieldset>
                </form>
            </div>
        );
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default URLShortenerForm

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
