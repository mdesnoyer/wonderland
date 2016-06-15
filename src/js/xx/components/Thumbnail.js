// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const componentName = 'xxThumbnail';

var XXThumbnail = React.createClass({
    render: function() {
        const { href, score, size, src } = this.props;

        const Tag = href ? 'a' : 'div';

        const className = [componentName];
        if (size) {
            className.push(`${componentName}--${size}`);
        }
        if (score < 60) {
            className.push(`${componentName}--lowScore`);
        }

        return (
            <Tag href={href} className={className.join(' ')} data-score={score}>
                <img
                    className={`${componentName}-image`}
                    src={src}
                />
            </Tag>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default XXThumbnail;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
