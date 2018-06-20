import React from 'react';
import { mount } from 'enzyme';
import { test } from '../canDo';
import { Grant } from '../';

const A = () => 'A';
const AWithCanDo = test.canDo('show:a')(A);

describe("canDo", () => {
  it('does not render child if access not available', () => {
    const wrapper = mount(
      <Grant accessTo="show:b">
        <AWithCanDo />
      </Grant>
    );

    expect(wrapper.find(AWithCanDo).exists()).toEqual(true);
    expect(wrapper.find(A).exists()).toEqual(false);
  });

  it('renders child if access available', () => {
    const wrapper = mount(
      <Grant accessTo="show:a">
        <AWithCanDo />
      </Grant>
    );

    expect(wrapper.find(A).exists()).toEqual(true);
  });
});
