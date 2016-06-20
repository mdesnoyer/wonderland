// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import T from '../../modules/translation';
import ModalParent from '../core/ModalParent';
import SupportForm from '../forms/SupportForm';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SupportTab5 = React.createClass({
    render: function() {
        var self = this;
        return (
            <section className="content">
                <h2 className="title is-3">Contact Support</h2>
                <SupportForm />
            </section>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SupportTab5;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
