import React from 'react';
import HomePage from '../HomePage';
import { assert } from 'chai';
import Immutable from 'immutable';

let { TestUtils } = React.addons;

//we must import modules that have functions we want to stub out for testing this module/component
import TodoStore from '../../../stores/TodoStore';
import AppActions from '../../../actions/AppActions';
import Utils from '../../../util/Utils';

describe('HomePage', () => {

  let appActionsGetTodoItems, todoStoreAddChangeListener, todoStoreRemoveChangeListener, todoStoreGetItems, utilsNavigateToPage;

  beforeEach(() => {
    appActionsGetTodoItems = sinon.stub(AppActions, 'getTodoItems');
    todoStoreAddChangeListener = sinon.stub(TodoStore, 'addChangeListener');
    todoStoreRemoveChangeListener = sinon.stub(TodoStore, 'removeChangeListener');
    todoStoreGetItems = sinon.stub(TodoStore, 'getItems').returns(Immutable.List([]));
    utilsNavigateToPage = sinon.spy(Utils, 'navigateToPage');
  });

  it('Should initialize correctly', () => {

    let expectedState = {
      todoItems: Immutable.List([])
    };

    let homePage = TestUtils.renderIntoDocument(
      <HomePage />
    );

    assert.deepEqual(homePage.state, expectedState, 'initial state not set as expected');
    assert.equal(todoStoreAddChangeListener.callCount, 1, 'TodoStore.addChangeListener not called as expected');
    assert.equal(appActionsGetTodoItems.callCount, 1, 'AppActions.getTodoItems not called as expected');

  });

  it('Should handle a todo store change', () => {

    let todoArray = [
      {
        id: 1,
        description: 'Testing 1'
      }, {
        id: 2,
        description: 'Testing 2'
      }
    ];

    let todoList = Immutable.fromJS(todoArray);

    let homePage = TestUtils.renderIntoDocument(
      <HomePage />
    );

    todoStoreGetItems.returns(todoList);

    homePage._handleTodoStoreChange();

    let expectedState = {
      todoItems: todoList
    };

    assert.deepEqual(homePage.state, expectedState, 'handle todo store change not updating state as expected');
  });

  it('Should cleanup listeners on unmount', () => {
    let homePage = TestUtils.renderIntoDocument(
      <HomePage />
    );

    let homePageNode = React.findDOMNode(homePage);

    React.unmountComponentAtNode(homePageNode.parentNode);

    assert.equal(todoStoreRemoveChangeListener.callCount, 1, 'todo store change listener not removed on component unmount');
  });

  it('Should navigate to about page on button click', () => {

    let homePage = TestUtils.renderIntoDocument(
      <HomePage />
    );

    let buttonElement = TestUtils.scryRenderedDOMComponentsWithClass(homePage, 'HomePage-button')[0];

    TestUtils.Simulate.click(buttonElement);

    assert.equal(utilsNavigateToPage.callCount, 1, 'navigateToPage function not called as expected');
    assert(utilsNavigateToPage.calledWithExactly('/about'), 'navigateToPage function not called with expected value');
  });

  afterEach(() => {
    appActionsGetTodoItems.restore();
    todoStoreAddChangeListener.restore();
    todoStoreRemoveChangeListener.restore();
    todoStoreGetItems.restore();
    utilsNavigateToPage.restore();
  });

});

