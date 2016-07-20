import React from 'react';
import T from '../../modules/translation';

export default class VideosMobileWarning extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="xxCollectionMobileNotification">
                <h2 className="xxCollection-title">
                    {T.get('copy.mobile.warning.title')}
                </h2>
                <p className="xxCollectionMobileNotification-text">
                    {T.get('copy.mobile.warning.description')}
                </p>
            </div>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
