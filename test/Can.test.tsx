import * as React from 'react';
import { mount } from 'enzyme';

import { Grant, Can, GrantContext } from '../src';

const A = () => <div>A</div>;

describe('<Can />', () => {
  it('does not render child if access not available', () => {
    const wrapper = mount(
      <Grant accessTo="show:a">
        <Can do="show:wtf">
          <A />
        </Can>
      </Grant>
    );

    expect(wrapper.find(A).exists()).toEqual(false);
  });

  it('renders child if access available', () => {
    const wrapper = mount(
      <Grant accessTo="show:a">
        <Can do="show:a">
          <A />
        </Can>
      </Grant>
    );

    expect(wrapper.find(A).exists()).toEqual(true);
  });

  it('renders child if access available when needing multiple access', () => {
    const wrapper = mount(
      <Grant accessTo="show:a show:b">
        <Can do="show:a show:b">
          <A />
        </Can>
      </Grant>
    );

    expect(wrapper.find(A).exists()).toEqual(true);
  });

  it('does not renders child if access not available when needing multiple access', () => {
    const wrapper = mount(
      <Grant accessTo="show:a show:b">
        <Can do="show:a show:c">
          <A />
        </Can>
      </Grant>
    );

    expect(wrapper.find(A).exists()).toEqual(false);
  });

  it('renders child if access available when needing multiple access using child function', () => {
    const wrapper = mount(
      <Grant accessTo="show:a show:b">
        <Can do="show:a show:b">{can => can && <A />}</Can>
      </Grant>
    );

    expect(wrapper.find(A).exists()).toEqual(true);
  });

  it('does not renders child if access not available when needing multiple access using child function', () => {
    const wrapper = mount(
      <Grant accessTo="show:a show:b">
        <Can do="show:a show:c">{can => can && <A />}</Can>
      </Grant>
    );

    expect(wrapper.find(A).exists()).toEqual(false);
  });

  it('checks if actions are defined', () => {
    const defined = jest.fn(() => false);

    mount(
      <GrantContext.Provider value={{ defined, canDo: () => false }}>
        <Can do="show:a show:c">
          <A />
        </Can>
      </GrantContext.Provider>
    );

    expect(defined).toHaveBeenCalledTimes(1);
    expect(defined).toBeCalledWith('show:a show:c');
  });
});
