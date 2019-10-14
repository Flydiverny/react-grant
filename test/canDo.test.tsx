import * as React from 'react';
import { mount } from 'enzyme';
import { test } from '../src/canDo';
import { Grant } from '../src';

const A = () => <div>A</div>;
const AWithCanDo = test.canDo('show:a')(A);
const AWithMultiCanDo = test.canDo('show:a show:b')(A);

describe('canDo', () => {
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

  it('renders child if access available when needing multiple access', () => {
    const wrapper = mount(
      <Grant accessTo="show:a show:b">
        <AWithMultiCanDo />
      </Grant>
    );

    expect(wrapper.find(A).exists()).toEqual(true);
  });

  it('does not renders child if access not available when needing multiple access', () => {
    const wrapper = mount(
      <Grant accessTo="show:a show:c">
        <AWithMultiCanDo />
      </Grant>
    );

    expect(wrapper.find(A).exists()).toEqual(false);
  });
});
