// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

import XXCollectionInfo from './Info';
import XXCollectionImages from './Images';

import XXCollectionRefilter from './Refilter';
import XXCollectionShareEmail from './ShareEmail';
import XXCollectionShareLink from './ShareLink';
import XXCollectionDelete from './Delete';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class XXCollection extends React.Component {
    constructor(props) {
        super(props);

        this.setActiveContent = this.setActiveContent.bind(this);

        this.state = {
            activeContent: null,
        };
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
        const { activeContent } = this.state;

        let content = (
            <XXCollectionInfo
                {...this.props}
                activeContent={activeContent}
                setActiveContent={this.setActiveContent}
            />
        );

        switch (activeContent) {
            case 'refilter':
                content = (
                    <XXCollectionRefilter
                        setActiveContent={this.setActiveContent}
                    />
                );
                break;
            case 'email':
                content = (
                    <XXCollectionShareEmail
                        setActiveContent={this.setActiveContent}
                    />
                );
                break;
            case 'share':
                content = (
                    <XXCollectionShareLink
                        setActiveContent={this.setActiveContent}
                    />
                );
                break;
            case 'delete':
                content = (
                    <XXCollectionDelete
                        setActiveContent={this.setActiveContent}
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
            </article>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
