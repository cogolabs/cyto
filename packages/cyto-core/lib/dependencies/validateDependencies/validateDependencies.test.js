/* @flow */
/**
 * validateDependencies.test.js
 * Written by: Connor Taylor
 */
import mocks from './mocks';
import validateDependencies from './validateDependencies';

describe('validateDependencies', () => {
  const mockFn = jest.fn();
  console.error = jest.fn();
  process.exit = mockFn;

  afterEach(() => {
    mockFn.mockClear();
  });

  it('exits when a dependency has an invalid type', () => {
    expect(() => {
      validateDependencies(mocks.INVALID_TYPE1);
    }).toThrow();

    expect(() => {
      validateDependencies(mocks.INVALID_TYPE2);
    }).toThrow();

    expect(() => {
      validateDependencies(mocks.INVALID_TYPE3);
    }).toThrow();
  });

  it('exits when an object dependency has no templateId key', () => {
    expect(() => {
      validateDependencies(mocks.NO_TEMPLATEID)
    }).toThrow();
  });

  it('exits when an object dependency has no args key', () => {
    expect(() => {
      validateDependencies(mocks.NO_ARGS)
    }).toThrow();
  });

  it('exits when an object dependency has an args object with no id', () => {
    expect(() => {
      validateDependencies(mocks.NO_ARGS_ID)
    }).toThrow();
  });
});
