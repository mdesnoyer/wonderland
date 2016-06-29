// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import ReactDOM from 'react-dom';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const availableVersions = [
    {
        key: 1,
        value: 'Female / 35-44',
    },
    {
        key: 2,
        value: 'Male / 25 - 34',
    },
    {
        key: 3,
        value: 'None',
    },
];

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class XXCollectionFilters extends React.Component {
    constructor(props) {
        super(props);

        this.selectVersion = this.selectVersion.bind(this);
        this.toggleOpen = this.toggleOpen.bind(this);

        this.state = {
            isOpen: false,
            value: 1,
        };
    }

    selectVersion(version) {
        this.setState({
            value: version,
        });

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
        const { selectVersion, toggleOpen } = this;
        const { isOpen, value } = this.state;

        const currentVersion = availableVersions.find(version => version.key === value);

        const className = ['xxCollectionFilters', 'has-dropdown'];
        if (isOpen) {
            className.push('is-open');
        }

        const currentVersions = availableVersions.slice().filter(version => version.key !== value);
        currentVersions.unshift(currentVersion);

        return (
            <div className={className.join(' ')}>
                <strong className="xxCollectionFilters-title" onClick={toggleOpen}>Filters</strong>
                <span className="xxCollectionFilters-value" onClick={toggleOpen}>{currentVersion.value}</span>
                {
                    isOpen ? (
                        <ul className="xxCollectionFilters-dropdown">
                            {
                                currentVersions.map(version => (
                                    <li
                                        className={
                                            `xxCollectionFilters-version${version.key === value ? ' is-selected' : ''}`
                                        }
                                        key={version.key}
                                        onClick={e => selectVersion(version.key)}
                                    >
                                        <span className="xxCollectionFilters-versionTitle">Filters</span>
                                        {version.value}
                                    </li>
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
