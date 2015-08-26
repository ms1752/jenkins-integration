import pkg from '../../package';

export const APP_TITLE = pkg.name;
export const APP_DESCRIPTION = pkg.description;

export const TODO_ITEMS_GET_REQUEST = 'TODO_ITEMS_GET_REQUEST';
export const TODO_ITEMS_GET_SUCCESS = 'TODO_ITEMS_GET_SUCCESS';
export const TODO_ITEMS_GET_ERROR = 'TODO_ITEMS_GET_ERROR';
export const TODO_ITEMS_UPDATED = 'TODO_ITEMS_UPDATED';

//10 second default timeout to be used for all network requests
export const DEFAULT_REQUEST_TIMEOUT = 10000;
