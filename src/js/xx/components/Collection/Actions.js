// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ({ setActiveContent }) => {
    return (
        <ul className="xxCollectionActions">
            <li className="xxCollectionActions-item">
                <a
                    href=""
                    className="xxCollectionActions-anchor xxCollectionActions-email"
                    onClick={e => setActiveContent('email', e)}
                >
                    <span>Email</span>
                </a>
            </li>
            <li className="xxCollectionActions-item">
                <a
                    href=""
                    className="xxCollectionActions-anchor xxCollectionActions-share"
                    onClick={e => setActiveContent('share', e)}
                >
                    <span>Share</span>
                </a>
            </li>
            <li className="xxCollectionActions-item">
                <a
                    href=""
                    className="xxCollectionActions-anchor xxCollectionActions-save"
                    onClick={e => e.preventDefault()}
                >
                    <span>Save</span>
                </a>
            </li>
            <li className="xxCollectionActions-item">
                <a
                    href=""
                    className="xxCollectionActions-anchor xxCollectionActions-delete"
                    onClick={e => setActiveContent('delete', e)}
                >
                    <span>Delete</span>
                </a>
            </li>
        </ul>
    );
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
