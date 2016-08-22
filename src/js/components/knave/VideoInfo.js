// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';
import Countdown from '../wonderland/Countdown';
import Lift from './Lift';
import ReactTooltip from 'react-tooltip';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideoInfo = React.createClass({
    getDefaultProps: function () {
        return {
            demographicThumbnails: [],
            selectedDemographic: 0,
            timeRemaining: null,
            videoState: UTILS.VIDEO_STATE_ENUM.process
        }
    },
    getInitialState: function() {
        return {
            selectedDemographic: this.props.selectedDemographic,
            demographicThumbnails: this.props.demographicThumbnails,
            demographicOptions: this.getDemographicOptions(),
            dropdownOpen: false
        }
    },
    componentDidMount: function() {
        ReactTooltip.rebuild();
    },
    componentWillReceiveProps: function(nextProps) {
        if (this.props.demographicThumbnails.length !== nextProps.demographicThumbnails.length) { 
            var dos = this.getDemographicOptions(); 
            this.setState({ 
                demographicOptions: dos, 
                demographicThumbnails: nextProps.demographicThumbnails    
            });
            // Since we default to not showing the None, we need to 
            // see if the length is exactly 2 -- after a thumbnail change 
            // if it is set the selectedDemographic to 1 instead of 0
            if (nextProps.demographicThumbnails.length === 2) { 
                this.setState({ 
                    selectedDemographic: 1
                }); 
            }
            this.props.showRefilterTutorial();
        }
        if (this.props.selectedDemographic !== nextProps.selectedDemographic) {
            this.setState({
                selectedDemographic: nextProps.selectedDemographic
            });
        }
    },
    getDemographicOptions: function() { 
        var self = this,
            demographicOptions = []
        ;
        if (self.props.demographicThumbnails && self.props.demographicThumbnails.length > 0) {
            self.props.demographicThumbnails.forEach(function (thumb, idx) {
                var demographicLabel = null;
                if (thumb.gender) {
                    demographicLabel = UTILS.FILTERS_GENDER_ENUM[thumb.gender];
                }
                if (thumb.age) {
                    demographicLabel = demographicLabel ? demographicLabel + ' / ' + thumb.age : thumb.age;
                }
                if (demographicLabel === null) {
                    demographicLabel = 'None';
                }
                demographicOptions.push({
                    label: demographicLabel,
                    value: idx
                });
            });
        }
        return demographicOptions; 
    },
    onDemographicChange: function(e) {
        var self = this,
            value = parseInt(e.target.id)
        ;
        e.preventDefault();
        self.setState({
            dropdownOpen: false,
            selectedDemographic: value
        }, function() {
            self.props.handleDemographicChange(value);
        });
    },
    onTimerFinished: function() {
        return
    },
    toggleOpen: function() {
        var self = this;
        self.setState({
            dropdownOpen: !self.state.dropdownOpen
        });
    },
    render: function() {
        var self = this,
            filtersClassName = ['xxCollectionFilters'],
            dropdownClassName = ['xxCollectionFilters-title'],
            dropdownFilters = null,
            filters = self.getDemographicOptions().slice(0),
            currentFilter = filters[self.state.selectedDemographic].label
        ;
        if (self.state.demographicThumbnails && self.state.demographicThumbnails.length > 1) {
            filtersClassName.push('has-dropdown');
            dropdownClassName.push('has-dropdown');
        }
        if (self.state.dropdownOpen) {
            filtersClassName.push('is-open');
            var temp = filters[0];
            filters[0] = filters[self.state.selectedDemographic];
            filters[self.state.selectedDemographic] = temp;
            dropdownFilters = (
                <ul className="xxCollectionFilters-dropdown">
                    {
                        filters.map(function(item) {
                            var i = item.value;
                            if (i === self.state.selectedDemographic) {
                                return (
                                    <li key={i} id={i} className="xxCollectionFilters-version is-selected" onClick={self.onDemographicChange}>
                                        <span id={i} className="xxCollectionFilters-versionTitle">Filters</span>
                                        <span id={i}>{item.label}</span>
                                    </li>
                                );
                            }
                            else {
                                return (
                                    <li key={i} id={i} className="xxCollectionFilters-version" onClick={self.onDemographicChange}>
                                        <span id={i} className="xxCollectionFilters-versionTitle">Filters</span>
                                        <span id={i}>{item.label}</span>
                                    </li>
                                );
                            }
                        })
                    }
                </ul>
            );
        }
        return (
            <div>
                <h1 className="xxCollection-title">
                    {self.props.title}
                </h1>
                {
                    !self.props.isGuest ? (
                        <div className={filtersClassName.join(' ')}>
                            {
                                (self.props.videoState === UTILS.VIDEO_STATE_ENUM.processing) ? (
                                    <div className="xxCollectionFiltersProcessing">
                                        <div className="xxCollectionFiltersToggle XXCollectionFiltersToggle--countdown"></div>
                                        {
                                            (self.props.timeRemaining !== null && self.props.timeRemaining > 0) ? (
                                                <span><Countdown 
                                                    seconds={self.props.timeRemaining} 
                                                    onFinish={self.onTimerFinished} 
                                                    classPrefix="xxCollectionFiltersCountdown" />
                                                </span>
                                            ) : (
                                                <span className="xxCollectionFiltersCountdown">{T.get('timer.loading')}</span>
                                            )
                                        }
                                    </div>
                                ) : (
                                    <a className="xxCollectionFiltersToggle"
                                        data-action-label="refilter"
                                        data-for="staticTooltip"
                                        onClick={self.props.handleMenuChange} >
                                    </a>
                                )
                            }
                            <div className="xxCollectionFiltersMenu">
                                <strong className={dropdownClassName.join(' ')}>{T.get('label.filters')}</strong>
                                {
                                    (self.state.demographicThumbnails && self.state.demographicThumbnails.length > 1) ? (
                                       
                                            <span className="xxCollectionFilters-value" onClick={self.toggleOpen}>
                                                {currentFilter}
                                                {dropdownFilters}
                                            </span>
                                        
                                    ) : null
                                }
                            </div>
                        </div>
                    ) : null
                }
                <Lift displayThumbLift={self.props.displayThumbLift}/>
            </div>
        );
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideoInfo

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

