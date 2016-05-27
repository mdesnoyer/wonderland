// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import Helmet from 'react-helmet';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import DragDropComponent from '../forms/DragDropComponent';
import Account from '../../mixins/Account';
import AjaxMixin from '../../mixins/Ajax';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var ImageUpload = React.createClass({
	mixins: [AjaxMixin, Account],
    getInitialState: function() {
        var self = this;
        return {
            url:''
        }
    },
    render: function() {
        var self = this;
        return (
            <div>
                <div className="box Drop-Container">
                    <p className="subtitle is-3">Photo Source</p>
                    <p className="subtitle is-5">Please paste a link to your DropBox folder.</p>
                        <form className="control" onSubmit={self.handleSubmit}>
                            <input className="input is-large" placeholder="URL" onChange={self.handleUrlChange} />
                            <div className="columns">
                                <div className="column is-6 is-offset-3">
                                    <DragDropComponent />
                                </div>
                            </div>
                        <div className="columns">
                            <button className="Drop-Button button is-large column is-5 is-offset-1" type="submit" >
                                <span className="icon is-medium"><i className="fa fa-angle-left"></i></span>
                            </button>
                            <button className="Drop-Button button is-large column is-5" type="submit" >Analyze</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    },
    handleUrlChange: function(e) {
        var self = this;
        self.setState({
            url: e.target.value
        })
    },
    handleSubmit: function() {
      var self = this;
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ImageUpload;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -