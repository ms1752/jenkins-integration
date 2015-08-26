import WebAPI from '../WebAPI.js';
import { assert } from 'chai';

import todoItemsMockResponse from '../../../mocks/api/todoItems.json';

describe('WebAPI', () => {

  let getURLMock;

  beforeEach(() => {
    getURLMock = sinon.stub(WebAPI, '_getURL');
  });

  it('Should call getTodoItems successfully', function (done) {

    getURLMock.returns(new Promise((resolve, reject) => {
      resolve({body: todoItemsMockResponse});
    }));

    WebAPI.getTodoItems().then(function (response) {
      assert.deepEqual(response, todoItemsMockResponse, 'did not receive expected mock server response');
      done();
    }, function (error) {
      done(error);
    });
  });

  it('Should handle getTodoItems errors', function (done) {

    let errorMessage = 'Testing getTodoItems Error handling';
    getURLMock.returns(new Promise((resolve, reject) => {
      let error = new Error(errorMessage);
      reject(error);
    }));

    WebAPI.getTodoItems().then(function () {
      assert.fail(null, null, 'getToDoItems promise resolved even though an error was thrown');
    }, function (error) {
      assert.equal(error.message, errorMessage, 'Error not passed to reject function of promise');
      done();
    })
  });

  afterEach(() => {
    getURLMock.restore();
  })

});
