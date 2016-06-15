// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import Icon from '../core/Icon';
import AjaxMixin from '../../mixins/Ajax';
import Account from '../../mixins/Account';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SnippetGrabber = React.createClass({
    mixins: [AjaxMixin, Account], // ReactDebugMixin
    propTypes: {
        isActive: React.PropTypes.bool
    },
    getInitialState: function() {
        var self = this;
        return {
            isActive: self.props.isActive,
            trackerAccountId: ''
        }
    },
    componentDidMount: function() {
        var self = this,
            copyUrl = new Clipboard(self.refs.copyUrl)
        ;
    },
    componentWillMount: function () {
        this.grabTelementrySnippet();
    },
    componentWillReceiveProps: function(nextProps) {
        var self = this;
        self.setState({
            isActive: nextProps.isActive
        })
    },
    shouldComponentUpdate: function(nextState, nextProps) {
        var self = this;
        return nextState.trackerAccountId !== '';
    },
    render: function() {
        var self = this,
            hasSnippetTextArea = self.state.isActive ?   '' : ' is-hidden',
            snippetText = UTILS.TELEMETRY_SNIPPET + self.state.trackerAccountId
        ;
        return(
                <div className={"control" + hasSnippetTextArea}>
                    <label className="label">SnippetGrabber</label>
                    <textarea className="textarea" value={snippetText}></textarea>
                    <p className={"has-text-centered" + hasSnippetTextArea}>
                        <button className="button is-medium is-primary" ref="copyUrl" data-clipboard-text={snippetText} >
                            <Icon type="files-o" />
                        </button>
                    </p>
                </div>
        );
    },
    grabTelementrySnippet: function() { 
        var self = this; 
        self.getAccount()
            .then(function (account) {
                self.setState({
                   trackerAccountId : account.trackerAccountId
                })
            })
            .catch(function (err) {
                console.log(err)
            });
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SnippetGrabber;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
