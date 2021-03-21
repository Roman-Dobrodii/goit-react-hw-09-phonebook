import React from 'react';
import { connect } from 'react-redux';
import authOperations from '../../redux/auth/authOperations';
import user from '../../image/avatar.png';

const UserMenu = ({ name, avatar, logout }) => {
  return (
    <div className="userMenu">
      <div className="userMenu-wrapper">
        <div className="userMenu-avatar">
          <img
            className="userMenu-avatar_img"
            src={avatar}
            alt={name}
            width="32"
          ></img>
        </div>
        <span className="userMenu-name">Welcome {name}!</span>
      </div>
      <button type="button" className="logout-button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

const mapStateToProps = state => ({
  name: state.auth.user.name,
  avatar: user,
});
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(authOperations.logout()),
});
export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
