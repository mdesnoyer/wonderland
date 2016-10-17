// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import { shallow, mount, render } from 'enzyme';

const TestyMcTestComponent = require('../../src/js/components/TestyMcTestComponent').default;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

describe('Component: TestyMcTestComponent', function() {

    const testTitle = 'Testy McTestComponent Title',
        testBody = 'Testy McTestComponent Body',
        minProps = {
            title: testTitle,
            body: testBody
        }
    ;

    it('Renders without exploding', () => {
        const wrapper = shallow(<TestyMcTestComponent {...minProps} />);
        expect(
            wrapper.length
        ).toEqual(1);
    });

    it('Contains 2 x .tmtc-content', () => {
        const wrapper = shallow(<TestyMcTestComponent {...minProps} />);
        expect(
            wrapper.find('.tmtc-content').length
        ).toEqual(2);
    });

    it('Is .tmtc', () => {
        const wrapper = shallow(<TestyMcTestComponent {...minProps} />);
        expect(
            wrapper.is('.tmtc')
        ).toBe(true);
    });

    it('Prop Check 1', () => {
        const wrapper = mount(<TestyMcTestComponent {...minProps} />);
        expect(
            wrapper.prop('title')
        ).toEqual(testTitle);
    });

    it('Prop Check 2', () => {
        const wrapper = shallow(<TestyMcTestComponent {...minProps} />);
        expect(
            wrapper.prop('body')
        ).not.toEqual(testTitle);
    });

});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
