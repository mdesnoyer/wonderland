import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import VisibilitySensor from 'react-visibility-sensor'; 

import T from '../../modules/translation';

export default class GifClip extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.videoCheck = this.videoCheck.bind(this);
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

    componentDidMount() {
        var container = document.getElementById(this.props.id);

        if (this.props.width < 670) {
            container.style.width = `${this.props.width}px`;
        };

        if (this.props.height < 420) {
            container.style.height = `${this.props.height}px`;
        };
    }

    componentDidUpdate(_prevProps, _prevState) {
        var video = this.videoCheck();
        if (video) {
            if (this.props.url !== _prevProps.url ) {
                ReactDOM.findDOMNode(this.refs[this.props.id]).load();    
            };
        };
    }

    onChange(isVisible) {
        var video = this.videoCheck();

        if (video) { 
            isVisible ? video.play() : video.pause(); 
        };
    }

    handleClick() {
        var video = this.videoCheck();

        if (video) { 
            if (video.paused) {
                video.play();
            }
            else {
                video.pause();
            }
        }
    }

    videoCheck() {
        var video = ReactDOM.findDOMNode(this.refs[this.props.id]) ? ReactDOM.findDOMNode(this.refs[this.props.id]) : null;

        if (video) {
            return video;
        } 
        else {
            return false;
        }
    }

    render() {
        var url = this.props.url,
            score = Math.round(this.props.score),
            id = this.props.id
        ;
        return (
            <div className="xxGifContainer" id={this.props.id} data-score={score}>
                <VisibilitySensor onChange={this.onChange}/>
                <h2 className="xxCollection-subtitle">
                    {T.get('copy.topNeonGif')}
                </h2>
                <video
                    className="xxGifVideo"
                    poster={this.props.poster}
                    onClick={this.handleClick}
                    ref={id}
                    preload="auto"
                    loop
                >
                    <source src={this.props.url} type="video/mp4" />
                </video>
            </div>
        );
    }
}
