import alt from '../alt';
import ThumbnailActions from '../actions/ThumbnailActions';

class ThumbnailStore {

    constructor() {
        this.thumbnails = [];
        this.errorMessage = null;
        this.bindListeners({
            handleUpdateThumbnails: ThumbnailActions.UPDATE_THUMBNAILS,
            handleFetchThumbnails: ThumbnailActions.FETCH_THUMBNAILS,
            handleThumbnailsFailed: ThumbnailActions.THUMBNAILS_FAILED
        });
        this.registerAsync(ThumbnailSource);
    }
    handleUpdateThumbnails(response) {
        this.thumbnails = response.thumbnails;
    }

    handleFetchThumbnails() {
        this.thumbnails = [];
    }

    handleThumbnailsFailed(errorMessage) {
        this.errorMessage = errorMessage;
    }

    getThumbnailsForTag(tagId) {
        return this.thumbnails.slice(0, 6);
    }
}

export default alt.createStore(ThumbnailStore, 'ThumbnailStore');
