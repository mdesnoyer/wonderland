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
            url:'',
            mode: 'silent' //silent/error/sucess/error/
        }
    },
    render: function() {
        var self = this,
            elementStyle = ''
        ;
        switch(self.state.mode) {
            case 'loading':
                elementStyle = ' is-loading is-disabled';
                break;
            case 'silent':
                break;
            case 'success':
                break;
            case 'error': 
                break;
        }
        return (
                <div className={"box Drop-Container"}>
                    <p className="subtitle is-3">Photo Source</p>
                    <p className="subtitle is-5">Please paste a link to your DropBox folder.</p>
                        <form className={"control" + elementStyle} onSubmit={self.handleSubmit}>
                            <input 
                                className="Drop-Input input is-large"
                                ref='url' 
                                placeholder="URL" 
                                value={self.state.url}
                                onChange={self.handleUrlChange}
                            />
                            <DragDropComponent />
                            <div className="Drop-Button-container">
                                <button className="Drop-Button button is-large">
                                    <span className="icon is-medium"><i className="fa fa-angle-left"></i></span>
                                </button>
                                <button className="Drop-Button button is-large " type="submit" >Analyze</button>
                            </div>
                    </form>
                </div>
        );
    },
    handleUrlChange: function(e) {
        var self = this;
        self.setState({
            url: e.target.value
        })
    },
    handleSubmit: function(e) {
      var self = this;
      e.preventDefault();
      self.setState({
        mode: 'loading'
        },
        function() {
            self.sendUrl()
        }
      )
    },
    sendUrl: function() {
        var self = this,
            urlTosend = self.refs.url.value
        ; 
        //AJAX to Server for DROPBOX URL
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ImageUpload;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -