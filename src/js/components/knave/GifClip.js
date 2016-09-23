import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import T from '../../modules/translation'; 

export default class GifClip extends React.Component {
    constructor(props, context) {
        super(props);
        context.isMobile
    }

    static defaultProps = {
        url: ''
    }

    static propTypes = {
        url: React.PropTypes.string.isRequired
    }

    shouldComponentUpdate(nextProps) {
        return this.props.url !== nextProps.url 
    }

    componentDidUpdate(_prevProps, _prevState) {
        ReactDOM.findDOMNode(this.refs.video).load();
    }

    handleMouseEnter = (e) => {
        !this.context.isMobile  && e.target.play()
    }

    handleOnMouseLeave = (e) => {
        !this.context.isMobile && e.target.pause();
    }

    render() {
        var url = this.props.url, 
            score = Math.round(this.props.score),
            context  = this.context.isMobile
        ; 
        return (
            <div className="xxGifContainer" data-score={score}>
                <h2 className="xxCollection-subtitle">
                    {T.get('copy.topNeonGif')}
                </h2> 
                <video
                    ref="video" 
                    poster={this.props.poster}
                    className="xxGifVideo" 
                    loop
                    autoPlay={context}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleOnMouseLeave}
                >
                    <source src={this.props.url} type="video/mp4"/>
                </video>
            </div>
        );
    }
}

GifClip.contextTypes = {
    isMobile: PropTypes.bool
}

