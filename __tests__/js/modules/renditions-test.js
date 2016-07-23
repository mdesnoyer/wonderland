jest.unmock('../../../src/js/modules/renditions');

import RENDITIONS from '../../../src/js/modules/renditions';

describe('RENDITIONS.findRendition', () => {
    const thumb = {
        url: 'base_url',
        renditions: [[350, 350], [100, 100], [600, 600], 
                     [160, 90], [640, 360], [1920, 1080],
                     [1280, 720], [960, 540], [640, 480]].map(function(sz) {
            return { height : sz[1], width : sz[0], url : sz[0] + 'x' + sz[1] }
        })
    };

    it('exact size match', () => {
        expect(RENDITIONS.findRendition(thumb, 350, 350)).toBe('350x350');
        expect(RENDITIONS.findRendition(thumb, 160, 90)).toBe('160x90');
        expect(RENDITIONS.findRendition(thumb, 1280, 720)).toBe('1280x720');
    });

    it('error cases', () => {
        expect(RENDITIONS.findRendition(null, 350, 350)).toBe(null);
        expect(RENDITIONS.findRendition(thumb, 350, 0)).toBe('base_url');
        expect(RENDITIONS.findRendition(thumb, 0, 350)).toBe('base_url');
    });

    it('no good match', () => {
        expect(RENDITIONS.findRendition(thumb, 350, 700)).toBe('base_url');
        expect(RENDITIONS.findRendition(thumb, 90, 160)).toBe('base_url');
        expect(RENDITIONS.findRendition(thumb, 200, 90)).toBe('base_url');
    });

    it('close size match', () => {
        expect(RENDITIONS.findRendition(thumb, 1280, 715)).toBe('1280x720');
        expect(RENDITIONS.findRendition(thumb, 1280, 725)).toBe('1280x720');
        expect(RENDITIONS.findRendition(thumb, 1275, 720)).toBe('1280x720');
        expect(RENDITIONS.findRendition(thumb, 1285, 720)).toBe('1280x720');
        expect(RENDITIONS.findRendition(thumb, 1285, 725)).toBe('1280x720');
    });

    it('aspect ratio match', () => {
        expect(RENDITIONS.findRendition(thumb, 400, 400)).toBe('600x600');
        expect(RENDITIONS.findRendition(thumb, 700, 700)).toBe('600x600');
        expect(RENDITIONS.findRendition(thumb, 10, 10)).toBe('100x100');
        expect(RENDITIONS.findRendition(thumb, 888, 500)).toBe('960x540');
        expect(RENDITIONS.findRendition(thumb, 666, 500)).toBe('640x480');
    });
});