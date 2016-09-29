// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import {shallow} from 'enzyme';

jest.dontMock('../../src/js/components/knave/Timeline');

const Timeline = require('../../src/js/components/knave/Timeline').default;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

describe('Component: Timeline', function() {
        
    const minProps = {
        snapshots: {},
        showNeonScore: true,
        pageTitle: 'Test',
        isPolling: false
    };

    it('Renders without exploding', () => {
        const wrapper = shallow(<Timeline {...minProps} />);
        expect(
            wrapper.length
        ).toEqual(1);
    });

});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
