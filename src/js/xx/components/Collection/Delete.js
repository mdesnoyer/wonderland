// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ({ setActiveContent }) => {
    return (
        <div className="xxCollectionAction">
            <h2 className="xxTitle">Delete Collection</h2>
            <p>
                Are you sure you want to delete all of the images from this video collection?
            </p>
            <div className="xxCollectionAction-buttons">
                <button
                    className="xxButton"
                    type="button"
                    onClick={e => setActiveContent('', e)}
                >Cancel</button>
                <button
                    className="xxButton xxButton--highlight"
                    type="button"
                >Delete</button>
            </div>
        </div>
    );
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
