// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ({ href, className, score, size, src, ...tagProps }) => {
    const Tag = href ? 'a' : 'div';

    const rootClassName = ['xxThumbnail'];
    if (size) {
        rootClassName.push(`xxThumbnail--${size}`);
    }
    if (className) {
        rootClassName.push(className);
    }

    return (
        <Tag
            href={href}
            className={rootClassName.join(' ')}
            data-score={score}
            {...tagProps}
        >
            <img
                className="xxThumbnail-image"
                src={src}
            />
        </Tag>
    );
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
