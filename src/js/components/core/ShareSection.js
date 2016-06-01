// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import {ShareButtons, generateShareIcon} from 'react-share';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} = ShareButtons

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const LinkedinIcon = generateShareIcon('linkedin');

var ShareSection = React.createClass({
    render: function() {
        //the variables below are used to make the formatting consistent with the React Share package
        var self = this,
            shareUrl = self.props.url,
            title = 'Check out this Neon Score of ' + self.props.score + '!' ,
            customColorBackground = {fill:'#aaa'}
        ;
        return (
            <div className='columns container'>
                <FacebookShareButton
                    url={shareUrl}
                    title={'I scored a '+ self.props.score +' with Neon!'}
                    className={'column is-3 share-section-icon-color'}
                    >
                    <FacebookIcon
                        iconBgStyle={customColorBackground}
                        size={32}
                        round />
                </FacebookShareButton>
                <TwitterShareButton
                    url={shareUrl}
                    title={'Thanks @neon, you rock, you got me a ' + self.props.score + '!'}
                    className={'column is-3 share-section-icon-color'}
                     >
                    <TwitterIcon
                        iconBgStyle={customColorBackground}
                        size={32}
                        round />
                </TwitterShareButton>
                <LinkedinShareButton
                    url={shareUrl}
                    title={'I scored a '+ self.props.score +' with Neon!'}
                    className={'column is-3 share-section-icon-color'}
                     >
                    <LinkedinIcon
                        iconBgStyle={customColorBackground}
                        size={32}
                        round />
                </LinkedinShareButton>
                <a href={"mailto:?to=&subject=Check%20out%20this%20Neon%20Image&body="+ title + " Link: " + self.props.url} target="_top">
                    <div className="column is-3">
                        <div className="share-section-div-circle-svg">
                            <svg viewBox="0 0 64 64" className="share-section-circle-svg">
                                <g><circle cx="32" cy="32" r="31" style={customColorBackground}></circle></g>
                                <g><path d="M17,22v20h30V22H17z M41.1,25L32,32.1L22.9,25H41.1z M20,39V26.6l12,9.3l12-9.3V39H20z"></path></g>
                            </svg>
                        </div>
                    </div>
                </a>
            </div>
        )
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ShareSection;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
