jest.unmock('../../../src/js/modules/utils');

import UTILS from '../../../src/js/modules/utils';

describe('UTILS.sortThumbnails', () => {
    it('test sorting', () => {
        expect(UTILS.sortThumbnails({neon_score: 12}, {neon_score: 34})).toBe(22);
        expect(UTILS.sortThumbnails({neon_score: 99}, {neon_score: 1})).toBe(-98);
        expect(UTILS.sortThumbnails({neon_score: 55}, {neon_score: 55})).toBe(0);
        expect(UTILS.sortThumbnails({neon_score: 'e'}, {neon_score: 'h'})).toBeFalsy();
    });
});
