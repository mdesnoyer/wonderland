// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import Helmet from 'react-helmet';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import DragDropComponent from '../forms/DragDropComponent';
import Account from '../../mixins/Account';
import AjaxMixin from '../../mixins/Ajax';
import DropBoxHolder from './DropBoxHolder';
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
        var self = this;
        return (
            <div className={"box Drop-Container"}>
                <p className="subtitle is-3">Photo Source</p>
                <DropBoxHolder />
                <DragDropComponent />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ImageUpload;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                // <div className="Drop-Button-container">
                //     <button className="Drop-Button button is-large">
                //         <span className="icon is-medium"><i className="fa fa-angle-left"></i></span>
                //     </button>
                //     <button className="Drop-Button button is-large " type="submit" >Analyze</button>
                // </div>