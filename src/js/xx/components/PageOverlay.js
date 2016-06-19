// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import ReactDOM from 'react-dom';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class XXPageOverlay extends React.Component {
    constructor(props) {
        super(props);

        this.handleBgCloseClick = this.handleBgCloseClick.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.body.classList.add('has-overlay');
    }

    componentWillUnmount() {
        document.body.classList.remove('has-overlay');
    }

    handleBgCloseClick(e) {
        const thisNode = ReactDOM.findDOMNode(this);

        if (thisNode !== e.target && thisNode.contains(e.target)) {
            return;
        }

        this.props.onClose();
    }

    render() {
        const { handleBgCloseClick } = this;
        const { children } = this.props;

        return (
            <div className="xxOverlay xxOverlay--page" onClick={handleBgCloseClick}>
                <div className="xxPageOverlay">
                    {children}
                </div>
            </div>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
