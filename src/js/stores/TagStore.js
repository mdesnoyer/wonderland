import alt from '../alt';
import TagActions from '../actions/TagActions';
import TagSource from '../sources/TagSource';

class TagStore {

    constructor() {
        this.tags = {};
        this.errorMessage = null;
        this.bindListeners({
            handleUpdateTags: TagActions.UPDATE_TAGS,
            handleFetchTags: TagActions.FETCH_TAGS,
            handleTagsFailed: TagActions.TAGS_FAILED
        });

        //this.exportPublicMethods({
        //    getTag: this.getTag
        //});

        // Problems with next line.
        //this.registerAsync(TagSource);
    }

    handleUpdateTags(response) {
        this.tags = response.items;
        this.errorMessage = null;
    }

    handleFetchTags() {
        this.tags = {};
    }

    handleTagsFailed(errorMessage) {
        this.errorMessage = errorMessage;
    }

    getTag(id) {
        return this.tags[id] || null;
    }
}

export default alt.createStore(TagStore, 'TagStore');
