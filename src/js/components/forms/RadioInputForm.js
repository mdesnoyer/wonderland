// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import IntegrationsForm from '../forms/IntegrationsForm';
import Secured from '../../mixins/Secured';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';
import AjaxMixin from '../../mixins/Ajax';
import Account from '../../mixins/Account';
import RadioGroup from 'react-radio-group';
import BrightcoveThumbnailModal from '../modals/BrightcoveThumbnailModal';
import BrightcoveSmartPlayerModal  from '../modals/BrightcoveSmartPlayerModal';
import BrightcoveNewPlayerModal from '../modals/BrightcoveNewPlayerModal';
import ModalParent from '../core/ModalParent';
import SnippetGrabber from '../core/SnippetGrabber';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var RadioInputForm = React.createClass({
    mixins: [AjaxMixin, Account], // ReactDebugMixin
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    propTypes: {
        isActive: React.PropTypes.bool,
        formMode: React.PropTypes.string,
        integrationId: React.PropTypes.string,
        accountId: React.PropTypes.string
    },
    getInitialState: function() {
        var self = this;
        return {
            isActive: self.props.isActive,
            activeModal: false,
            formMode: self.props.formMode,
            integrationId: self.props.integrationId,
            accountId: self.props.accountId
        };
    },
    componentWillReceiveProps: function(nextProps){
        var self = this;
        self.setState({
            formMode: nextProps.formMode,
            isActive: nextProps.isActive,
            integrationId: nextProps.integrationId,
            accountId: nextProps.accountId
        })
    },
    shouldComponentUpdate: function(nextState, nextProps){
        var self = this;
        return nextProps !== self.props
    },
    render: function() {
        var self = this,
            question,
            modalToShow,
            snippetGrabber,
            usesGallery,
            formModeDisable = self.props.formMode === 'update' ? '' : ' is-disabled'
            ;
            switch(self.props.radioType) {
                case 'uses_bc_thumbnail_api':
                    question = "Are your thumbnails placed on your site using the Brightcove API?";
                    modalToShow = <BrightcoveThumbnailModal />;
                    snippetGrabber = '';
                    usesGallery = self.props.usesGallery ? ' is-hidden' : '';
                    break;
                case 'uses_bc_smart_player':
                    question =  "Do you use the legacy Smart player?";
                    modalToShow = <BrightcoveSmartPlayerModal />;
                    snippetGrabber = <SnippetGrabber isActive={self.state.isActive}/>;
                    usesGallery = '';
                    break;
                case 'uses_bc_videojs_player':
                    question = "Do you use the new Brightcove HTML5 player?";
                    modalToShow = <BrightcoveNewPlayerModal />;
                    snippetGrabber = '';
                    usesGallery = '';
                    break;
            }
        return (
            <div className={"box" + usesGallery}>
                <div className="columns container is-fluid">
                    <span className="column is-4">
                        {question}
                    </span>
                    <div className="column is-6 has-text-centered">
                        <RadioGroup className={"control is-grouped" + formModeDisable} name={self.props.radioType} selectedValue={self.state.isActive} onChange={self.handleChange}>
                          {Radio => (
                            <div>
                              <Radio className={formModeDisable} value={true} />{T.get('copy.integration.bc.yes')}
                              <Radio className={formModeDisable} value={false} />{T.get('copy.integration.bc.no')}
                            </div>
                          )}
                        </RadioGroup>
                    </div>
                    <span className="column is-2 is-pulled-right">
                        <a className="button is-medium" data-target="brightcove-writeToken" onClick={self.openModal}>?</a>
                    </span>
                    <ModalParent isModalActive={(self.state.activeModal)} handleToggleModal={self.closeModal}>
                        {modalToShow}
                    </ModalParent>
                </div>
                {snippetGrabber}
            </div>
        );
    },
    handleChange: function(e) {
        var self = this;
        self.setState({
            isActive: e
        },  function(){
                self.PUT('integrations/brightcove', {
                    data:{
                        integration_id: self.state.integrationId,
                        account_id: self.state.accountId,
                        [self.props.radioType]: e
                    }
                })
                .then(function(res) {
                })
                .catch(function(err) {
                    console.log(err);
                });
            }
        )
            },
    openModal: function (e) {
        this.setState({
            activeModal: true
        });
    },
    closeModal: function () {
        this.setState({
            activeModal: false
        });
    },
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default RadioInputForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
