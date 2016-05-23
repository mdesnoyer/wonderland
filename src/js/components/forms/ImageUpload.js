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
                <div className="columns">
                    <div className="box column is-8 container is-fluid">
                        <form className="control has-addons" onSubmit={self.handleSubmit} >
                            <input className="input" placeholder="Enter DropBox URL Here" onChange={self.handleUrlChange} />
                            <button className="button is-primary" type="submit" >Analyze</button>
                        </form>
                        <DragDropComponent />
                    </div>
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