import contactsActions from './contact-actions';
import axios from 'axios';
import { token } from '../auth/authOperations';

axios.defaults.baseURL = 'https://goit-phonebook-api.herokuapp.com';
const addContact = (name, number) => dispatch => {
  dispatch(contactsActions.addContactRequest());

  axios
    .post('/contacts', { name, number })
    .then(response => {
      dispatch(
        contactsActions.addContactSuccess({
          name,
          number,
          id: response.data.name,
        }),
      );
    })
    .catch(error => dispatch(contactsActions.addContactError(error)));
};

const fetchContacts = () => (dispatch, getState) => {
  dispatch(contactsActions.fetchContactsRequest());
  const {
    auth: { token: persistedToken },
  } = getState();
  token.set(persistedToken);
  axios
    .get('/contacts')
    .then(({ data }) => {
      const keys = Object.keys(data);
      const newData = keys.reduce((acc, key) => {
        acc.push({ id: key, ...data[key] });
        return acc;
      }, []);
      dispatch(contactsActions.fetchContactsSuccess(newData));
    })
    .catch(error => dispatch(contactsActions.fetchContactsError(error)));
};

const removeContact = contactId => dispatch => {
  dispatch(contactsActions.removeContactRequest());
  axios
    .delete(`/contacts/${contactId}`)
    .then(() => dispatch(contactsActions.removeContactSuccess(contactId)))
    .catch(error => dispatch(contactsActions.removeContactError(error)));
};
export default {
  addContact,
  fetchContacts,
  removeContact,
};
