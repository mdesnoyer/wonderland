// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// https://raw.githubusercontent.com/neon-lab/neon-codebase/working/imageservingplatform/neon_isp/scaledImage.cpp?token=ABUJFgg35GdImyaBQOA-4e-IKOg56-0Wks5XkVjXwA%3D%3D
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var RENDITIONS = {

    NO_RENDITION: -1,
    FUZZ: 6, // px

    // check if a & b approx equal i.e in the range of the fuzz
    // (tolerance) specified 
    fuzzyEqual: function(a, b, fuzz) {
        return (Math.abs(a - b) <= fuzz);
    },
    
    findRendition: function(thumbnails, width, height) {
        var i = 0;
        if (!thumbnails || thumbnails.length === 0 || width === 0 || height === 0 || thumbnails[0].renditions.length === 0) {
            return this.NO_RENDITION;
        }
        // We assume each thumbnail is the same so we only need to check the
        // first one
        for (let r of thumbnails[0].renditions) {
            if ((r.width === width) && (r.height === height)) {
                return i;
            }
            if (this.fuzzyEqual(r.width, width, this.FUZZ) && this.fuzzyEqual(r.height, height, this.FUZZ)) {
                return i;    
            }
            // Aspect Ratio check TODO - future ticket
            i++;
        }
        return this.NO_RENDITION;
    }
}

export default RENDITIONS;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -