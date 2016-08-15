import AjaxMixin from '../mixins/Ajax'

var VideoSource = Object.assign({}, AjaxMixin, {
    search: function() {
        return this.GET('videos/search');
    },
    fetch: function(videoIds) {
        return this.GET('videos', {_data:{video_id: videoIds}});
    }
});

export default VideoSource;
