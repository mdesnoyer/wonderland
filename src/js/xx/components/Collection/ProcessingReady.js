// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import ReactDOM from 'react-dom';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class XXCollectionRefilterReady extends React.Component {
    componentDidMount() {
        this.__timer = setTimeout(() => {
            this.props.onClick();
        }, 10000);

        this.setScrollPosition();
    }

    componentWillUnmount() {
        if (this.__timer) {
            clearTimeout(this.__timer);
        }
    }

    setScrollPosition() {
        window.scrollTo(0, ReactDOM.findDOMNode(this).parentNode.getBoundingClientRect().top - 121);
    }

    render() {
        return (
            <section className="xxOverlay">
                <div className="xxOverlay-content">
                    <h2 className="xxTitle">Your results are ready!</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Duis ante lacus, lobortis sed pretium id fermentum.
                    </p>
                    <button
                        className="xxButton xxButton--highlight"
                        type="button"
                        onClick={this.props.onClick}
                    >View Results</button>
                </div>
            </section>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
