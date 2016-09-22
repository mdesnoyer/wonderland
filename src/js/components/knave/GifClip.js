import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom'; 

export default class GifClip extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps){
        return this.props.url !== nextProps.url 
    }

    componentDidUpdate(_prevProps, _prevState) {
      React.findDOMNode(this.refs.video).load(); // you can add logic to check if sources have been changed
    }

    render() {
        var url = this.props.url; 
        var score = Math.round(this.props.score); 
        return (
            <div className="xxGifContainer" data-score={score}>
                <video
                    ref="video" 
                    poster={this.props.poster}
                    className="xxGifVideo" 
                    loop
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleOnMouseLeave}
                >
                    <source src={this.props.url} type="video/mp4"/>
                </video>
            </div>
        );
    }

    static defaultProps = {
        url: ''
    }

    static propTypes = {
        url: React.PropTypes.string.isRequired
    }

    handleMouseEnter = (e) => {
        e.target.play()
    }

    handleOnMouseLeave = (e) => {
        e.target.pause();
    }

}


