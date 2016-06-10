// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import Message from '../wonderland/Message';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import E from '../../modules/errors';
import AjaxMixin from '../../mixins/Ajax';
import Icon from '../core/Icon';
import SESSION from '../../modules/session';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var URLShortenerForm = React.createClass({
    mixins: [AjaxMixin], // ReactDebugMixin
    getInitialState: function() {
        return {
            mode: 'quiet' // quiet|error|loading|success
        }
    },
    handleSubmit: function(e) {
        var self = this;
        e.preventDefault();
        console.log('clicked');
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
