// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import React from 'react';
import AltContainer from 'alt-container';

import TagStore from '../stores/TagStore';
import TagActions from '../actions/TagActions';

import ImageCollection from '../components/ImageCollection';

const _stores = {
    tags: function(props) {
        return {
            store: TagStore,
            value: TagStore.getStore(props.key)
        };
    },
    /*
    video: (props) => {
        return props.videoId?
            {
                store: CollectionStore,
                value: CollectionStore.getVideo(props.videoId)
            }:
            null;
    },
    /**/
    /*
    thumbnails: (props) => {
        return {
            store: ThubmailStore,
            value: TagStore.getThumbnailsForTag(props.key)
        };
    }
    /**/
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const CollectionsContainer = React.createClass({

    getInitialState: function() {
        return TagStore.getState();
    },

    componentDidMount: function() {
        TagStore.listen(this.onChange);
        TagActions.fetchTags();
    },

    componentWillUnmount: function() {
        TagStore.unlisten(this.onChange);
    },
    onChange: function(state) {
        this.setState(state);
    },
    render: function() {
        if (this.state.errorMessage) {
            return (
              <div>{this.state.errorMessage}</div>
            );
        }

        if (!this.state.tags.length) {
            return (
                <div>
                    Wait!
                </div>
            )
        }

        return (
            <ul>
                {this.state.tags.map(function(tag) {
                    console.log(tag);
                    return (
                        <li>
                            <AltContainer
                                key={tag.tag_id}
                                stores={_stores}
                            >
                                <ImageCollection key={tag.tag_id}/>
                            </AltContainer>
                        </li>
                    );
                })}
            </ul>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default CollectionsContainer;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
