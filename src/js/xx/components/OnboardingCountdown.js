// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

import renderedTime from '../utils/renderedTime';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ({ seconds }) => (
    <div className="xxOnboardingCountdown">
        <span className="xxOnboardingCountdown-label">{renderedTime(Math.floor(seconds / 60), seconds % 60)}</span>
    </div>
);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
