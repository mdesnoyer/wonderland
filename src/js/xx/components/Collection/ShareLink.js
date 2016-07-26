// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ({ setActiveContent }) => {
    return (
        <div className="xxCollectionAction">
            <h2 className="xxTitle">Share Your Images</h2>
            <ul className="xxCollectionShare">
                <li className="xxCollectionShare-item is-active">
                    <span
                        className="xxCollectionShare-anchor xxCollectionShare-link"
                    ><span>Link</span></span>
                </li>
                <li className="xxCollectionShare-item">
                    <a
                        href="#"
                        target="_blank"
                        className="xxCollectionShare-anchor xxCollectionShare-fb"
                    ><span>Facebook</span></a>
                </li>
                <li className="xxCollectionShare-item">
                    <a
                        href="#"
                        target="_blank"
                        className="xxCollectionShare-anchor xxCollectionShare-twitter"
                    ><span>Twitter</span></a>
                </li>
                <li className="xxCollectionShare-item">
                    <a
                        href="#"
                        target="_blank"
                        className="xxCollectionShare-anchor xxCollectionShare-linkedin"
                    ><span>LinkedIn</span></a>
                </li>
            </ul>
            <p>
                Copy the link below to share this collection. Anyone with this
                link can view your images for this video.
            </p>
            <div className="xxFormField">
                <label
                    className="xxLabel"
                    htmlFor="xx-share-link"
                >Collection Link</label>
                <input
                    className="xxInputText"
                    id="xx-share-link"
                    type="text"
                    value="https://demo.neon-lab.com/zX78xg"
                    readOnly
                />
            </div>
            <div className="xxCollectionAction-buttons">
                <button
                    className="xxButton"
                    type="button"
                    onClick={e => setActiveContent('', e)}
                >Back</button>
                <button
                    className="xxButton xxButton--highlight"
                    type="button"
                >Copy</button>
            </div>
        </div>
    );
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
