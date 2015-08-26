import _BaseStore from './_BaseStore';
import { register } from '../dispatcher/AppDispatcher';

import {
  TODO_ITEMS_UPDATED,
  TODO_ITEMS_GET_SUCCESS
} from '../constants/AppConstants';

class TodoStore extends _BaseStore {

  constructor (...args) {
    super (...args);
    this.set('todoItems', []);
  }

  _emitChange () {
    this.emit(TODO_ITEMS_UPDATED);
  }

  addChangeListener (callback) {
    this.on(TODO_ITEMS_UPDATED, callback);
  }

  removeChangeListener (callback) {
    this.removeListener(TODO_ITEMS_UPDATED, callback);
  }

  getItems () {
    return this.get('todoItems');
  }

  _setItems (items) {
    this.set('todoItems', items);
    this._emitChange();
  }
}

let store = new TodoStore();

register((action) => {
  switch (action.type) {
    case TODO_ITEMS_GET_SUCCESS:
      store._setItems(action.action.response);
      break;
    default:
  }
});

export default store;
