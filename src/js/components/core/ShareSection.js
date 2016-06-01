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
            title = 'Neon Image',
            greyBackground = {fill:'#aaa'},
            outerDivstyling = {width:'32px',height:'32px'},
            svgStyling = {fill:'white',width:'32px',height:'32px'}
        ; 
        return (
            <div className='columns container is-fluid'> 
                <FacebookShareButton
                    url={shareUrl}
                    title={title}
                    className={'column is-3'}
                    >
                    <FacebookIcon
                        iconBgStyle={greyBackground}
                        size={32}
                        round />
                </FacebookShareButton>
                <TwitterShareButton
                    url={shareUrl}
                    title={title}
                    className={'column is-3'}
                     >
                    <TwitterIcon
                        iconBgStyle={greyBackground}
                        size={32}
                        round />
                </TwitterShareButton>
                <LinkedinShareButton
                    url={shareUrl}
                    title={title}
                    className={'column is-3'}
                     >
                    <LinkedinIcon
                        iconBgStyle={greyBackground}
                        size={32}
                        round />
                </LinkedinShareButton>
                <a className='column is-3' href={"mailto:?to=&subject=Check%20out%20this%20Neon%20Image&body="+self.props.url} target="_top">
                    <div className="SocialMediaShareButton SocialMediaShareButton">
                        <div style={outerDivstyling}>
                            <svg viewBox="0 0 64 64" style={svgStyling} className="social-icon social-icon">
                            <g><circle cx="32" cy="32" r="31" style={greyBackground}></circle></g> 
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
