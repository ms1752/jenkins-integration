import 'core-js/es6/promise';
import Request from 'superagent';
import _ from 'lodash';

import {
  DEFAULT_REQUEST_TIMEOUT
} from '../constants/AppConstants';

export default {
  getTodoItems: function () {
    return this._getURL('http://localhost:80/api/todoItems').then(function (responseObj) {
      return responseObj.body;
    }, function (error) {
      throw error;
    });

  },
  _getURL: function (url) {
    return new Promise((resolve, reject) => {
      Request
        .get(url)
        .timeout(DEFAULT_REQUEST_TIMEOUT)
        .end(function (error, response) {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        });
    });
  }
};
