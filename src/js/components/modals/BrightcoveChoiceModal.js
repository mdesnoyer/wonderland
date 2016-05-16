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
            <section className="is-desktop has-text-centered box">

                <h1 className="title is-4">
                    Which type of Brightcove account do you have?
                </h1>
                <div className="content has-text-centered columns">
                    <div className={'column box is-6 choiceModal'} onClick={self.handleGalleryClick}>
                        <img src="/img/gallerylogo2.png" alt="" title="" />
                    </div>
                    <div className={'column box is-6 box choiceModal'} onClick={self.handleBrightcoveClick}>
                        <img src="/img/gallerylogo.png" alt="" title=""  />
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
        self.context.router.push(UTILS.DRY_NAV.PLUGINS_BRIGHTCOVE.URL + 'videocloud/');
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default BrightcoveChoiceModal;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
