import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import VisibilitySensor from 'react-visibility-sensor'; 

export default class GifClip extends React.Component {
    constructor(props, context) {
        super(props);
        context.isMobile
        this.refs
        this.onChange = this.onChange.bind(this)
    }

    static defaultProps = {
        url: ''
    }

    static propTypes = {
        url: React.PropTypes.string.isRequired
    }

    componentDidUpdate(_prevProps, _prevState) {
        if (this.props.url !== _prevProps.url ){
            ReactDOM.findDOMNode(this.refs[this.props.id]).load();    
        };
    }

    onChange(isVisible) {
        var video = ReactDOM.findDOMNode(this.refs[this.props.id]) ? ReactDOM.findDOMNode(this.refs[this.props.id]) : null; 
        
        if (video) { 
            isVisible ? video.play() : video.pause(); 
        };
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

GifClip.contextTypes = {
    isMobile: PropTypes.bool
}

