import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import VisibilitySensor from 'react-visibility-sensor'; 

import T from '../../modules/translation';

export default class GifClip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {buttonClass: "xxClipClick--Start"};
        this.onChange = this.onChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    static defaultProps = {
        url: '',
        score: 0,
        id: ''
    }

    static propTypes = {
        url: React.PropTypes.string.isRequired,
        score: React.PropTypes.number.isRequired,
        id: React.PropTypes.string.isRequired
    }

    componentDidUpdate(_prevProps, _prevState) {
        var video = ReactDOM.findDOMNode(this.refs[this.props.id]) ? ReactDOM.findDOMNode(this.refs[this.props.id]) : null;
        if (video) {
            if (this.props.url !== _prevProps.url ) {
                ReactDOM.findDOMNode(this.refs[this.props.id]).load();    
            };
        };
    }
    handleClick(e) {
        // e.preventDefault()
        var video = ReactDOM.findDOMNode(this.refs[this.props.id]) ? ReactDOM.findDOMNode(this.refs[this.props.id]) : null; 
        if (video) {

            if (video.paused) {
                this.setState({ buttonClass: "xxClipClick" });
                video.play();      
            }
            else {
                this.setState({ buttonClass: "xxClipClick--Start" });
                video.pause();
            }

        };
    }

    onChange(isVisible, active) {
        var video = ReactDOM.findDOMNode(this.refs[this.props.id]) ?
                    ReactDOM.findDOMNode(this.refs[this.props.id]) 
                    : null
        ; 
        if (video) { 
            if (!isVisible) {
                this.setState({ buttonClass: "xxClipClick--Start" });
                video.pause();  
            }
        };
    }

    render() {
        var url = this.props.url,
            score = Math.round(this.props.score),
            id = this.props.id
        ;

        return (
            <div className="xxGifContainer" data-score={score}>

                <h2 className="xxCollection-subtitle"> {T.get('copy.topNeonGif')} </h2>
            
                <VisibilitySensor onChange={this.onChange}/>

                <button className={this.state.buttonClass} onClick={this.handleClick}> CLICK ME </button>

                <video 
                    ref={id} 
                    className="xxGifVideo"
                    poster={this.props.poster}
                    loop
                    preload="auto"
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}>

                    <source src={this.props.url} type="video/mp4" />

                </video>

            </div>
        );
    }
}
