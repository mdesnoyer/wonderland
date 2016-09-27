jest.unmock('../../../src/js/stores/CollectionStores');
jest.unmock('../../../src/js/mixins/Ajax')

import AJAXModule from '../../../src/js/modules/ajax';
import {
    tagStore,
    thumbnailStore,
    Store,
    cancelActions,
    LoadActions,
    Search,
    Store
} from '../../../src/js/stores/CollectionStores';

describe('Function Store.resetStores', () => {
    it('Deletes the tag store contents', () => {
        tagStore.set({a: 'tag'});
        expect(tagStore.count()).toEqual(1);
        Store.resetStores();
        expect(tagStore.count()).toEqual(0);
        expect(tagStore.get('a')).toEqual(undefined);
    });

    it('Deletes the thumbnail store contents', () => {
        thumbnailStore.set(0, 0, {
            a: {thumbnail_id: 'a'},
            b: {thumbnail_id: 'b'},
        });
        thumbnailStore.set(1, 0, {
            a: {thumbnail_id: 'a'},
            b: {thumbnail_id: 'b'},
        });
        Store.resetStores();
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
        cancelActions();
        expect(Search.pending).toEqual(0);
        // There are 3 doGets in a load.
        expect(cancel.mock.calls.length).toBe(3);
    });
});
