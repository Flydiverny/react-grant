import * as React from 'react';
import { mount } from 'enzyme';
import { test } from '../src/withCan';

const A = () => <div>A</div>;
const AWithCan = test.withCan(A);

describe('withCan', () => {
  it('injects canDo property', () => {
    const wrapper = mount(<AWithCan />);

    expect(wrapper.find(AWithCan).exists()).toEqual(true);
    expect(wrapper.find(A).prop('canDo')).toBeDefined();
  });
});
