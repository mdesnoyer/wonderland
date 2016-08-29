// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import {shallow} from 'enzyme';

jest.dontMock('../../src/js/components/core/LoadingText');
const LoadingText = require('../../src/js/components/core/LoadingText').default;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

describe('Component: LoadingText', function() {
        
    const minProps = {};

    it('Renders without exploding', () => {
        const wrapper = shallow(<LoadingText {...minProps} />);
        expect(
            wrapper.length
        ).toEqual(1);
    });

});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
