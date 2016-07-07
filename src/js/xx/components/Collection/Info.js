// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

import renderedTime from '../../utils/renderedTime';

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
        const { hasFilters, isMobile, title, activeContent, setActiveContent, updateStage } = this.props;
        const { time } = this.state;

        return (
            <div className="xxCollectionInfo">
                <h1 className="xxCollection-title">
                    {title}
                </h1>

                {
                    activeContent === 'refilter-processing' ? (
                        <a
                            href=""
                            className="xxCollectionFilterToggle xxCollectionFilterToggle--countdown"
                            onClick={e => e.preventDefault()}>
                            <span className="xxCollectionFilterToggle-label">
                                {renderedTime(Math.floor(time / 60), time % 60)}
                            </span>
                        </a>
                    ) : (
                        <a
                            href=""
                            className="xxCollectionFilterToggle"
                            onClick={e => setActiveContent('refilter', e)}>
                            <span className="xxCollectionFilterToggle-label">Refilter</span>
                        </a>
                    )
                }

                {
                    hasFilters || ['has-filters', 'refilter-finished'].indexOf(activeContent) >= 0 ? (
                        <XXCollectionFilters

                        />
                    ) : (
                        <div className="xxCollectionFilters">
                            <strong className="xxCollectionFilters-title">Filters</strong>
                            <span className="xxCollectionFilters-value">None</span>
                        </div>
                    )
                }

                {
                    isMobile ? null : (
                        <XXLift />
                    )
                }

                <XXCollectionActions setActiveContent={setActiveContent} updateStage={updateStage} />
            </div>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
