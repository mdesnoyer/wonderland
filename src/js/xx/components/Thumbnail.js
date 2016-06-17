// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ({ href, score, size, src }) => {
    const Tag = href ? 'a' : 'div';

    const className = ['xxThumbnail'];
    if (size) {
        className.push(`xxThumbnail--${size}`);
    }
    if (score < 60) {
        className.push(`xxThumbnail--lowScore`);
    }

    return (
        <Tag
            href={href}
            className={className.join(' ')}
            data-score={score}
        >
            <img
                className="xxThumbnail-image"
                src={src}
            />
        </Tag>
    );
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
