import alt from '../alt';
import ThumbnailSource from '../sources/ThumbnailSource';

class ThumbnailActions {

    updateThumbnails(thumbnails) {
        return thumbnails;
    }

    fetchThumbnails() {
        return (dispatch) => {
            dispatch();
            ThumbnailSource.fetch()
            .then(fetched => {
                this.updateThumbnails(fetched);

            })
            .catch(err => {
                this.thumbnailsFailed(err);
            });
        };
    }

    thumbnailsFailed(err) {
        return err;
    }
}

export default alt.createActions(ThumbnailActions);
