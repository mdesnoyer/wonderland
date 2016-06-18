// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

import XXCollectionInfo from './Info';
import XXCollectionImages from './Images';

import XXCollectionRefilter from './Refilter';
import XXCollectionRefilterReady from './RefilterReady';
import XXCollectionShareEmail from './ShareEmail';
import XXCollectionShareLink from './ShareLink';
import XXCollectionDelete from './Delete';

import XXCollectionProcessingReady from './ProcessingReady';

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
        const { activeContent, isProcessingReady } = this.state;

        let content = (
            <XXCollectionInfo
                {...this.props}
                activeContent={activeContent}
                setActiveContent={setActiveContent}
            />
        );

        switch (activeContent) {
            case 'refilter':
                content = (
                    <XXCollectionRefilter
                        setActiveContent={setActiveContent}
                    />
                );
                break;
            case 'email':
                content = (
                    <XXCollectionShareEmail
                        setActiveContent={setActiveContent}
                    />
                );
                break;
            case 'share':
                content = (
                    <XXCollectionShareLink
                        setActiveContent={setActiveContent}
                    />
                );
                break;
            case 'delete':
                content = (
                    <XXCollectionDelete
                        setActiveContent={setActiveContent}
                    />
                );
                break;
        }

        return (
            <article className="xxCollection xxCollection--video">
                <div className="xxCollection-content">
                    {content}
                </div>

                <XXCollectionImages />

                {
                    activeContent === 'refilter-finished' ? (
                        <XXCollectionRefilterReady
                            setActiveContent={setActiveContent}
                        />
                    ) : null
                }

                {
                    isProcessingReady ? (
                        <XXCollectionProcessingReady
                            onClick={() => this.setState({ isProcessingReady: false })}
                        />
                    ) : null
                }
            </article>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
