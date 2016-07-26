// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// animation requires 9 images since it's finely tuned for specific
// timings which would need to be re-worked

var images = [
    '/img/drift/scaled/drift-1.jpg',
    '/img/drift/scaled/drift-2.jpg',
    '/img/drift/scaled/drift-3.jpg',
    '/img/drift/scaled/drift-4.jpg',
    '/img/drift/scaled/drift-5.jpg',
    '/img/drift/scaled/drift-6.jpg',
    '/img/drift/scaled/drift-7.jpg',
    '/img/drift/scaled/drift-8.jpg',
    '/img/drift/scaled/drift-9.jpg',
];

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default () => (
    <div className="xxHomeImages">
        <div className="xxHomeImages-inner">
            {
                images.map((image, index) => (
                    <img src={image} className="xxHomeImages-image" key={index} />
                ))
            }
        </div>
    </div>
);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
