import React, { Component } from 'react';
import { connect } from 'react-redux';
import authOperations from '../redux/auth/authOperations';

class RegisterView extends Component {
  state = {
    name: '',
    email: '',
    password: '',
  };
  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };
  handleSubmit = evt => {
    evt.preventDefault();
    this.props.onRegister({ ...this.state });
    this.setState({ name: '', email: '', password: '' });
  };
  render() {
    const { name, email, password } = this.state;

    return (
      <div className="container">
        <section className="wrapper">
          <h1>Register form</h1>
          <form onSubmit={this.handleSubmit} className="form">
            <label>
              <input
                className="input"
                type="text"
                name="name"
                value={name}
                onChange={this.handleChange}
                placeholder="Enter name"
              ></input>
            </label>
            <label>
              <input
                className="input"
                type="email"
                value={email}
                onChange={this.handleChange}
                name="email"
                placeholder="Enter email"
              ></input>
            </label>
            <label>
              <input
                className="input"
                type="password"
                value={password}
                onChange={this.handleChange}
                name="password"
                placeholder="Enter password"
              ></input>
            </label>
            <button type="submit" className="addContact-button signIn-button">
              Sign Up
            </button>
          </form>
        </section>
      </div>
    );
  }
}

export default connect(null, { onRegister: authOperations.register })(
  RegisterView,
);
