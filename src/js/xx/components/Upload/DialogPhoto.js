// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import XXSelect from '../Select';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const optionsGender = [
    {
        key: 'f',
        value: 'Female',
    },
    {
        key: 'm',
        value: 'Male',
    },
];

const optionsAge = [
    {
        key: 1,
        value: '18-29',
    },
    {
        key: 2,
        value: '30-39',
    },
    {
        key: 3,
        value: '40-49',
    },
    {
        key: 4,
        value: '50+'
    },
];

const TIMER_INITIAL = 100;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class XXUploadDialogPhoto extends React.Component {
    constructor(props) {
        super(props);

        this.toggleDragHover = this.toggleDragHover.bind(this);
        this.triggerDropUpload = this.triggerDropUpload.bind(this);
        this.triggerUpload = this.triggerUpload.bind(this);
        this.updateField = this.updateField.bind(this);

        this.state = {
            dragHover: false,
            photos: false,
            gender: '',
            age: '',
        };
    }

    triggerDropUpload(e) {
        e.preventDefault();

        if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
            this.triggerUpload();
        }
    }

    triggerUpload() {
        this.setState({
            dragHover: false,
            timer: TIMER_INITIAL, // dummy timer to simulate upload
        }, this.handleCountdown);
    }

    handleCountdown() {
        const { timer } = this.state;

        if (timer > 0) {
            setTimeout(() => {
                this.setState({
                    timer: timer - 1,
                });
                this.handleCountdown();
            }, 100);
        } else {
            this.setState({
                photos: true,
                timer: null,
            });
        }
    }

    toggleDragHover(e) {
        if (e.dataTransfer.types && e.dataTransfer.types.some(type => type === 'Files')) {
            this.setState({
                dragHover: !this.state.dragHover,
            });
        }
    }

    updateField(field, value) {
        this.setState({
            [field]: value,
        });
    }

    render() {
        const { toggleDragHover, triggerDropUpload, triggerUpload, updateField } = this;
        const { isOnboarding, onSubmit } = this.props;
        const { photos, timer, gender, age, dragHover } = this.state;

        const isValid = photos;

        const className = ['xxUploadDialog'];
        if (dragHover) {
            className.push('has-dragAndDropHover');
        }

        const submitClassName = ['xxButton', 'xxButton--highlight'];
        if (isValid) {
            submitClassName.push('xxButton--important');
        }

        return (
            <section
                className={className.join(' ')}
                onDragEnter={toggleDragHover}
                onDragOver={e => e.preventDefault()}
                onDragLeave={toggleDragHover}
                onDrop={triggerDropUpload}
            >
                <div className="xxDragAndDrop">
                    <ReactCSSTransitionGroup transitionName="xxFadeInOutFast" transitionEnterTimeout={200} transitionLeaveTimeout={200}>
                        {
                            !photos && !timer && timer !== 0 ? (
                                <div className="xxDragAndDrop-content xxDragAndDrop-hint" key="drag-and-drop-hint">
                                    Drag and Drop your image(s) here.<br />
                                    Sorry, no folders.
                                </div>
                            ) : null
                        }
                        {
                            timer || timer === 0 ? (
                                <div className="xxDragAndDrop-content xxDragAndDrop-progress" key="drag-and-drop-progress">
                                    <span className="xxDragAndDrop-progressCounter">
                                        {`${Math.round((TIMER_INITIAL - timer) / TIMER_INITIAL * 100)}%`}
                                    </span>
                                    Uploading (24) files
                                </div>
                            ) : null
                        }
                        {
                            photos && !timer ? (
                                <div className="xxDragAndDrop-content xxDragAndDrop-complete" key="drag-and-drop-complete">
                                    Uploaded (24) files
                                </div>
                            ) : null
                        }
                    </ReactCSSTransitionGroup>
                </div>
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
                                onChange={triggerUpload}
                            />
                        </div>
                        <button
                            className="xxButton xxButton--uploadDialog xxButton--highlight"
                            onClick={e => this.setState({photos: true})}
                        >Dropbox</button>
                    </div>
                    {
                      isOnboarding ? null : (
                        <div className="xxFormField">
                            <label className="xxLabel">Filters</label>
                            <XXSelect
                                label="Gender"
                                value={gender}
                                options={optionsGender}
                                onSelect={value => updateField('gender', value)}
                            />
                            <XXSelect
                                label="Age"
                                value={age}
                                options={optionsAge}
                                onSelect={value => updateField('age', value)}
                            />
                        </div>
                      )
                    }
                    {
                        isOnboarding ? null : (
                            <p className="xxFormNote">Get images for a specific audience.</p>
                        )
                    }
                    <button
                        disabled={!isValid}
                        className={submitClassName.join(' ')}
                        type="button"
                        onClick={isValid ? onSubmit : null}
                    >Submit</button>
                </div>
            </section>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
