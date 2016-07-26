// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import scrollbarWidth from '../utils/scrollbarWidth';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class XXPageOverlay extends React.Component {
    constructor(props) {
        super(props);

        this.handleBgCloseClick = this.handleBgCloseClick.bind(this);
        this.handleCloseClick = this.handleCloseClick.bind(this);
    }

    componentDidUpdate() {
        window.scrollTo(0, 0);
        ReactDOM.findDOMNode(this).scrollTop = 0;
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        ReactDOM.findDOMNode(this).scrollTop = 0;

        document.body.classList.add('has-overlayWithNav');
        document.body.style.marginRight = `${scrollbarWidth}px`;
    }

    componentWillUnmount() {
        document.body.classList.remove('has-overlayWithNav');
        document.body.style.marginRight = 0;
    }

    handleBgCloseClick(e) {
        const thisNode = ReactDOM.findDOMNode(this);

        if (thisNode !== e.target && thisNode.contains(e.target)) {
            return;
        }

        this.props.onClose();
    }

    handleCloseClick(e) {
        e.preventDefault();

        this.props.onClose();
    }

    render() {
        const { handleBgCloseClick, handleCloseClick } = this;
        const { children } = this.props;

        return (
            <div className="xxOverlay xxOverlay--scroll xxOverlay--visibleNav" onClick={handleBgCloseClick}>
                <a href="" className="xxOverlay-close" onClick={handleCloseClick}>Close</a>
                <div className="xxPageOverlay">
                    <ReactCSSTransitionGroup transitionName="xxFadeInOutSequential" transitionEnterTimeout={400} transitionLeaveTimeout={200}>
                        {children}
                    </ReactCSSTransitionGroup>
                </div>
            </div>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
