import AjaxMixin from '../mixins/Ajax'
import UTILS from '../modules/utils'

var _format = keys => {
    return UTILS.csvFromArray(keys, UTILS.MAX_CSV_VALUE_COUNT);
};

var ThumbnailSource = Object.assign({}, AjaxMixin, {
    fetch: function(keys) {
        const batchedKeys = _format(keys);
        if (batchedKeys.length > 1) {
            return {}; // TODO
        }
        return this.GET('thumbnails', {_data: { thumbnail_id: batchedKeys[0]}});
    }
});

export default ThumbnailSource;
