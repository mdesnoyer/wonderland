jest.unmock('../../../src/js/stores/CollectionStores');

import {
    TagStore,
    resetStores
} from '../../../src/js/stores/CollectionStores';

describe('Function resetStores', () => {
    it('Deletes the tag store contents', () => {
        TagStore.set({a: 'tag'});
        expect(TagStore.count()).toEqual(1);
        resetStores();
        expect(TagStore.count()).toEqual(0);
        expect(TagStore.get('a')).toEqual(undefined);
    });
});
