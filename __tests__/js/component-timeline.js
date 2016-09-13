// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import {shallow} from 'enzyme';

jest.dontMock('../../src/js/components/knave/Timeline');

// This module being mocked breaks Jest, so use the real thing
jest.unmock('fnv-plus');

const Timeline = require('../../src/js/components/knave/Timeline').default;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

describe('Component: Timeline', function() {
        
    const minProps = {
            stores: {
                videos: {}
            },
            feed: ''
        }
    ;

    it('Renders without exploding', () => {
        const wrapper = shallow(<Timeline {...minProps} />);
        expect(
            wrapper.length
        ).toEqual(1);
    });

});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
