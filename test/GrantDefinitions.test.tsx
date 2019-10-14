import * as React from 'react';
import { mount } from 'enzyme';

import { GrantDefinitions, GrantContext } from '../src';

describe('<GrantDefinitions />', () => {
  // Monkey patch to prevent jsdom logging like mad so we can catch in tests..
  console.error = (msg: string) => {
    throw new Error(msg);
  };

  it('throws an error when checking for undefined grant, with definitions', () => {
    expect(() =>
      mount(
        <GrantDefinitions defined="show:a">
          <GrantContext.Consumer>
            {({ defined }) => defined('show-something')}
          </GrantContext.Consumer>
        </GrantDefinitions>
      )
    ).toThrow('Unknown action show-something');
  });

  it('throws an error when checking for undefined grant, without definitions', () => {
    expect(() =>
      mount(
        <GrantDefinitions>
          <GrantContext.Consumer>
            {({ defined }) => defined('show-something')}
          </GrantContext.Consumer>
        </GrantDefinitions>
      )
    ).toThrow('Unknown action show-something');
  });

  it('does not throw an error when checking for defined grant, with single definition', () => {
    expect(() =>
      mount(
        <GrantDefinitions defined="show-something">
          <GrantContext.Consumer>
            {({ defined }) => defined('show-something')}
          </GrantContext.Consumer>
        </GrantDefinitions>
      )
    ).not.toThrow();
  });

  it('does not throw an error when checking for defined grant, with multiple definitions', () => {
    expect(() =>
      mount(
        <GrantDefinitions defined="show-something show:my-alerts">
          <GrantContext.Consumer>
            {({ defined }) => defined('show:my-alerts')}
          </GrantContext.Consumer>
        </GrantDefinitions>
      )
    ).not.toThrow();
  });

  it('does not throw an error when checking for defined grant, with definitions as array', () => {
    expect(() =>
      mount(
        <GrantDefinitions defined={['show-something', 'show:my-alerts']}>
          <GrantContext.Consumer>
            {({ defined }) => defined('show:my-alerts')}
          </GrantContext.Consumer>
        </GrantDefinitions>
      )
    ).not.toThrow();
  });

  it('handles checking defined for multiple actions', () => {
    expect(() =>
      mount(
        <GrantDefinitions defined={['show-something', 'show:my-alerts']}>
          <GrantContext.Consumer>
            {({ defined }) => defined(['show-something', 'show:my-alerts'])}
          </GrantContext.Consumer>
        </GrantDefinitions>
      )
    ).not.toThrow();
  });

  it('handles failing when checking defined for multiple actions', () => {
    expect(() =>
      mount(
        <GrantDefinitions defined={['show-something', 'show:my-alerts']}>
          <GrantContext.Consumer>
            {({ defined }) =>
              defined('show-something show:my-alerts some:undefined-action')
            }
          </GrantContext.Consumer>
        </GrantDefinitions>
      )
    ).toThrow('Unknown action some:undefined-action');
  });

  it('throws an error when checking for undefined grant, with definitions as empty array', () => {
    expect(() =>
      mount(
        <GrantDefinitions defined={[]}>
          <GrantContext.Consumer>
            {({ defined }) => defined('show:my-alerts')}
          </GrantContext.Consumer>
        </GrantDefinitions>
      )
    ).toThrow('Unknown action show:my-alerts');
  });

  it('provide canDo to consumers', () => {
    expect(() =>
      mount(
        <GrantDefinitions defined={[]}>
          <GrantContext.Consumer>
            {({ canDo }) => canDo('show:my-alerts')}
          </GrantContext.Consumer>
        </GrantDefinitions>
      )
    ).not.toThrow();
  });
});
