import alt from '../alt';
import VideoActions from '../actions/VideoActions';

class VideoStore {

    constructor() {
        this.videos = [];
        this.errorMessage = null;
        this.bindListeners({
            handleUpdateVideos: VideoActions.UPDATE_VIDEOS,
            handleFetchVideos: VideoActions.FETCH_VIDEOS,
            handleVideosFailed: VideoActions.VIDEOS_FAILED
        });
        this.registerAsync(VideoSource);
    }

    handleUpdateVideos(response) {
        this.videos = response.videos;
    }

    handleFetchVideos() {
        this.videos = [];
    }

    handleVideosFailed(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

export default alt.createStore(VideoStore, 'VideoStore');
