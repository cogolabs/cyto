/* @flow */
/**
 * validCytoConfig.test.js
 * Written by: Connor Taylor
 */
import validCytoConfig from './validCytoConfig';
import mocks from './mocks';

describe('validCytoConfig', () => {
  it('throws if the config is not an object', () => {
    expect(() => validCytoConfig(mocks.NOT_OBJECT)).toThrow();
  });

  it('throws if any of the required keys are missing', () => {
    mocks.MISSING_KEYS.forEach((c) => {
      expect(() => validCytoConfig(c)).toThrow();
    });
  });

  it('throws if any of the required keys are not the right type', () => {
    mocks.INVALID_KEY_TYPES.forEach((c) => {
      expect(() => validCytoConfig(c)).toThrow();
    });
  });

  it('throws if any of the required keys are not the right type', () => {
    expect(() => validCytoConfig(mocks.INVALID_DEPENDENCY_LENGTH)).toThrow();
  });
});
