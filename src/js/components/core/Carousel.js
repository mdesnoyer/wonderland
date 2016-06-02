// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import T from '../../modules/translation';
// import ReactDebugMixin from 'react-debug-mixin';
import Icon from '../core/Icon';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Carousel = React.createClass({
    // mixins: [ReactDebugMixin],
    propTypes: {
        selectedItem: React.PropTypes.number.isRequired,
        isActive: React.PropTypes.bool.isRequired
    },
    getInitialState: function() {
        var self = this;
        return {
            items: [],
            total: 0,
            selectedItem: 0,
            isActive: false
        };
    },
    handleKeyEvent: function(e) {
        var self = this;
        switch (e.keyCode) {
            case 37: // Left Arrow
                self.handleClickPrevious();
                break;
            case 39: // Right Arrow
                self.handleClickNext();
                break;
        }
    },
    handleClickPrevious: function(e) {
        var self = this;
        self.setState({
            selectedItem: (self.state.selectedItem === 0) ? (self.state.total - 1) : (self.state.selectedItem - 1)
        });
    },
    handleClickNext: function(e) {
        var self = this;
        self.setState({
            selectedItem: (self.state.selectedItem === self.state.total - 1) ? (0) : (self.state.selectedItem + 1)
        });
    },
    componentWillReceiveProps: function(nextProps) {
        var self = this;
        if (nextProps.children && nextProps.children.length) {
            self.setState({
                items: nextProps.children,
                total: (nextProps.children ? nextProps.children.length : 0),
                selectedItem: (nextProps.selectedItem ? nextProps.selectedItem : 0),
                isActive: nextProps.isActive
            }, function() {
                if (self.state.isActive) {
                    document.body.onkeydown = self.handleKeyEvent;
                }
                else {
                    document.body.onkeydown = '';
                }
            });
        }
    },
    render: function() {
        var self = this;
        return (
            <aside className="wonderland-carousel">
                <ol className="wonderland-carousel__items">
                    {
                        self.state.items.map(function(item, i) {
                            var className = self.state.selectedItem === i ? ['is-active'] : [];
                            return (
                                <li key={i} className={'wonderland-carousel__item ' + className.join(' ')}>
                                    {item}
                                </li>
                            );
                        })
                    }
                </ol>
                <nav className="box wonderland-box wonderland-carousel__control-box">
                    <ul className="wonderland-carousel__controls">
                        <li
                            onClick={self.handleClickPrevious}
                            className={UTILS.buildTooltipClass('wonderland-carousel__control wonderland-carousel__control--previous', 'right')}
                            aria-label={T.get('action.previous')}
                        >
                            <Icon type="chevron-circle-left" />
                        </li>
                        <li>Item {self.state.selectedItem + 1} of {self.state.total}</li>
                        <li
                            onClick={self.handleClickNext}
                            className={UTILS.buildTooltipClass('wonderland-carousel__control wonderland-carousel__control--next', 'left')}
                            aria-label={T.get('action.next')}
                        >
                            <Icon type="chevron-circle-right" />
                        </li>
                    </ul>
                </nav>
            </aside>
        );

    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Carousel;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
