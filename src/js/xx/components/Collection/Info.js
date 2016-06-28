// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

import XXCollectionFilters from './Filters';
import XXLift from '../Lift';
import XXCollectionActions from './Actions';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class XXCollectionInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            time: 0,
        };

        if (props.activeContent === 'refilter-processing') {
            this.state.time = 15;
        }
    }

    componentDidMount() {
        if (this.props.activeContent === 'refilter-processing') {
            this.handleCountdown();
        }
    }

    handleCountdown() {
        const { time } = this.state;

        if (time > 0) {
            setTimeout(() => {
                this.setState({
                    time: time - 1,
                });
                this.handleCountdown();
            }, 1000);
        } else {
            this.props.setActiveContent('refilter-finished');
        }
    }

    render() {
        const { hasFilters, title, activeContent, setActiveContent } = this.props;
        const { time } = this.state;

        const renderedTime = `${Math.floor(time / 60)}:${time % 60 > 9 ? time % 60 : (`0${time % 60}`)}`;

        return (
            <div>
                <h1 className="xxCollection-title">
                    {title}
                </h1>

                {
                    activeContent === 'refilter-processing' ? (
                        <a
                            href=""
                            className="xxCollectionFilterToggle xxCollectionFilterToggle--countdown"
                            onClick={e => e.preventDefault()}>
                            <span>{renderedTime}</span>
                        </a>
                    ) : (
                        <a
                            href=""
                            className="xxCollectionFilterToggle"
                            onClick={e => setActiveContent('refilter', e)}>
                            <span>Refilter</span>
                        </a>
                    )
                }

                {
                    hasFilters || ['has-filters', 'refilter-finished'].indexOf(activeContent) >= 0 ? (
                        <XXCollectionFilters />
                    ) : (
                        <div className="xxCollectionFilters">
                            <strong className="xxCollectionFilters-title">Filters</strong>
                            <span className="xxCollectionFilters-value">None</span>
                        </div>
                    )
                }

                <XXLift />

                <XXCollectionActions setActiveContent={setActiveContent} />
            </div>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
