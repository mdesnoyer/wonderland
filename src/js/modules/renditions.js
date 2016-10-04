const _ = require('lodash');

const RENDITIONS = {
    FUZZ: 6, // px

    // check if a & b approx equal i.e in the range of the fuzz
    // (tolerance) specified
    fuzzyEqual: function(a, b, fuzz) {
        return (Math.abs(a - b) <= fuzz);
    },
    equal: function(w1, h1, w2, h2) {
        return ((w1 === w2) && (h1 === h2));
    },
    aspectRatioEquals: function(w1, h1, w2, h2) {
        if (h1 === 0 || h2 === 0) {
            return false;
        } else if (Math.abs(w1*h2 - h1*w2) < (h2*3)) {
            return true;
        } else {
            return false;
        }
    },
    findRendition: function(thumbnail, width = 350, height = 350) {
        // Returns the url for the image to put in a requested size
        //
        // Inputs:
        // thumbnail - The thumbnail object from the backend
        // width - Requested width
        // height - Requested height
        //
        // Outputs:
        // url to display the thumbnail
        var i = 0;
        if (!thumbnail) {
            return null;
        } else if (width === 0 || height === 0 ||
                   thumbnail.renditions.length === 0) {
            return thumbnail.url;
        }
        var near_match = null;
        var aspect_ratio_match = null;
        var best_diff = Number.MIN_SAFE_INTEGER;


        for (let r of thumbnail.renditions) {
            // Look for the exact match
            if (this.equal(r.width, r.height, width, height)) {
                return r.url;
            }
            // Look for the match where the size is almost equals
            if (this.fuzzyEqual(r.width, width, this.FUZZ) &&
                this.fuzzyEqual(r.height, height, this.FUZZ)) {
                near_match = r.url
            }
            // Look for the same aspect ratio, taking the image that
            // is bigger and closest in size.
            if (this.aspectRatioEquals(r.width, r.height, width, height)) {
                var diff = r.width - width;
                if (best_diff > 0) {
                    if (diff > 0 && diff < best_diff) {
                        best_diff = diff;
                        aspect_ratio_match = r.url;
                    }
                } else if (diff > best_diff) {
                    best_diff = diff;
                    aspect_ratio_match = r.url;
                }
            }
        }
        return near_match || aspect_ratio_match || thumbnail.url;
    },

    // Given renditions of a clip or thumb, get the largest's url.
    // Large here is just the number of pixels in the rendition.
    // With optional fileType, only get a url if its file extension
    // is fileType.
    //
    // -input renditions array of object { url, width, height }
    // -input fileType string - constrain to urls that end with this
    //   e.g., 'gif'
    // -output string or null
    findLargestRenditionUrl(renditions, fileType = null) {
        const r = _(renditions)
            .filter(r => !fileType || _.endsWith(r.url, fileType))
            .maxBy(r => r.width * r.height);
        return r ? r.url : null;
    },


    // Given renditions of a clip or thumb, get the smallest's url.
    // Size here is just the number of pixels in the rendition.
    // With optional fileType, only get a url if its file extension
    // is fileType.
    //
    // -input renditions array of object { url, width, height }
    // -input fileType string - constrain to urls that end with this
    //   e.g., 'gif'
    // -output string or null
    findSmallestRenditionUrl(renditions, fileType = null) {
        const r = _(renditions)
            .filter(r => !fileType || _.endsWith(r.url, fileType))
            .minBy(r => r.width * r.height);
        return r ? r.url : null;
    }
}

export default RENDITIONS;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
