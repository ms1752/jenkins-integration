import _BaseStore from '../_BaseStore.js';
import { assert } from 'chai';
import { Map, List } from 'immutable';

describe('_BaseStore', () => {

  it('Should initialize successfully', function () {
    let store = new _BaseStore();

    assert.deepEqual(store.data, Map({}), 'store not correctly initialize with blank Map');
  });

  it('Should set, get and remove value', function () {

    let testKey = 'test';

    let store = new _BaseStore();

    assert.isUndefined(store.get(testKey), 'value returned for an undefined key');

    let item = 'testString';

    store.set(testKey, item);
    assert.deepEqual(store.get(testKey), item, 'value not set or returned correctly');

    store.remove(testKey);
    assert.isUndefined(store.get(testKey), 'value not removed from store');
  });

  it('Should set, get and remove objects', function () {

    let testKey = 'testObj';

    let store = new _BaseStore();

    let item = {
      test: 'value'
    };

    store.set(testKey, item);
    assert.deepEqual(store.get(testKey), Map(item), 'object not set or returned correctly');

    store.remove(testKey);
    assert.isUndefined(store.get(testKey), 'object not removed from store');
  });

  it('Should set, get and remove arrays', function () {

    let testKey = 'testArray';

    let store = new _BaseStore();

    let array = ['value1', 'value2'];

    store.set(testKey, array, true);
    assert.deepEqual(store.get(testKey), List(array), 'array not set or returned correctly');

    store.remove(testKey);
    assert.isUndefined(store.get(testKey), 'array not removed from store');
  });
});
