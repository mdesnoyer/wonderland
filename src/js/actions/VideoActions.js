import alt from '../alt';
import VideoSource from '../sources/VideoSource';

class VideoActions {

    updateVideos(videos) {
        return videos;
    }

    fetchVideos() {
        return (dispatch) => {
            dispatch();
            VideoSource.fetch()
            .then(fetched => {
                this.updateVideos(videos);

            })
            .catch(err => {
                this.videosFailed(err);
            });
        };
    }

    videosFailed(err) {
        return err;
    }
}

export default alt.createActions(VideoActions);
