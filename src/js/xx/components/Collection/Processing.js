// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class XXCollectionProcessing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            time: 15,
            isReady: false,
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.handleCountdown();
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
            this.props.onComplete();
        }
    }

    render() {
        const { time, isReady } = this.state;

        const renderedTime = `${Math.floor(time / 60)}:${time % 60 > 9 ? time % 60 : (`0${time % 60}`)}`;

        return (
            <article className="xxCollection xxCollection--video xxCollection--processing">
                <h1 className="xxCollection-title">
                    Michael Jackson: From Motown to Off the Wall
                    Documentary (2016)
                </h1>

                <a
                    href=""
                    className="xxCollectionFilterToggle xxCollectionFilterToggle--countdown"
                    onClick={e => e.preventDefault()}>
                    <span>{renderedTime}</span>
                </a>

                <div className="xxCollectionFilters">
                    <strong className="xxCollectionFilters-title">Filters</strong>
                    <span className="xxCollectionFilters-value">None</span>
                </div>
            </article>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
