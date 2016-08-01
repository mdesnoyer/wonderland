// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import React from 'react';
import ReactDOM from 'react-dom'; 

import AjaxMixin from '../../mixins/Ajax';

import UTILS from '../../modules/utils';
import UTILS from '../../modules/utils';
import SESSION from '../../modules/session';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var CollectionsMainPage = React.createClass({
    mixins: [AjaxMixin],
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    render: function() {
        return <div>hello</div>;
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default CollectionsMainPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
