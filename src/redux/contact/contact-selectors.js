import { createSelector } from '@reduxjs/toolkit';

const getLoading = state => state.contacts.loading;
const getFilter = state => state.contacts.filter;
const getContacts = state => state.contacts.items;

const getContactById = createSelector(
  [(state, contactId) => contactId, getContacts],
  (contactId, contacts) => {
    return contacts.find(contact => contact.id === contactId);
  },
);

const getContactsFiltered = createSelector(
  [getContacts, getFilter],
  (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  },
);

export default {
  getLoading,
  getFilter,
  getContacts,
  getContactById,
  getContactsFiltered,
};
