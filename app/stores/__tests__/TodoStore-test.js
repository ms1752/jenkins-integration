import TodoStore from '../TodoStore.js';
import { assert } from 'chai';
import Immutable from 'immutable';

describe('TodoStore', () => {

  let todoItems = [
    {
      id: 1,
      description: 'Testing 1'
    }, {
      id: 2,
      description: 'Testing 2'
    }
  ];

  let changeHandler;

  beforeEach(() => {
    //create a new spy before each test
    changeHandler = sinon.spy();
    TodoStore.addChangeListener(changeHandler);
  });

  it('Should initialize successfully', function () {
    assert.deepEqual(TodoStore.getItems(), Immutable.List([]), 'store not correctly initialized with blank List');
  });

  it('Should get and set new TodoItems', function () {

    TodoStore._setItems(todoItems);
    assert.deepEqual(TodoStore.getItems(), Immutable.fromJS(todoItems), 'store did not correctly set or get todo items');
  });

  it('Should call change listener when todo items are set', function () {
    TodoStore._setItems(todoItems);
    assert.equal(changeHandler.callCount, 1, 'change handler not called correct number of times');
  });

  it('Should remove the change listener', function () {
    TodoStore.removeChangeListener(changeHandler);
    TodoStore._setItems(todoItems);
    assert.equal(changeHandler.callCount, 0, 'change handler called after being removed as listener');
  });

  afterEach(() => {
    //reset TodoStore after each test
    TodoStore._setItems([]);
    TodoStore.removeChangeListener(changeHandler);
  });

});
