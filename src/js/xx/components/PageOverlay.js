// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import ReactDOM from 'react-dom';

import scrollbarWidth from '../utils/scrollbarWidth';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class XXPageOverlay extends React.Component {
    constructor(props) {
        super(props);

        this.handleBgCloseClick = this.handleBgCloseClick.bind(this);
        this.handleCloseClick = this.handleCloseClick.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        ReactDOM.findDOMNode(this).scrollTop = 0;

        document.body.classList.add('has-overlay');
        document.body.style.marginRight = `${scrollbarWidth}px`;
    }

    componentWillUnmount() {
        document.body.classList.remove('has-overlay');
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
            <div className="xxOverlay xxOverlay--page" onClick={handleBgCloseClick}>
                <div className="xxPageOverlay">
                    <a href="" className="xxPageOverlay-close" onClick={handleCloseClick}>Close</a>
                    {children}
                </div>
            </div>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
