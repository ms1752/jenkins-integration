import { dispatchAsync } from '../dispatcher/AppDispatcher';
import WebAPI from '../util/WebAPI';

import {
  TODO_ITEMS_GET_REQUEST,
  TODO_ITEMS_GET_SUCCESS,
  TODO_ITEMS_GET_ERROR
} from '../constants/AppConstants';

export default {
  getTodoItems: function () {
    dispatchAsync(WebAPI.getTodoItems(), {
      request: TODO_ITEMS_GET_REQUEST,
      success: TODO_ITEMS_GET_SUCCESS,
      failure: TODO_ITEMS_GET_ERROR
    });
  }
};
