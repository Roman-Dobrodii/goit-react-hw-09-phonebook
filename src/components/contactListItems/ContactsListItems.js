import React from 'react';
import { connect } from 'react-redux';
import contactsOperation from '../../redux/contact/contactsOperation';
import contactSelectors from '../../redux/contact/contact-selectors';

const ContactsListItems = ({ id, name, number, deleteContact }) => {
  return (
    <li className="contact">
      <span>{name}</span>
      <span>{number}</span>
      <button
        className="deleteBtn"
        type="button"
        onClick={() => deleteContact(id)}
      >
        x
      </button>
    </li>
  );
};
const mapStateToProps = (state, ownProps) => {
  const item = contactSelectors.getContactById(state, ownProps.id);
  return { ...item };
};
const mapDispatchToPRops = (dispatch, ownProps) => ({
  deleteContact: id => dispatch(contactsOperation.removeContact(ownProps.id)),
});
export default connect(mapStateToProps, mapDispatchToPRops)(ContactsListItems);
