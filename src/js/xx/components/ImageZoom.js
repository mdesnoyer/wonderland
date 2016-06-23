// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import ReactDOM from 'react-dom';

import scrollbarWidth from '../utils/scrollbarWidth';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class XXPageOverlay extends React.Component {
    constructor(props) {
        super(props);

        this.handleCloseClick = this.handleCloseClick.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        ReactDOM.findDOMNode(this).scrollTop = 0;

        document.body.classList.add('has-overlayWithScroll', 'has-overlayDark');
        document.body.style.marginRight = `${scrollbarWidth}px`;
    }

    componentWillUnmount() {
        document.body.classList.remove('has-overlayWithScroll', 'has-overlayDark');
        document.body.style.marginRight = 0;
    }

    handleCloseClick(e) {
        e.preventDefault();

        this.props.onClose();
    }

    render() {
        const { handleBgCloseClick, handleCloseClick } = this;
        const { children } = this.props;

        return (
            <div className="xxOverlay xxOverlay--dark xxOverlay--scroll xxOverlay--visibleNav">
                <a href="" className="xxOverlay-close" onClick={handleCloseClick}>Close</a>
                {children}
            </div>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
