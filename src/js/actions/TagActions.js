import alt from '../alt';

import TagSource from '../sources/TagSource';

class TagActions {

    updateTags(tags) {
        this.dispatch(tags);
    }

    fetchTags() {
        return (dispatch) => {
            dispatch();
            TagSource.fetch()
            .then(tags => {
                this.updateTags(tags);
            })
            .catch(err => {
                this.tagsFailed(err);
            });
        };
    }

    tagsFailed(errorMessage) {
        this.dispatch(errorMessage);
    }
}

export default alt.createActions(TagActions);
