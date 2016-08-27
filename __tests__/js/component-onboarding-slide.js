// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import {shallow} from 'enzyme';

jest.dontMock('../../src/js/components/wonderland/OnboardingSlide');
const OnboardingSlide = require('../../src/js/components/wonderland/OnboardingSlide').default;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

describe('Component: OnboardingSlide', function() {

    const minProps = {
        active: false,
        slide: {
            id: 'test-slide',
            title: 'test title',
            subtitle: 'test subtitle',
            includeLearnMore: false,
            image: ''
        }
    };

    it('Renders without exploding', () => {
        const wrapper = shallow(<OnboardingSlide {...minProps} />);
        expect(
            wrapper.length
        ).toEqual(1);
    });

    it('Additional classname on active', () => {
        const wrapper = shallow(<OnboardingSlide {...minProps} active={true} />);
        expect(
            wrapper.node.props.className
        ).toEqual('xxOnboardingSlide xxOnboardingSlide--test-slide is-active');
    });

});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
