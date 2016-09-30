import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import VisibilitySensor from 'react-visibility-sensor'; 

import T from '../../modules/translation';

export default class GifClip extends React.Component {
    constructor(props) {
        super(props);
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
            if (this.props.url !== _prevProps.url ){
                ReactDOM.findDOMNode(this.refs[this.props.id]).load();    
            };
        };
            
    }

    onChange(isVisible) {
        var video = ReactDOM.findDOMNode(this.refs[this.props.id]) ? ReactDOM.findDOMNode(this.refs[this.props.id]) : null; 
        if (video) { 
            isVisible ? video.play() : video.pause(); 
        };
    }

    handleClick() {
        var video = ReactDOM.findDOMNode(this.refs[this.props.id]) ? ReactDOM.findDOMNode(this.refs[this.props.id]) : null; 
        if (video) { 
            if(video.paused) {
                video.play();
            }
            else {
                video.pause();
            }
        }

    }

    render() {
        var url = this.props.url,
            score = Math.round(this.props.score),
            id = this.props.id
        ;
        return (
            <div className="xxGifContainer" data-score={score}>
                <VisibilitySensor onChange={this.onChange}/>
                <h2 className="xxCollection-subtitle">
                    {T.get('copy.topNeonGif')}
                </h2>
                <video
                    ref={id} 
                    poster={this.props.poster}
                    className="xxGifVideo"
                    loop
                    preload="auto"
                    onClick={this.handleClick}
                >
                    <source
                        src={this.props.url}
                        type="video/mp4"
                    />
                </video>
            </div>
        );
    }
}
