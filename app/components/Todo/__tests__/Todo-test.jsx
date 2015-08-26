import React from 'react';
import Todo from '../Todo';
import { assert } from 'chai';
import Immutable from 'immutable';

let { TestUtils } = React.addons;

describe('Todo', () => {

  let todoObject = {
    id: 1,
    description: 'Testing'
  };

  it('Should have the correct CSS class', () => {

    let todoMap = Immutable.Map(todoObject);

    let todo = TestUtils.renderIntoDocument(
      <Todo todoObj={todoMap} />
    );

    let todoElement = React.findDOMNode(todo);

    let expectedClassName = 'Todo';

    assert.equal(todoElement.className, expectedClassName, 'Class on root Todo element not as expected');
  });

  it('Should display the correct value', () => {

    let todoMap = Immutable.Map(todoObject);

    let todo = TestUtils.renderIntoDocument(
      <Todo todoObj={todoMap} />
    );

    let todoElement = React.findDOMNode(todo);

    assert.equal(todoElement.innerHTML, todoObject.description, 'Todo description not displayed within element as expected');
  });

  it('Should only call render if the prop changed', () => {

    let newTodoObject = {
      id: 1,
      description: 'Testing change'
    };

    let todoMap = Immutable.Map(todoObject);
    let todoMapSame = Immutable.Map(todoObject);
    let todoMapDifferent = Immutable.Map(newTodoObject);

    let todo = TestUtils.renderIntoDocument(
      <Todo todoObj={todoMap} />
    );

    let returnValue = todo.shouldComponentUpdate({todoObj: todoMapSame});

    assert.equal(returnValue, false, 'render method would be called even though todoObj did not change');

    returnValue = todo.shouldComponentUpdate({todoObj: todoMapDifferent});

    assert.equal(returnValue, true, 'render method would not be called even though todoObj changed');
  });

});

