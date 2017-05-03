/* @flow */
/**
 * promptForArg.test.js
 * Written by: Connor Taylor
 */
import promptForArg from './promptForArg';
import inquirer from 'inquirer';
jest.mock('inquirer');

describe('promptForArg', () => {
  it('calls inquirer.prompt to get the argument', () => {
    const arg = { id: 'foo' };
    promptForArg(arg);

    expect(inquirer.prompt).toHaveBeenCalled();

    inquirer.prompt.mockClear();
  });

  it('uses the confirm prompt for boolean arguments', () => {
    const arg = { id: 'foo', type: 'boolean' };
    promptForArg(arg);

    expect(inquirer.prompt).toHaveBeenCalledWith([
      {
        default: undefined,
        message: 'foo: ',
        name: 'foo',
        type: 'confirm'
      }
    ]);
  });
});
