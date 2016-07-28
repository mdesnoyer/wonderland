jest.unmock('../../../src/js/modules/utils');

// This module being mocked breaks Jest, so use the real thing
jest.unmock('fnv-plus');

import UTILS from '../../../src/js/modules/utils';

describe('UTILS.makePercentage', () => {
    it('make percentage rounding', () => {
        expect(UTILS.makePercentage(0.002, 0, true)).toBe('0%');
        expect(UTILS.makePercentage(-0.002, 0, true)).toBe('0%');
        expect(UTILS.makePercentage(-0.002, 1, true)).toBe('-0.2%');
        expect(UTILS.makePercentage(-0.0002, 1, true)).toBe('0.0%');
        expect(UTILS.makePercentage(-0.0007, 1, true)).toBe('-0.1%');
        expect(UTILS.makePercentage(-0.007, 0, true)).toBe('-1%');
        expect(UTILS.makePercentage(0.007, 0, true)).toBe('1%');
        expect(UTILS.makePercentage(0.0564, 1, false)).toBe('5.6');
    });
});