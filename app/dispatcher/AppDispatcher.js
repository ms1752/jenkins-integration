import { Dispatcher } from 'flux';

const flux = new Dispatcher();

export function register (callback) {
  return flux.register(callback);
}

export function waitFor (ids) {
  return flux.waitFor(ids);
}

// Some Flux examples have methods like `handleViewAction`
// or `handleServerAction` here. They are only useful if you
// want to have extra pre-processing or logging for such actions.

/**
 * Dispatches a single action.
 */
export function dispatch (type, action = {}) {

  if (!type) {
    throw new Error('You forgot to specify type.');
  }

  flux.dispatch({type, action});
}

/**
 * Dispatches three actions for an async operation represented by promise.
 */
export function dispatchAsync (promise, types, action = {}) {
  const { request, success, failure } = types;

  dispatch(request, action);
  promise.then(
      response => dispatch(success, {action, response}),
      error => dispatch(failure, {action, error})
  );
}
