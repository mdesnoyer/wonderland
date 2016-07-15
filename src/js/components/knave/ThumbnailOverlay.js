// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import T from '../../modules/translation';
import ZoomThumbnail from './ZoomThumbnail';
import ReactDOM from 'react-dom';
import scrollbarWidth from '../../xx/utils/scrollbarWidth';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var ThumbnailOverlay = React.createClass({
    _prevKeyDown: '',
    propTypes: {
        closeThumbnailOverlay: React.PropTypes.func.isRequired,
        thumbnails: React.PropTypes.array.isRequired,
        selectedItem: React.PropTypes.number.isRequired,
        total: React.PropTypes.number.isRequired,
        handleClickPrevious: React.PropTypes.func.isRequired,
        handleClickNext: React.PropTypes.func.isRequired,
        handleKeyEvent: React.PropTypes.func.isRequired,
        displayThumbLift: React.PropTypes.number.isRequired
    },
    componentDidMount: function() {
        var self = this;
        if (document.body.onkeydown) {
            self._prevKeyDown = document.body.onkeydown;
        }
        document.body.onkeydown = self.props.handleKeyEvent;
        ReactDOM.findDOMNode(this).scrollTop = 0;
        document.body.classList.add('has-overlayWithScroll', 'has-overlayDark');
        document.body.style.marginRight = `${scrollbarWidth}px`;
    },
    componentWillUnmount: function() {
        var self = this;
        if (self._prevKeyDown) {
            document.body.onkeydown = self._prevKeyDown;
        }
        document.body.classList.remove('has-overlayWithScroll', 'has-overlayDark');
        document.body.style.marginRight = 0;
    },
    render: function() {
        var self = this,
            tempValenceArray = ['sunshine', 'rainbows', 'unicorns', 'happiness', 'kittens'] // TODO
        ;
        return (
            <article className="xxOverlay xxOverlay--dark xxOverlay--scroll">
                <a href="#" className="xxOverlay-close" onClick={self.props.closeThumbnailOverlay}>{T.get('action.close')}</a>
                    <div className="xxImageZoom">
                        {
                            self.props.thumbnails.map(function(thumbnail, i) {
                                return (
                                    <ZoomThumbnail
                                        key={i}
                                        thumbnail={thumbnail}
                                        index={i}
                                        selectedItem={self.props.selectedItem}
                                        total={self.props.total}
                                        handleClickPrevious={self.props.handleClickPrevious}
                                        handleClickNext={self.props.handleClickNext}
                                        displayThumbLift={self.props.displayThumbLift}
                                        valence={[tempValenceArray[Math.floor(Math.random() * tempValenceArray.length)]]}
                                        extraClass={thumbnail.type === 'neon' ? 'xxThumbnail--highLight' : 'xxThumbnail--lowLight'}
                                    />
                                );
                            })
                        }
                    </div>
            </article>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ThumbnailOverlay;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
