// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import XXCollectionInfo from './Info';
import XXCollectionImages from './Images';

import XXCollectionRefilter from './Refilter';
import XXCollectionRefilterReady from './RefilterReady';
import XXCollectionShareEmail from './ShareEmail';
import XXCollectionShareLink from './ShareLink';
import XXCollectionDelete from './Delete';

import XXCollectionProcessingReady from './ProcessingReady';

import XXCollectionMobileNotification from './MobileNotification';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class XXCollection extends React.Component {
    constructor(props) {
        super(props);

        this.setActiveContent = this.setActiveContent.bind(this);

        this.state = {
            activeContent: null,
        };

        if (props.isProcessingReady) {
            this.state.isProcessingReady = true;
        }
    }

    setActiveContent(content, e) {
        if (e) {
            e.preventDefault();
        }

        this.setState({
            activeContent: content,
        });
    }

    render() {
        const { setActiveContent } = this;
        const { type } = this.props;
        const { activeContent, isProcessingReady } = this.state;

        const className = ['xxCollection'];
        if (type) {
            className.push(`xxCollection--${type}`);
        } else {
            className.push('xxCollection--video');
        }

        let content = (
            <XXCollectionInfo
                {...this.props}
                key="collection-info"
                activeContent={activeContent}
                setActiveContent={setActiveContent}
            />
        );

        switch (activeContent) {
            case 'refilter':
                content = (
                    <XXCollectionRefilter
                        key="collection-refilter"
                        setActiveContent={setActiveContent}
                    />
                );
                break;
            case 'email':
                content = (
                    <XXCollectionShareEmail
                        key="collection-email"
                        setActiveContent={setActiveContent}
                    />
                );
                break;
            case 'share':
                content = (
                    <XXCollectionShareLink
                        key="collection-share"
                        setActiveContent={setActiveContent}
                    />
                );
                break;
            case 'delete':
                content = (
                    <XXCollectionDelete
                        key="collection-delete"
                        setActiveContent={setActiveContent}
                    />
                );
                break;
        }

        return (
            <article className={className.join(' ')}>
                <div className="xxCollection-content">
                    <ReactCSSTransitionGroup transitionName="xxFadeInOutSequential" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
                        {content}
                    </ReactCSSTransitionGroup>
                </div>

                <XXCollectionImages
                    type={type}
                    isMobile={this.props.isMobile}
                    updateStage={this.props.updateStage}
                />

                <ReactCSSTransitionGroup transitionName="xxFadeInOut" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
                    {
                        activeContent === 'refilter-finished' ? (
                            <XXCollectionRefilterReady
                                key="refilter-ready"
                                setActiveContent={setActiveContent}
                            />
                        ) : null
                    }

                    {
                        isProcessingReady ? (
                            <XXCollectionProcessingReady
                                key="processing-ready"
                                onClick={() => this.setState({ isProcessingReady: false })}
                            />
                        ) : null
                    }
                </ReactCSSTransitionGroup>

                {
                    this.props.isMobile ? (
                        <XXCollectionMobileNotification />
                    ) : null
                }
            </article>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
