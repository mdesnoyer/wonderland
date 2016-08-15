import AjaxMixin from '../mixins/Ajax'
import TagActions from '../actions/TagActions';

const TagSource = Object.assign({}, AjaxMixin, {

    /*
    fetchTags: {
        remote() {
            return this.GET('tags/search');
        },
        local() {
            return null;
        },
        success: TagActions.updateTags,
        error: TagActions.tagsFailed,
        loading: TagActions.fetchTags
    }
    /**/
    //fetch: function(tagIds) {
    //    return this.GET('tags', {data: {tag_ids: tagIds}});
    //}
    fetch: function() {
        return this.GET('tags/search');
    }
});

export default TagSource;
