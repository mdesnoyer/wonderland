import React, { PropTypes } from 'react';
import scrollbarWidth from '../../xx/utils/scrollbarWidth';
import LearnMore from './LearnMore';
import Contact from './Contact';
import Account from './Account';
import PrimaryNavigation from './PrimaryNavigation';
import SignUp from './SignUp';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';

class Sidebar extends React.Component {

    static displayName = 'Sidebar';

    static propTypes = {
        onSetContent: PropTypes.func.isRequired,
        content: PropTypes.oneOf(UTILS.SIDEBAR_CONTENT_TYPES),
    }

    constructor() {
        super();
        this.handleKeyEvent = this.handleKeyEvent.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSidebarClick = this.handleSidebarClick.bind(this);
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyEvent);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.content) {
            document.body.classList.remove('has-overlayWithNav');
            document.body.style.marginRight = 0;
            return;
        }
        this.node.scrollTop = 0;
        document.body.classList.add('has-overlayWithNav');
        document.body.style.marginRight = `${scrollbarWidth}px`;
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyEvent);
    }

    handleKeyEvent(e) {
        if (e.keyCode === 27) {
            this.props.onSetContent();
            e.stopPropagation();
        }
    }

    handleClose(e) {
        e.preventDefault();
        this.props.onSetContent();
    }

    handleClick(e) {
        e.preventDefault();
        this.props.onSetContent(e.target.name);
    }

    handleSidebarClick(e) {
        e.stopPropagation();
    }

    renderBody() {
        switch (this.props.content) {
        case 'learnMore':
            return <LearnMore />;
        case 'contact':
            return <Contact handleClose={this.handleClose} />;
        case 'signUp':
            return <SignUp handleClose={this.handleClose} />;
        case 'account':
            return <Account />;
        case 'primaryNavigation':
            return (
                <PrimaryNavigation
                    handleClick={this.handleClick}
                    sidebarContent={this.props.content}
                />
            );
        default:
            return null;
        }
    }

    render() {
        return (
            <div
                className="xxOverlay xxOverlay--scroll xxOverlay--visibleNav"
                onClick={this.handleClose}
                hidden={!this.props.content}
                ref={((node) => { this.node = node; })}
            >
                <a className="xxOverlay-close" onClick={this.handleClose}>
                    {T.get('action.close')}
                </a>
                <div className="xxPageOverlay" onClick={this.handleSidebarClick}>
                    {this.renderBody()}
                </div>
            </div>
        );
    }
}

export default Sidebar;
