// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import {shallow} from 'enzyme';

jest.dontMock('../../src/js/components/wonderland/HomeImages');
const HomeImages = require('../../src/js/components/wonderland/HomeImages').default;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

describe('Component: HomeImages', function() {
        
    const minProps = {};

    it('Renders without exploding', () => {
        const wrapper = shallow(<HomeImages {...minProps} />);
        expect(
            wrapper.length
        ).toEqual(1);
    });

    it('Contains 9 images', () => {
        const wrapper = shallow(<HomeImages {...minProps} />);
        expect(
            wrapper.find('img').length
        ).toEqual(9);
    });

});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
