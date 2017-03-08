/* eslint-disable no-undef */
import chai from 'chai';
import moxios from 'moxios';
import * as actions from '../js/actions';

const should = chai.should();

describe('actions', () => {
  it('should create an action to add a todo', () => {
    const text = 'Finish docs';
    const expectedAction = {
      type: types.ADD_TODO,
      text,
    };
    expect(actions.addTodo(text)).toEqual(expectedAction)
  });
});
