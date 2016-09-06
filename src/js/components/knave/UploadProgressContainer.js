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
                        {this.props.mode === 'initial' && <MobileInitialDisplay {...props} />}
                        {this.props.mode === 'loading' && <MobileLoadingDisplay {...props} />}
                        {this.props.mode === 'success' && <MobileSuccessDisplay {...props} />}
                </div>
            );
        }
        else {
            return (
                <div>
                        {this.props.mode === 'initial' && <InitialDisplay {...props} />}
                        {this.props.mode === 'loading' && <LoadingDisplay {...props} />}
                        {this.props.mode === 'success' && <SuccessDisplay {...props} />}
                </div>
            );
        }
    }
})

export default UploadProgressContainer



