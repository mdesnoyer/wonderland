// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import DropDown from './DropDown';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';
import Message from '../wonderland/Message'

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var ImageUploadOverlay = React.createClass({
    getInitialState: function() {
        return {
            dragHover: false,
            photos: false,
            gender: '',
            age: '',
        }
    },
    componentWillMount: function() { 
        var self = this;
        if (self.props.error) {
            self.setState({ isMessageNeeded: true });
        }
    },
    componentWillUnmount: function() {
        var self = this;
        self.setState({ isMessageNeeded: false });
    },
    updateField: function(field, value) {
        var self = this;
        this.setState({
            [field]: value
        });
    },
    render() {
        const { isOnboarding } = this.props;
        var self = this,
            submitClassName = ['xxButton', 'xxButton--highlight'],
            className = ['xxUploadDialog']
            // messageNeeded = self.state.isMessageNeeded ? <Message message={self.props.error} type={'formError'}/> : null
        ;
        // if (isValid) {
        //     submitClassName.push('xxButton--important');
        // }
        return (
            <section
                className={className.join(' ')}
            >
				<div className="xxUploadDialog-inner">
                    <div className="xxUploadDialog-intro">
                        <h2 className="xxTitle">Upload Your Images</h2>
                        <p>You can drag and drop your images into the window. Or you can use the buttons below to browse your device or Dropbox account.</p>
                    </div>
                    <div className="xxFormField">
                        <label className="xxLabel">Choose Image Source</label>
                        <div className="xxButton xxButton--uploadDialog xxButton--highlight xxButton--file">
                            Local
                            <input
                                type="file"
                                multiple
                                className="xxButton-fileInput"
                                
                            />
                        </div>
                        <button
                            className="xxButton xxButton--uploadDialog xxButton--highlight"
                            onClick={e => this.setState({photos: true})}
                        >Dropbox</button>
                    </div>
            	</div>
            </section>
        );
    },
    handleClick: function() {
        var self = this;
            if (self.props.handleUpload) {
                self.props.handleUpload(self.state.url);
            }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ImageUploadOverlay;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
