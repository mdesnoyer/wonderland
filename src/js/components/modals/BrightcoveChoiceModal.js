// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import AjaxMixin from '../../mixins/Ajax';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';
import E from '../../modules/errors';
import Account from '../../mixins/Account';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var BrightcoveChoiceModal = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    render: function() {
        var self = this;
        return (
            <section className="box is-desktop has-text-centered message is-primary">
                <h1 className="title is-4">
                    Which type of Brightcove Account do you have?
                </h1>
                <div className="content has-text-centered columns">
                    <div className={'column is-6'} onClick={self.handleGalleryClick}>
                        <img src="/img/support/promogallerylogo.png" alt="" title=""  />
                    </div>
                    <div className={'column is-6'} onClick={self.handleBrightcoveClick}>
                        <img src="/img/brightcove.png" alt="" title="" />
                    </div>
                </div>
            </section>
        );
    },
    handleGalleryClick: function() {
        var self = this;
            self.context.router.push( UTILS.DRY_NAV.PLUGINS_BRIGHTCOVE.URL + 'gallery/');

    },
    handleBrightcoveClick: function() {
        var self = this;
            self.context.router.push(UTILS.DRY_NAV.PLUGINS_BRIGHTCOVE.URL + self.state.accountId + 'nongallery/');

    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default BrightcoveChoiceModal;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
