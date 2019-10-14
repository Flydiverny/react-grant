import * as React from 'react';
import { mount } from 'enzyme';

import { Grant, GrantContext } from '../src';

const A = () => <div>A</div>;

describe('<Grant />', () => {
  it('provides access', () => {
    expect.assertions(3);

    mount(
      <GrantContext.Provider
        value={{ canDo: () => false, defined: () => true }}
      >
        <Grant accessTo="show:a show:c">
          <GrantContext.Consumer>
            {({ canDo }) => {
              expect(canDo('show:a')).toEqual(true);
              expect(canDo('show:b')).toEqual(false);
              expect(canDo('show:c')).toEqual(true);
              return <div></div>;
            }}
          </GrantContext.Consumer>
        </Grant>
      </GrantContext.Provider>
    );
  });

  it('checks if actions are defined', () => {
    const defined = jest.fn(() => false);

    mount(
      <GrantContext.Provider value={{ defined, canDo: () => false }}>
        <Grant accessTo="show:a show:c">
          <A />
        </Grant>
      </GrantContext.Provider>
    );

    expect(defined).toHaveBeenCalledTimes(1);
    expect(defined).toBeCalledWith('show:a show:c');
  });

  it('extends defined grants when nested', () => {
    expect.assertions(6);

    const mock = jest.fn(() => false);

    mount(
      <GrantContext.Provider value={{ canDo: mock, defined: () => true }}>
        <Grant accessTo="show:a show:c">
          <Grant accessTo="show:d">
            <GrantContext.Consumer>
              {({ canDo }) => {
                expect(canDo('show:a')).toEqual(true);
                expect(canDo('show:c')).toEqual(true);
                expect(canDo('show:b')).toEqual(false);
                expect(canDo('show:d')).toEqual(true);
                return <div></div>;
              }}
            </GrantContext.Consumer>
          </Grant>
        </Grant>
      </GrantContext.Provider>
    );

    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toBeCalledWith('show:b');
  });

  it('only grants access in nested scope', () => {
    expect.assertions(2);

    mount(
      <GrantContext.Provider
        value={{ canDo: () => false, defined: () => true }}
      >
        <Grant accessTo="show:a show:c">
          <GrantContext.Consumer>
            {({ canDo }) => {
              expect(canDo('show:d')).toEqual(false);
              return <div></div>;
            }}
          </GrantContext.Consumer>

          <Grant accessTo="show:d">
            <GrantContext.Consumer>
              {({ canDo }) => {
                expect(canDo('show:d')).toEqual(true);
                return <div></div>;
              }}
            </GrantContext.Consumer>
          </Grant>
        </Grant>
      </GrantContext.Provider>
    );
  });

  it('only grants access in its own scope', () => {
    expect.assertions(6);

    mount(
      <GrantContext.Provider
        value={{ canDo: () => false, defined: () => true }}
      >
        <Grant accessTo="show:a show:c">
          <GrantContext.Consumer>
            {({ canDo }) => {
              expect(canDo('show:a')).toEqual(true);
              expect(canDo('show:b')).toEqual(false);
              expect(canDo('show:c')).toEqual(true);
              return <div></div>;
            }}
          </GrantContext.Consumer>
        </Grant>

        <Grant accessTo="show:b">
          <GrantContext.Consumer>
            {({ canDo }) => {
              expect(canDo('show:a')).toEqual(false);
              expect(canDo('show:b')).toEqual(true);
              expect(canDo('show:c')).toEqual(false);
              return <div></div>;
            }}
          </GrantContext.Consumer>
        </Grant>
      </GrantContext.Provider>
    );
  });
});
