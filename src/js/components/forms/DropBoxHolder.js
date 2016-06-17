// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import Account from '../../mixins/Account';
import AjaxMixin from '../../mixins/Ajax';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';
import Message from '../wonderland/Message';
import E from '../../modules/errors';
// import ReactDebugMixin from 'react-debug-mixin';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var DropBoxHolder = React.createClass({
	mixins: [AjaxMixin], // ReactDebugMixin
    // mixins: [ReactDebugMixin],
    componentDidMount: function(){
        var self = this,
        	options,
        	button
        ; 
        options = {
            success: function(urls) {
                self.setState({
                	urls: urls
                },	function(){
                	self.sendDropBoxUrl(urls)
            	})
            },
            linkType: "direct",
            extensions: ['.jpeg', '.jpg', '.png', '.gif', '.bmp']
    	};
        button = Dropbox.createChooseButton(options);
            if (document.getElementById("dropBoxSDK")){
                document.getElementById("dropBoxSDK").appendChild(button);    
            }
    },
    componentDidUpdate: function(){
    	var self = this; 
    	self.sendDropBoxUrl(self.state.urls)
    },
    render: function() {
        var self = this;
        return (
            <div id="dropBoxSDK">
            </div>
        );
    },
    sendDropBoxUrl: function(urls) {
        var self = this,
            options = {
                data:{
                    url: urls[0].link
                }
            }
    	;
        // url: UTILS.properEncodeURI(urls[0].link)
		self.POST('thumbnails', options)
    		 .then(function(res) {
    		 	//THEN
                debugger 
    		 })
    		 .catch(function(err){
    		 	debugger
    		 })	

    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default DropBoxHolder;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
