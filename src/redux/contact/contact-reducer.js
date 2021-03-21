import { combineReducers } from 'redux';
import actionTypes from './contact-actions';
import { createReducer } from '@reduxjs/toolkit';

const items = createReducer([], {
  [actionTypes.fetchContactsSuccess]: (state, action) => action.payload,
  [actionTypes.addContactSuccess]: (state, action) => [
    ...state,
    action.payload,
  ],
  [actionTypes.removeContactSuccess]: (state, action) =>
    state.filter(contact => contact.id !== action.payload),
});

const filter = createReducer('', {
  [actionTypes.changeFilter]: (state, action) => action.payload,
});

const loading = createReducer(false, {
  [actionTypes.addContactRequest]: () => true,
  [actionTypes.addContactSuccess]: () => false,
  [actionTypes.addContactError]: () => false,
  [actionTypes.removeContactRequest]: () => true,
  [actionTypes.removeContactSuccess]: () => false,
  [actionTypes.removeContactError]: () => false,
});

export default combineReducers({
  items,
  filter,
  loading,
});
