// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var DropDown = React.createClass({
    getInitialState: function() {
        var self = this;
        return {
            isOpen: false,
            currentValue: self.props.label,
            label: self.props.label
        }
    },
    render: function() {
        var self = this,
            optionLabel = self.state.currentValue,
            options = self.props.options,
            className = ['xxSelect']
        ;
        if (self.state.isOpen) {
            className.push('is-open');
        }
        if (self.state.currentValue !== self.state.label) {
            className.push('has-value');
        }
        return (
            <div className={className.join(' ')} onClick={self.toggleOpen}>
                <div className="xxSelect-label">
                    {optionLabel}
                </div>
                {
                    self.state.isOpen ? (
                        <ul className="xxSelect-dropdown">
                            <li
                                className="xxSelect-option xxSelect-option--label"
                                data-value={self.props.label}
                            >{self.props.label}</li>
                            {
                                options.map(function(option, i) {
                                    return (
                                        <li
                                            className={'xxSelect-option'}
                                            key={i}
                                            id={option.label}
                                            data-value={option.value}
                                            onClick={self.handleClick}
                                        >{option.label}</li>
                                    )
                                })
                            }
                        </ul>
                    ) : null
                }
            </div>
        );
    },
    handleClick: function(e) {
        var self = this,
            value = e.target.dataset.value
        ;
        self.setState({
            currentValue: e.target.id,
        }, function() {
            self.props.handleChange(value);
        });
    },
    toggleOpen: function(e) {
        var self = this;
        e.preventDefault();
        self.setState({
            isOpen: !self.state.isOpen
        });
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default DropDown;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
