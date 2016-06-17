// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class XXSelect extends React.Component {
    constructor(props) {
        super(props);

        this.toggleOpen = this.toggleOpen.bind(this);

        this.state = {
            isOpen: false,
        };
    }

    toggleOpen(e) {
        e.preventDefault();

        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    render() {
        const { label, options, value, onSelect } = this.props;
        const { isOpen } = this.state;

        const currentValue = options.find(option => option.key === value);

        const className = ['xxSelect'];
        if (isOpen) {
            className.push('is-open');
        }

        return (
            <div className={className.join(' ')}>
                <div className="xxSelect-label" onClick={this.toggleOpen}>
                    {currentValue ? currentValue.value : label}
                </div>
                {
                    isOpen ? (
                        <ul className="xxSelect-dropdown">
                            <li
                                className="xxSelect-option xxSelect-option--label"
                            >{label}</li>
                            {
                                options.map(option => (
                                    <li
                                        className="xxSelect-option"
                                        key={option.key}
                                    >{option.value}</li>
                                ))
                            }
                        </ul>
                    ) : null
                }
            </div>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
