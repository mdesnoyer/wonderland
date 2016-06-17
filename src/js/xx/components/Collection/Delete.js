// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ({ setActiveContent }) => {
    return (
        <div className="xxCollectionAction">
            <h2 className="xxTitle">Delete</h2>
            <p>
                Volutpat libero sapien, vel pellentesque ex porttitor eu.
                Morbi semper pharetra dui, et volutpat mi varius eu. Praesent
                auctor mi dui, ut vulputate enim.
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
