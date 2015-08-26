import React from 'react';
import TodoList from '../TodoList';
import { assert } from 'chai';
import Immutable from 'immutable';

let { TestUtils } = React.addons;

describe('TodoList', () => {

  let todoItems = [
    {
      id: 1,
      description: 'Testing 1'
    }, {
      id: 2,
      description: 'Testing 2'
    }
  ];

  it('Should have the correct CSS class', () => {

    let itemsList = Immutable.fromJS(todoItems);

    let todoList = TestUtils.renderIntoDocument(
      <TodoList todoItems={itemsList} />
    );

    let todoElement = React.findDOMNode(todoList);

    let expectedClassName = 'TodoList';

    assert.equal(todoElement.className, expectedClassName, 'Class on root TodoList element not as expected');
  });

  it('Should display the correct number of Todo elements', () => {

    let itemsList = Immutable.fromJS(todoItems);

    let todoList = TestUtils.renderIntoDocument(
      <TodoList todoItems={itemsList} />
    );

    let todoElements = TestUtils.scryRenderedDOMComponentsWithClass(todoList, 'Todo');

    assert.equal(todoElements.length, todoItems.length, 'The number of rendered Todo items does not match the provided array length');
  });

  it('Should only call render if the props changed', () => {
    let newTodoItems = [
      {
        id: 1,
        description: 'Testing render 1'
      }, {
        id: 2,
        description: 'Testing render 2'
      }
    ];

    let itemsList = Immutable.fromJS(todoItems);
    let todoListSame = Immutable.fromJS(todoItems);
    let todoListDifferent = Immutable.fromJS(newTodoItems);

    let todoList = TestUtils.renderIntoDocument(
      <TodoList todoItems={itemsList} />
    );

    let returnValue = todoList.shouldComponentUpdate({todoItems: todoListSame});

    assert.equal(returnValue, false, 'render method would be called even though todoObj did not change');

    returnValue = todoList.shouldComponentUpdate({todoItems: todoListDifferent});

    assert.equal(returnValue, true, 'render method would not be called even though todoObj changed');
  });

});
