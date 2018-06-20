import React from 'react';
import { mount } from 'enzyme';

import { GrantDefinitions, Grant, Can } from '../';

const A = () => 'A';
const B = () => 'B';

const Demo = () => (
  <div>
    <Can do="show:a"><A /></Can>
    <Can do="show:b"><B /></Can>
  </div>
);

describe('<Grant />', () => {
  it('provides access', () => {
    const wrapper = mount(
      <Grant accessTo="show:a show:c">
        <Demo />
      </Grant>
    );

    expect(wrapper.find(A).exists()).toEqual(true);
    expect(wrapper.find(B).exists()).toEqual(false);
  });

  it('shows a in first, and b in second', () => {
    const wrapper = mount(
      <div>
        <Grant accessTo="show:a">
          <Demo />
        </Grant>

        <Grant accessTo="show:b">
          <Demo />
        </Grant>
      </div>
    );

    expect(wrapper.find(Grant)).toHaveLength(2);
    expect(wrapper.find(Grant).at(0).find(A).exists()).toEqual(true);
    expect(wrapper.find(Grant).at(0).find(B).exists()).toEqual(false);
    expect(wrapper.find(Grant).at(1).find(A).exists()).toEqual(false);
    expect(wrapper.find(Grant).at(1).find(B).exists()).toEqual(true);
  });

  it('Grant throws if actions is not defined', () => {
    expect(() => mount(
      <GrantDefinitions defined="show:a">
        <Grant accessTo="show:a show:wtf">
          <A />
        </Grant>
      </GrantDefinitions>
    )).toThrow('Unknown action show:wtf');
  });

  it('Grant does not throw if actions are defined', () => {
    expect(() => mount(
      <GrantDefinitions defined="show:a show:b show:c">
        <Grant accessTo="show:a show:c">
          <A />
        </Grant>
      </GrantDefinitions>
    )).not.toThrow()
  });
});
