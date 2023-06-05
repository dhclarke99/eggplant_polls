
import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../utils/auth';
import { QUERY_USER_by_id } from '../../utils/queries';
import {useQuery} from '@apollo/client';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    AuthService.logout();
  };

  const loggedInUser = AuthService.getProfile()?.data;
  console.log(loggedInUser)

const loggedInUserId = AuthService.getProfile()?.data.id;

const { loading, error, data } = useQuery(QUERY_USER_by_id, {
  variables: { userId: loggedInUserId },
});

const userData = data?.user;


  return (
    <header className="bg-primary text-light mb-4 py-3">
      <div class="container-fluid">
      <img src="./" alt="Box of Eggplants" id="headerimg"></img>
        <div class="navbar-brand" id="navbar">Eggplant Polls 
          <p className="m-0" id="wager" style={{ listStyleType: 'none' }}>Wager your Eggplant currency on poll results!</p></div>
      </div>
      <ul>
        {AuthService.loggedIn() ? (
          <>
          <ul><Link className="btn btn-lg btn-info m-2" to="/">
              Home
            </Link></ul>
            <ul><Link className="btn btn-lg btn-info m-2" to="/me">
              {AuthService.getProfile().data.username}'s profile
              {userData?.username} ({loggedInUser.eggplants || 0} eggplants)
            </Link></ul>
            <li style={{ listStyleType: 'none' }}><Link className="btn btn-lg btn-light m-2" to="/farm">
              Farm
            </Link></li>
            <ul><button className="btn btn-lg btn-light m-2" onClick={logout}>
              Logout
            </button></ul>
          </>
        ) : (
          <>
            <ul><Link className="btn btn-lg btn-info m-2" to="/">
              Home
            </Link></ul>
            <ul><Link className="btn btn-lg btn-info m-2" to="/login">
              Login
            </Link></ul>
            <ul><Link className="btn btn-lg btn-light m-2" to="/signup">
              Signup
            </Link></ul>

          </>
        )
        }
      </ul>

    </header>
  );
};

export default Header;
