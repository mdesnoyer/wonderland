// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ({ setActiveContent, updateStage }) => {
    return (
        <ul className="xxCollectionActions">
            <li className="xxCollectionActions-item">
                <a
                    href=""
                    className="xxCollectionActions-anchor xxCollectionActions-email"
                    title="Email"
                    onClick={e => setActiveContent('email', e)}
                >
                    <span>Email</span>
                </a>
            </li>
            <li className="xxCollectionActions-item">
                <a
                    href=""
                    className="xxCollectionActions-anchor xxCollectionActions-share"
                    title="Share"
                    onClick={e => setActiveContent('share', e)}
                >
                    <span>Share</span>
                </a>
            </li>
            <li className="xxCollectionActions-item">
                <a
                    href=""
                    className="xxCollectionActions-anchor xxCollectionActions-save"
                    title="Save Results"
                    onClick={e => {e.preventDefault(); updateStage('sign-up');}}
                >
                    <span>Save</span>
                </a>
            </li>
            <li className="xxCollectionActions-item">
                <a
                    href=""
                    className="xxCollectionActions-anchor xxCollectionActions-delete"
                    title="Delete"
                    onClick={e => setActiveContent('delete', e)}
                >
                    <span>Delete</span>
                </a>
            </li>
        </ul>
    );
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
