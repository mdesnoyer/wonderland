import React, {PropTypes} from 'react';

import {
        MobileInitialDisplay,
        MobileLoadingDisplay,
        MobileSuccessDisplay,
        InitialDisplay,
        LoadingDisplay,
        SuccessDisplay
    } from './UploadDisplays';


var UploadProgressContainer = React.createClass({

    contextTypes: {
        isMobile: PropTypes.bool
    },

    render: function () {
        var props = this.props;
        const isMobile = this.context.isMobile;
        if(isMobile) {
            return (
                <div>
                        {this.props.uploadState === 'initial' && <MobileInitialDisplay {...props} />}
                        {this.props.uploadState === 'loading' && <MobileLoadingDisplay {...props} />}
                        {this.props.uploadState === 'success' && <MobileSuccessDisplay {...props} />}
                </div>
            );
        }
        else {
            return (
                <div>
                        {this.props.uploadState === 'initial' && <InitialDisplay {...props} />}
                        {this.props.uploadState === 'loading' && <LoadingDisplay {...props} />}
                        {this.props.uploadState === 'success' && <SuccessDisplay {...props} />}
                </div>
            );
        }
    }
})

export default UploadProgressContainer



