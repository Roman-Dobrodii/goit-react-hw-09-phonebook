import React from 'react';
import ContactsListItems from '../contactListItems/ContactsListItems';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import contactSelectors from '../../redux/contact/contact-selectors';

const ContactsList = ({ items, contacts }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {contacts.length > 0 && items.length === 0 ? (
        <h4>...Nothing Found</h4>
      ) : (
        <TransitionGroup component="ul" className="contacts-list">
          {items.map(({ id }) => (
            <CSSTransition
              key={id}
              classNames="taskList-fade"
              timeout={250}
              unmountOnExit
            >
              <ContactsListItems id={id} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  const getFilteredContact = contactSelectors.getContactsFiltered(state);
  return {
    items: getFilteredContact,
    contacts: contactSelectors.getContacts(state),
  };
};

export default connect(mapStateToProps)(ContactsList);
