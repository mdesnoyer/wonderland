jest.unmock('../../../src/js/stores/CollectionStores');
jest.unmock('../../../src/js/mixins/Ajax')

import AJAXModule from '../../../src/js/modules/ajax';
import {
    TagStore,
    ThumbnailStore,
    LoadActions,
    Search,
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

    it('Deletes the thumbnail store contents', () => {
        ThumbnailStore.set(0, 0, {
            a: {thumbnail_id: 'a'},
            b: {thumbnail_id: 'b'},
        });
        ThumbnailStore.set(1, 0, {
            a: {thumbnail_id: 'a'},
            b: {thumbnail_id: 'b'},
        });
        resetStores();
        expect(ThumbnailStore.get(0, 0, 'a')).toEqual(undefined);
        expect(ThumbnailStore.get(0, 0, 'b')).toEqual(undefined);
        expect(ThumbnailStore.get(1, 0, 'a')).toEqual(undefined);
        expect(ThumbnailStore.get(1, 0, 'b')).toEqual(undefined);
    });

    it('Cancels a pending ajax request', () => {

        // Mock the doGet nested inside load.
        const cancel = jest.fn();
        AJAXModule.doGet = jest.fn(() => {
            return {
                promise: new Promise(() => setTimeout(5000)),
                cancel,
            }
        });
        Search.load(10);
        expect(Search.pending).toEqual(1);
        expect(LoadActions.apiCalls.length).toEqual(1);
        resetStores();
        expect(Search.pending).toEqual(0);
        // There are 3 doGets in a load.
        expect(cancel.mock.calls.length).toBe(3);
    });
});
