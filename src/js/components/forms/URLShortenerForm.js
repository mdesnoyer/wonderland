// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import reqwest from 'reqwest';

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
                self.setState({
                    mode: 'success',
                    shortURL: response.data.url
                });
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
        var self = this;
        return (
            <form onSubmit={self.handleSubmit}>
                <fieldset>
                    <p className={'control is-' + self.state.mode}>
                        <input
                            className={'input is-medium' + (self.state.mode === 'loading' ? ' is-loading' : '')}
                            type="url"
                            ref="url"
                            required
                            minLength="6"
                            maxLength="1024"
                            placeholder={T.get('url')}
                        />
                    </p>
                    <p className="has-text-centered">
                        <button
                            className={'button is-medium is-primary' + (self.state.mode === 'loading' ? ' is-loading' : '')}
                            type="submit"
                        >
                            {T.get('action.shortenURL')}
                        </button>
                    </p>
                </fieldset>
            </form>
        );
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default URLShortenerForm

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
