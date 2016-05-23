// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import Icon from '../core/Icon';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SnippetGrabber = React.createClass({
    propTypes: {
        isActive: React.PropTypes.bool
    },
    getInitialState: function() {
        var self = this;
        return {
            isActive: self.props.isActive
        }
    },
    componentWillReceiveProps: function(nextProps){
        var self = this;
        self.setState({
            isActive: nextProps.isActive
        })
    },
    shouldComponentUpdate: function(nextState, nextProps) {
        var self = this;
        return nextProps !== self.props
    },
    render: function() {
        var self = this,
            hasSnippetTextArea = self.state.isActive ?   '' : ' is-hidden';
        return(
                <div className={"control" + hasSnippetTextArea}>
                    <label className="label">SnippetGrabber</label>
                    <textarea className="textarea"></textarea>
                    <p className={"has-text-centered" + hasSnippetTextArea}>
                        <button className="button is-medium is-primary" type="submit">
                            <Icon type="files-o" />
                        </button>
                    </p>
                </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SnippetGrabber;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
