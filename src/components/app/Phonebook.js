import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import MainTitle from '../mainTitle/MainTitle';
import ContactForm from '../contactForm/ContactForm';
import FindContactInput from '../findContactInput/FindContactInput';
import ContactsList from '../contactsList/ContactsList';
import { CSSTransition } from 'react-transition-group';
import contactsOperation from '../../redux/contact/contactsOperation';
import contactSelectors from '../../redux/contact/contact-selectors';

class Phonebook extends Component {
  state = {
    showContacts: false,
  };
  componentDidMount() {
    this.props.onFetchContacts();
  }
  componentDidUpdate(prevProps, nextProps) {}

  render() {
    return (
      <div className="container ">
        <CSSTransition
          in={true}
          appear={true}
          classNames="mainTitle-slideIn"
          timeout={5000}
          unmountOnExit
        >
          <MainTitle />
        </CSSTransition>

        <ContactForm />

        <CSSTransition
          in={
            this.props.filteredContacts.length > 1 ||
            this.props.contacts.length > 1
          }
          timeout={250}
          classNames="findContact"
          unmountOnExit
        >
          <FindContactInput />
        </CSSTransition>
        <ContactsList />
        {this.props.IsLoadingContacts && (
          <Loader
            style={{ display: 'flex ', justifyContent: 'center' }}
            type="ThreeDots"
            color="#00BFFF"
            height={80}
            width={80}
          />
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { items, filter } = state.contacts;

  const getfilteredContacts = items.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
  );
  return {
    filteredContacts: getfilteredContacts,
    IsLoadingContacts: contactSelectors.getLoading(state),
    filter: contactSelectors.getFilter(state),
    contacts: state.contacts.items,
  };
};

const mapDispatchToProps = {
  onFetchContacts: contactsOperation.fetchContacts,
};
export default connect(mapStateToProps, mapDispatchToProps)(Phonebook);
