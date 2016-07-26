import React from 'react';

export default class TutorialButton extends React.Component {
    render() {
        const { buttonStyle, onClick, name } = this.props;

        return (
            <a
                href=""
                className={`xxButton xxButton--${buttonStyle}`}
                onClick={onClick}
            >{name}</a>
        );
    }
}
