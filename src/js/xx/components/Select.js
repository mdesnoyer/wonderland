// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import ReactDOM from 'react-dom';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class XXSelect extends React.Component {
    constructor(props) {
        super(props);

        this.selectOption = this.selectOption.bind(this);
        this.toggleOpen = this.toggleOpen.bind(this);

        this.state = {
            isOpen: false,
        };
    }

    selectOption(option) {
        this.props.onSelect(option);

        document.documentElement.removeEventListener('click', this.toggleOpen);
        this.setState({
            isOpen: false,
        });
    }

    toggleOpen(e) {
        const { isOpen } = this.state;

        if (isOpen && ReactDOM.findDOMNode(this).contains(e.target)) {
            return true;
        }

        if (!isOpen) {
            document.documentElement.addEventListener('click', this.toggleOpen);
        } else {
            document.documentElement.removeEventListener('click', this.toggleOpen);
        }

        this.setState({
            isOpen: !isOpen,
        });
    }

    render() {
        const { selectOption, toggleOpen } = this;
        const { label, options, value } = this.props;
        const { isOpen } = this.state;

        const currentValue = options.find(option => option.key === value);

        const className = ['xxSelect'];
        if (isOpen) {
            className.push('is-open');
        }
        if (currentValue) {
            className.push('has-value');
        }

        return (
            <div className={className.join(' ')}>
                <div className="xxSelect-label" onClick={toggleOpen}>
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
                                        className={
                                            `xxSelect-option${option.key === value ? ' is-selected' : ''}`
                                        }
                                        key={option.key}
                                        onClick={e => selectOption(option.key)}
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
