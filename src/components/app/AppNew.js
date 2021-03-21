import React, { Component, Suspense } from 'react';
import { Switch } from 'react-router-dom';
import HomeView from '../../views/HomeView';
import routes from '../utils/utils';
import LoginView from '../../views/LoginView';
import RegisterView from '../../views/RegisterView';
import Phonebook from './Phonebook';
import Header from './Header';
import { connect } from 'react-redux';
import authOperations from '../../redux/auth/authOperations';
import PublicRoute from '../PublicRoute';
import PrivateRoute from '../PrivateRoute';

class AppNew extends Component {
  componentDidMount() {
    this.props.getUserInfo();
  }
  render() {
    return (
      <div>
        <Header />
        <Suspense fallback={<h1>...Loading</h1>}>
          <Switch>
            <PublicRoute exact path={routes.home} component={HomeView} />
            <PublicRoute
              path={routes.login}
              restricted
              redirectTo={routes.contacts}
              component={LoginView}
            />
            <PublicRoute
              path={routes.register}
              restricted
              redirectTo={routes.contacts}
              component={RegisterView}
            />
            <PrivateRoute
              path={routes.contacts}
              redirectTo={routes.login}
              component={Phonebook}
            />
          </Switch>
        </Suspense>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  getUserInfo: () => dispatch(authOperations.getCurrentUser()),
});

export default connect(null, mapDispatchToProps)(AppNew);
