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
        return ((nextProps.isActive !== self.props.isActive) || (nextState.activeModal !== self.state.activeModal))
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
                <div className="columns container">
                    <span className="column is-5">
                    <h1 className="subtitle is-6">{question}</h1>
                    </span>
                    <div className="column is-4 has-text-centered radio-buttons">
                        <RadioGroup className={'columns' + formModeDisable} name={self.props.radioType} selectedValue={self.state.isActive} onChange={self.handleChange}>
                          {Radio => (
                            <div>
                             <label>{T.get('copy.integration.bc.yes')}</label>
                              <Radio className={formModeDisable + ' column is-1'} value={true} />
                              <label>{T.get('copy.integration.bc.no')}</label>
                              <Radio className={formModeDisable + ' column is-1'} value={false} />
                            </div>
                          )}
                        </RadioGroup>
                    </div>
                    <span className="column is-3 radio-modal-button has-text-right">
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
                    data: {
                        integration_id: self.state.integrationId,
                        account_id: self.state.accountId,
                        [self.props.radioType]: e
                    }
                })
                .then(function(res) {
                    self.props.refreshFormMode(self.state.integrationId);
                })
                .catch(function(err) {
                    console.log(err);
                });
        });
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
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default RadioInputForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
